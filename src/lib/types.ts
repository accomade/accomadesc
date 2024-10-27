import { dinero, type Dinero, type DineroSnapshot } from 'dinero.js';
import { type DateTime } from 'luxon';
import { DateTime as luxon } from 'luxon';

export interface TextBlock {
  kind: 'text';
  content: {
    ref: string;
    minHeight?: string;
    textFontSize?: string;
    headerFontSize?: string;
  };
}

export interface Weather {
  kind: 'weather';
  content: {
    header1: string;
    header2: string;
    location: string;
  };
}

export interface Photo {
  kind: 'photo';
  content: {
    photoPath: string;
    alt: string;
    attribution?: string;
    link?: string;
    external?: boolean;
    height?: string | undefined;
    ratio?: string | undefined;
    width?: string | undefined;
  };
}

export interface PhotoGallery {
  kind: 'gallery';
  content: {
    gridPhotoWidth?: number;
    photos: Photo[];
  };
}

export interface LeafletMap {
  kind: 'leaflet-map';
  content: {
    address: string;
    lat: number;
    long: number;
    zoom: number;
  };
}

export interface Calendar {
  kind: 'calendar';
  content: {
    calUrl: string;
  };
}

export interface CalendarAvailable {
  kind: 'calendar-available';
  content: {
    calUrl: string;
    search: number[];
  };
}

export type PricingColumn =
  | 'timeRange'
  | 'firstNight'
  | 'eachNight'
  | 'extraPerson'
  | 'minNumNights';

export interface Pricing {
  id: string;
  isAccoRef: boolean;
  kind: 'pricing';
  content: {
    global: PricingEntry;
    staticRanges?: StaticPricingRange[];
    ranges?: PricingRange[];
    columns?: PricingColumn[];
    entries?: PricingRange[]; //different name for ranges ... always the same
    footnote?: string;
  };
}

export interface PricingRange {
  from: string;
  to: string;
  entry: PricingEntry;
}

export interface StaticRangeDate {
  month: number;
  day: number;
}

export interface StaticPricingRange {
  from: StaticRangeDate;
  to: StaticRangeDate;
  entry: PricingEntry;
}

export interface PricingEntry {
  firstNightPrice?: DineroSnapshot<number>;
  perNightPrice: DineroSnapshot<number>;

  minNumberOfNights?: number;

  additionalPersonPrice1?: DineroSnapshot<number>;
  additionalPersonPrice2?: DineroSnapshot<number>;
  additionalPersonPrice3?: DineroSnapshot<number>;

  additionalPersonText1?: string;
  additionalPersonText2?: string;
  additionalPersonText3?: string;
}

export interface PricingShort {
  kind: 'pricing-short';
  global?: PricingEntry;
  entries?: PricingRange[];
  ranges?: PricingRange[]; // is the same
  showMaximum?: boolean;
  showMinimum?: boolean;
  footnote?: string;
}

export interface JsonPricingShort {
  global?: JsonPricingEntry;
  entries?: JsonPricingRange[];
  showMaximum?: boolean;
  showMinimum?: boolean;
  footnote?: string;
}

export const mapJsonPricingShort = (jp: JsonPricingShort): PricingShort => {
  const p: PricingShort = {
    showMaximum: jp.showMaximum,
    showMinimum: jp.showMinimum,
    footnote: jp.footnote,
  };
  if (jp.global) p.global = mapJsonPricingEntry(jp.global);
  if (jp.entries) p.entries = jp.entries.map((e) => mapJsonPricingRange(e));

  return p;
};

export interface AmenitiesCore {
  kind: 'amenities-core';
  content: {
    peopleMin: number;
    peopleMax: number;
    size: number;
    bedRooms: number;
    bathRooms: number;
    pets: boolean;
    showPets?: boolean;
    wifi: boolean;
    showWifi?: boolean;
    smoking: boolean;
    showSmoking?: boolean;
    ac: boolean;
    showAc?: boolean;
    tv: boolean;
    showTv?: boolean;
    parking: boolean;
    showParking?: boolean;
  };
}

export interface AccoCard {
  kind: 'acco-card';
  content: {
    cardContent: AccoCardContent;
    displayName: string;
  };
}

export interface AccoCardContent {
  coverPhoto: Photo;
  slug: string;
  blocks: Block[];
}

export interface PhotoBlock {
  kind: 'photo';
  content: Photo;
}

export interface PhotoGalleryBlock {
  kind: 'photo-gallery';
  content: PhotoGallery;
}

export interface CalendarBlock {
  kind: 'calendar';
  content: Calendar;
}

export interface CalendarAvailableBlock {
  kind: 'calendar-available';
  content: CalendarAvailable;
}

export interface MapBlock {
  kind: 'map';
  content: Maps;
}

export interface LeafletMapBlock {
  kind: 'leaflet-map';
  content: LeafletMap;
}

export interface PricingBlock {
  kind: 'pricing';
  content: Pricing;
}

export interface JsonPricingBlock {
  kind: 'pricing';
  content: JsonPricing;
}

export interface PricingShortBlock {
  kind: 'pricing-short';
  content: PricingShort;
}

export interface JsonPricingShortBlock {
  kind: 'pricing-short';
  content: JsonPricingShort;
}

export interface WeatherBlock {
  kind: 'weather';
  content: Weather;
}

export interface AmenitiesCoreBlock {
  kind: 'amenities-core';
  content: {
    core: AmenitiesCore;
  };
}

export interface AccoCardBlock {
  kind: 'acco-card';
  content: AccoCard;
}

export type Block =
  | TextBlock
  | PhotoBlock
  | PhotoGalleryBlock
  | CalendarBlock
  | CalendarAvailableBlock
  | PricingBlock
  | PricingShortBlock
  | AmenitiesCoreBlock
  | WeatherBlock
  | MapBlock
  | LeafletMapBlock
  | AccoCardBlock
  | undefined;

export type JsonBlock =
  | TextBlock
  | PhotoBlock
  | PhotoGalleryBlock
  | CalendarBlock
  | CalendarAvailableBlock
  | JsonPricingBlock
  | JsonPricingShortBlock
  | AmenitiesCoreBlock
  | WeatherBlock
  | MapBlock
  | LeafletMapBlock
  | AccoCardBlock
  | undefined;

export const mapJsonBlock = (jb: JsonBlock): Block => {
  if (jb == undefined) return undefined;

  if (jb.kind == 'pricing') {
    return {
      kind: 'pricing',
      content: mapJsonPricing(jb.content),
    };
  }
  if (jb.kind == 'pricing-short') {
    return {
      kind: 'pricing-short',
      content: mapJsonPricingShort(jb.content),
    };
  }

  return jb;
};
