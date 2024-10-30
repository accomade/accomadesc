import type { DateTime } from 'luxon';
import type { Photo, Block } from './blocks.ts';
import { type Dinero } from 'dinero.js';

export interface GridPhoto {
  photo: Photo;
  zoomed: boolean;
  id: string;
}

export type PricingColumn =
  | 'timeRange'
  | 'firstNight'
  | 'eachNight'
  | 'extraPerson'
  | 'minNumNights';

export interface StaticRangeDate {
  month: number;
  day: number;
}

export interface PricingEntry {
  firstNightPrice?: Dinero<number>;
  perNightPrice: Dinero<number>;

  minNumberOfNights?: number;

  additionalPersonPrice1?: Dinero<number>;
  additionalPersonPrice2?: Dinero<number>;
  additionalPersonPrice3?: Dinero<number>;

  additionalPersonText1?: string;
  additionalPersonText1Translation?: string;

  additionalPersonText2?: string;
  additionalPersonText2Translation?: string;

  additionalPersonText3?: string;
  additionalPersonText3Translation?: string;
}

export interface StaticPricingRange {
  from: StaticRangeDate;
  to: StaticRangeDate;
  entry: PricingEntry;
}

export interface PricingRange {
  from: DateTime;
  to: DateTime;
  entry: PricingEntry;
}

export interface CardContent {
  coverPhoto: Photo;
  slug?: string;
  translatedSlug?: string;
  blocks: Block[];
}
