import { normalizeDate } from '$lib/helpers/normalizeDate.js';
import { getEvents } from '$lib/helpers/readICS.js';
import { DateTime, type MonthNumbers, type WeekdayNumbers } from 'luxon';
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

export const firstMonthValid = (value: string | number): boolean => {
  if (typeof value === 'number') {
    const intValue = value as number;
    return intValue >= 0 && intValue <= 12;
  } else if (value.length > 1) {
    //check + sign
    if (value[0] == '+') {
      const toParse = value.slice(1);
      try {
        const intValue = parseInt(toParse);
        if (intValue >= 0 && intValue <= 12) {
          return true;
        }
      } catch (e) {
        console.log('casting error', e);
      }
      //check - sign
    } else if (value[0] == '-') {
      const toParse = value.slice(1);
      try {
        const intValue = parseInt(toParse);
        if (intValue >= 0 && intValue <= 12) {
          return true;
        }
      } catch (e) {
        console.log('casting error', e);
      }
    }
  }

  try {
    const intValue = parseInt(value);
    if (intValue >= 0 && intValue <= 12) {
      return true;
    }
  } catch (e) {
    console.log('casting error', e);
  }

  return false;
};

export const realFirstMonth = (
  firstMonth: FirstMonth,
  numberOfMonth: number,
  page: number,
): DateTime => {
  const monthToAdd = page * numberOfMonth;

  if (typeof firstMonth === 'number') {
    const intValue = firstMonth as number;
    if (intValue >= 1 && intValue <= 12) {
      const tDate = normalizeDate(DateTime.utc())
        .set({ month: intValue })
        .plus({ month: monthToAdd });
      return tDate;
    }
  } else if (typeof firstMonth === 'string' && firstMonth.length > 1) {
    //check + sign
    if (firstMonth[0] == '+') {
      const toParse = firstMonth.slice(1);
      try {
        const intValue = parseInt(toParse);
        if (intValue >= 1 && intValue <= 12) {
          const tDate = normalizeDate(DateTime.utc())
            .plus({ month: intValue })
            .plus({ month: monthToAdd });

          return tDate;
        }
      } catch (e) {
        console.log('casting error', e);
      }
      //check - sign
    } else if (firstMonth[0] == '-') {
      const toParse = firstMonth.slice(1);
      try {
        const intValue = parseInt(toParse);
        if (intValue >= 0 && intValue <= 12) {
          const tDate = normalizeDate(DateTime.utc())
            .minus({ month: intValue })
            .plus({ month: monthToAdd });
          return tDate;
        }
      } catch (e) {
        console.log('casting error', e);
      }
    }
  }

  if (typeof firstMonth == 'string') {
    try {
      const intValue = parseInt(firstMonth);

      //current dynamic month
      if (intValue == 0) {
        return normalizeDate(DateTime.utc()).plus({ month: monthToAdd });
      }

      //static month of current year
      if (intValue >= 1 && intValue <= 12) {
        const tDate = normalizeDate(DateTime.utc())
          .set({ month: intValue })
          .plus({ month: monthToAdd });
        return tDate;
      }
    } catch (e) {
      console.log('casting error', e);
    }
  }

  //first month of current year ... default
  return normalizeDate(DateTime.utc()).set({ month: 1 }).plus({ month: monthToAdd });
};

const validDay = (d: DayHelper): boolean => {
  const today = luxon.utc();
  const m = luxon.local(d.year, d.month, d.day);
  if (m < today) {
    return false;
  }

  return d.day <= m.endOf('month').day;
};

export interface OccuplanTranslations {
  arrivalLabel?: string;
  leaveLabel?: string;
  header?: string;
  footer?: string;
  weekendLabel?: string;
  weekdayLabels?: WeekdayLabels;
  monthLabels?: MonthLabels;
  monthHeaderFormat?: string;
  datePickerDateFormat?: string;
  numberOfNights?: string;
  nextPage?: string;
  prevPage?: string;
  typeLabels?: Record<OccupationType, string>;
}

