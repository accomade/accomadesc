import { debounce } from '$lib/helpers/debounce.ts';
import { normalizeDate } from '$lib/helpers/normalizeDate.ts';
import { getEvents } from '$lib/helpers/readICS.ts';
import type { DateTime, MonthNumbers, WeekdayNumbers } from 'luxon';
import { DateTime as luxon } from 'luxon';

export interface AvailableSpans {
  [key: number]: DateTime | null;
}

export interface Occupation {
  arrival: DateTime;
  leave: DateTime;
  type: OccupationType;
}
export type OccupationCallback = (occupation: Occupation) => void;

export type WeekdayLabels = {
  [key in WeekdayNumbers]: string;
};

export type MonthLabels = {
  [key in MonthNumbers]: string;
};

export type OccupationType = 'one' | 'two' | 'three';

export const OCCUPATION_STATE = 'occupation-state';

export const occupationTypeFormattingByOccupation = (
  o?: Occupation,
): { fontColor: string; bgColor: string } => {
  return occupationTypeFormatting(o?.type);
};

export const occupationTypeFormatting = (
  t?: OccupationType,
): { fontColor: string; bgColor: string } => {
  switch (t) {
    case 'one':
      return {
        fontColor: 'var(--occupation-type-1-font-color)',
        bgColor: 'var(--occupation-type-1-bg-color)',
      };
    case 'two':
      return {
        fontColor: 'var(--occupation-type-2-font-color)',
        bgColor: 'var(--occupation-type-2-bg-color)',
      };
    case 'three':
      return {
        fontColor: 'var(--occupation-type-3-font-color)',
        bgColor: 'var(--occupation-type-3-bg-color)',
      };
    default:
      return {
        fontColor: 'var(--occupation-type-1-font-color)',
        bgColor: 'var(--occupation-type-1-bg-color)',
      };
  }
};

export interface OccuplanTranslations {
  header?: string;
  footer?: string;
  weekendLabel?: string;
  weekdayLabels?: WeekdayLabels;
  monthLabels?: MonthLabels;
  monthHeaderFormat?: string;
  typeLabels: Record<OccupationType, string>;
}

export interface OccuplanMiscProps {
  url: string;
  numberOfMonth: number;
  firstMonth: MonthNumbers;
  year: number;
  minYear: number;
  maxYear: number;
}

export const defaultWeekendLabel = 'Weekend';

export const defaultWeekdayLabels: WeekdayLabels = {
  1: 'Mo',
  2: 'Tu',
  3: 'We',
  4: 'Th',
  5: 'Fr',
  6: 'Sa',
  7: 'Su',
} as const;
export const defaultMonthLabels: MonthLabels = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
} as const;

export const defaultMonthHeaderFormat = '{{month}} / {{year}}';

export class OccupationState {
  public iCalURL: string;
  public occupiedDays: Record<string, boolean> = {};
  public occupations: Occupation[] = [];

  constructor(iCalURL: string) {
    this.iCalURL = iCalURL;
    this.loadOccupations();
  }

  private loadOccupations = () => {
    if (this.iCalURL) {
      debounce(
        this.iCalURL,
        async (): Promise<boolean> => {
          if (this.iCalURL) {
            const eventsResult = await getEvents(this.iCalURL, this.eventsIncomingCallback);
            return !eventsResult.error;
          }
          return false;
        },
        { initialDelay: 200, debounceDelay: 5000 },
      );
    }
  };

  private eventsIncomingCallback = (o: Occupation) => {
    this.occupations.push(o);
    this.updateOccupiedDays(o);
  };

  private dayKey = (d: DateTime): string => {
    return `${d.year}-${d.month}-${d.day}`;
  };

  private updateOccupiedDays = (o: Occupation) => {
    let startDate = o.arrival;
    let endDate = o.leave;

    if (o.arrival > o.leave) {
      startDate = o.leave;
      endDate = o.arrival;
    }

    let cDate = startDate;
    while (cDate < endDate) {
      const key = this.dayKey(cDate);
      this.occupiedDays[key] = true;
      cDate = cDate.plus({ days: 1 });
    }
  };

  public calcAvailability = (search: number[], maxFutureDate: DateTime): AvailableSpans => {
    let av: AvailableSpans = search.reduce((acc, num) => {
      acc[num] = null;
      return acc;
    }, {} as AvailableSpans);

    let foundFirst = false;
    let firstDate: DateTime;
    let consecutive = 0;

    let d = normalizeDate(luxon.utc());
    while (d <= maxFutureDate) {
      const key = `${d.year}-${d.month}-${d.day}`;
      if (this.occupiedDays[key]) {
        foundFirst = false;
        consecutive = 0;
      } else {
        if (foundFirst) {
          consecutive++;

          search.forEach((n) => {
            if (consecutive >= n && av[n] == null) {
              av[n] = firstDate;
            }
          });

          let foundAll = true;
          search.forEach((num) => {
            if (!av[num]) {
              foundAll = false;
            }
          });

          if (foundAll) break;
        } else {
          foundFirst = true;
          firstDate = d;
        }
      }

      d = d.plus({ day: 1 });
    }
    return av;
  };

  public dayOccupied = (day: DateTime): boolean => {
    const key = this.dayKey(day);
    return this.occupiedDays[key];
  };

  public startingOccupation = (d: DateTime): Occupation | undefined => {
    const startOfDay = d.startOf('day');
    const endOfDay = d.endOf('day');
    return this.occupations.find((o) => o.arrival > startOfDay && o.arrival < endOfDay);
  };

  public endingOccupation = (d: DateTime): Occupation | undefined => {
    const startOfDay = d.startOf('day');
    const endOfDay = d.endOf('day');
    return this.occupations.find((o) => o.leave > startOfDay && o.leave < endOfDay);
  };

  public fullOccupation = (d: DateTime): Occupation | undefined => {
    const startOfDay = d.startOf('day');
    const endOfDay = d.endOf('day');

    return this.occupations.find((o) => o.arrival < startOfDay && o.leave > endOfDay);
  };
}
