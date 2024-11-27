import type { MonthNumbers, WeekdayNumbers } from 'luxon';

type WeekdayLabels = {
  [key in WeekdayNumbers]: string;
};

type MonthLabels = {
  [key in MonthNumbers]: string;
};

interface I18n {
  weekendLabel?: string;
  weekdayLabels?: WeekdayLabels;
  monthLabels?: MonthLabels;
  monthHeaderFormat?: string;
  typeNames?: {
    defaultOccupationTypeName: string;
    [key: string]: string;
  };
}

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

export type { WeekdayLabels, MonthLabels, I18n };