export type NextMonthNumbers =
  | '+1'
  | '+2'
  | '+3'
  | '+4'
  | '+5'
  | '+6'
  | '+7'
  | '+8'
  | '+9'
  | '+10'
  | '+11'
  | '+12';
export type PrevMonthNumbers =
  | '-1'
  | '-2'
  | '-3'
  | '-4'
  | '-5'
  | '-6'
  | '-7'
  | '-8'
  | '-9'
  | '-10'
  | '-11'
  | '-12';

export type FirstMonth = MonthNumbers | NextMonthNumbers | PrevMonthNumbers | 0;

export interface OccuplanMiscProps {
  url: string;
  debug?: boolean;
  gridNumberOfMonths?: number;
  gridFirstMonth?: FirstMonth;
  gridMaxWidth?: string;
  rowsNumberOfMonths?: number;
  rowsFirstMonth?: FirstMonth;
  rowsMaxWidth?: string;
  minDate?: DateTime;
  maxDate?: DateTime;
  toggleGridOffset?: number;
  toggleRowsOffset?: number;
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
  public debug: boolean = $state(false);

  constructor(iCalURL: string, debug: boolean = false) {
    this.debug = debug;
    if (this.debug) console.log('Constructing OState with CalUrl: ', iCalURL);
    this.iCalURL = iCalURL;
    this.loadOccupations();
  }

  private loadOccupations = async () => {
    if (this.debug) console.log('(Re)Loading Occupations');
    this.loading = true;
    if (this.iCalURL) {
      const eventsResult = await getEvents(this.iCalURL, this.eventsIncomingCallback);

      this.loading = false;
      return !eventsResult.error;
    }
    return false;
  };

  private eventsIncomingCallback = (o: Occupation) => {
    if (this.debug) console.log('Occupation incoming: ', o);

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
    //console.log(this.occupiedDays);
  };

  public firstFree = (maxFutureDate: DateTime): DateTime => {
    let day = normalizeDate();
    while (this.dayOccupied(day) && day < maxFutureDate) {
      day = day.plus({ day: 1 });
    }
    return day;
  };

  public earliestRequestStart = (currentEnd: DateTime | undefined): DateTime | undefined => {
    if (!currentEnd) return;
    let day = normalizeDate(currentEnd).minus({ day: 1 });
    while (day > normalizeDate() && !this.dayOccupied(day)) {
      day = day.minus({ day: 1 });
    }
    return day;
  };

  public latestRequestEnd = (
    maxFutureDate: DateTime,
    currentStart: DateTime | undefined,
  ): DateTime | undefined => {
    if (!currentStart) return;
    let day = normalizeDate(currentStart);
    while (day < maxFutureDate && !this.dayOccupied(day)) {
      day = day.plus({ day: 1 });
    }
    return day;
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

  public validRequest = (from: DateTime, to: DateTime) => {
    //TODO take min nights into account
    return !this.occupations.find((o) => o.arrival < to && o.leave > from);
  };

  public occupationStyle = (
    d: DayHelper,
    highlightWeekend: boolean = false,
    maxDate: DateTime,
  ): string => {
    const valid = validDay(d);
    if (!valid) {
      return 'background-color: var(--occuplan-bg-color-invalid-days);';
    }

    const day = luxon.utc(d.year, d.month, d.day);
    const outOfScope = day >= maxDate;
    if (outOfScope) {
      return 'background-color: var(--occuplan-bg-color-invalid-days);';
    }

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
export const getOccupationState = (url: string, debug: boolean = false): OccupationState => {
  if (debug) console.log('Get OState /w url', url);
  const currentInstance = _instances[url];
  if (currentInstance) return currentInstance;

  const newInstance = new OccupationState(url, debug);
  _instances[url] = newInstance;

  return _instances[url];
};
