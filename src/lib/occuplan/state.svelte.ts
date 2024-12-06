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

export interface DayHelper {
  day: number;
  month: MonthNumbers;
  year: number;
}

const validDay = (d: DayHelper): boolean => {
  const today = luxon.utc();
  const m = luxon.local(d.year, d.month, d.day);
  if (m < today) {
    return false;
  }

  return d.day <= m.endOf('month').day;
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
  public occupiedDays: Record<string, boolean> = $state({});
  public occupations: Occupation[] = $state([]);
  public loading: boolean = $state(false);

  constructor(iCalURL: string) {
    this.iCalURL = iCalURL;
    this.loadOccupations();
  }

  private loadOccupations = async () => {
    this.loading = true;
    if (this.iCalURL) {
      const eventsResult = await getEvents(this.iCalURL, this.eventsIncomingCallback);

      this.loading = false;
      return !eventsResult.error;
    }
    return false;
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

  public occupationStyle = (d: DayHelper, highlightWeekend: boolean = false): string => {
    const valid = validDay(d);
    if (!valid) {
      return 'background-color: var(--occuplan-bg-color-invalid-days);';
    }

    const day = luxon.utc(d.year, d.month, d.day);

    const o = this.fullOccupation(day);
    const oStarts = this.startingOccupation(day);
    const oEnds = this.endingOccupation(day);
    const isWeekend = [6, 7].includes(day.weekday);

    if (o) {
      const f = occupationTypeFormattingByOccupation(o);
      if (highlightWeekend && isWeekend) {
        return `
          background: radial-gradient(var(--occuplan-bg-color-weekend), ${f.bgColor}, ${f.bgColor});
        `;
      }

      return `
        background-color: ${f.bgColor};
      `;
    }

    if (oEnds && oStarts) {
      const sf = occupationTypeFormattingByOccupation(oStarts);
      const ef = occupationTypeFormattingByOccupation(oEnds);

      if (isWeekend && highlightWeekend) {
        return `
          background: radial-gradient(var(--occuplan-bg-color-weekend), var(--occuplan-bg-color-main), var(--occuplan-bg-color-main)), linear-gradient(90deg, ${ef.bgColor}, ${sf.bgColor});
          `;
      }

      return `
        background: linear-gradient(90deg, ${ef.bgColor}, ${sf.bgColor});
        `;
    }

    if (oStarts) {
      const sf = occupationTypeFormattingByOccupation(oStarts);

      if (isWeekend && highlightWeekend) {
        return `
        background: radial-gradient( var(--occuplan-bg-color-weekend), var(--occuplan-bg-color-main), var(--occuplan-bg-color-main)), linear-gradient(90deg, var(--occuplan-bg-color-main), ${sf.bgColor});
        `;
      }

      return `
        background: linear-gradient(90deg, var(--occuplan-bg-color-main), ${sf.bgColor});
        `;
    }

    if (oEnds) {
      const ef = occupationTypeFormattingByOccupation(oEnds);

      if (isWeekend && highlightWeekend) {
        return `
        background: radial-gradient( var(--occuplan-bg-color-weekend), var(--occuplan-bg-color-main), var(--occuplan-bg-color-main)), linear-gradient(90deg, ${ef.bgColor}, var(--occuplan-bg-color-main));
        `;
      }

      return `
        background: linear-gradient(90deg, ${ef.bgColor}, var(--occuplan-bg-color-main));
        `;
    }

    if (isWeekend && highlightWeekend) {
      return `
        background: radial-gradient(var(--occuplan-bg-color-weekend), var(--occuplan-bg-color-main), var(--occuplan-bg-color-main));
      `;
    }

    return `
        background-color: var(--occuplan-bg-color-main);
      `;
  };
}

let _instances: Record<string, OccupationState> = {};
export const getOccupationState = (url: string) => {
  const currentInstance = _instances[url];
  if (currentInstance) return currentInstance;

  const newInstance = new OccupationState(url);
  _instances[url] = newInstance;

  return _instances[url];
};
