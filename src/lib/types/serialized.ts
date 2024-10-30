import { type DineroSnapshot } from 'dinero.js';
import type { PricingColumn, StaticRangeDate } from './sub.ts';

import type {
  Calendar,
  CalendarAvailable,
  Weather,
  LeafletMap,
  AccoDescription,
} from './blocks.ts';

export interface TextDTO {
  id: string;
  kind: 'text';
  content: {
    ref: string;
    minHeight?: string;
    textFontSize?: string;
    headerFontSize?: string;
  };
}

export interface WeatherDTO {
  id: string;
  kind: 'weather';
  content: {
    header1: string;
    header2: string;
    location: string;
  };
}

export interface PhotoDTO {
  id: string;
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

export interface PhotoGalleryDTO {
  id: string;
  kind: 'gallery';
  content: {
    gridPhotoWidth?: number;
    photos: PhotoDTO[];
  };
}

export interface PricingDTO {
  id: string;
  kind: 'pricing';
  content: {
    global: PricingEntryDTO;
    staticRanges?: StaticPricingRangeDTO[];
    ranges?: PricingRangeDTO[];
    entries?: PricingRangeDTO[]; //different name for ranges ... always the same
    columns?: PricingColumn[];
    footnote?: string;
  };
}

export interface PricingRangeDTO {
  from: string;
  to: string;
  entry: PricingEntryDTO;
}

export interface StaticPricingRangeDTO {
  from: StaticRangeDate;
  to: StaticRangeDate;
  entry: PricingEntryDTO;
}

export interface PricingEntryDTO {
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

export interface PricingShortDTO {
  id: string;
  kind: 'pricing-short';
  content: {
    global?: PricingEntryDTO;
    entries?: PricingRangeDTO[];
    ranges?: PricingRangeDTO[]; // is the same
    staticRanges?: StaticPricingRangeDTO[];
    showMaximum?: boolean;
    showMinimum?: boolean;
    footnote?: string;
  };
}

export interface AmenitiesCoreDTO {
  id: string;
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

export interface AccoCardDTO {
  id: string;
  kind: 'acco-card';
  content: {
    cardContent: CardContentDTO;
    displayName: string;
  };
}

export interface CardContentDTO {
  coverPhoto: PhotoDTO;
  slug?: string;
  blocks: BlockDTO[];
}

export interface AccoDescriptionDTO {
  id: string;
  kind: 'acco-description';
  content: {
    ref: string;
    minHeight?: string;
    textFontSize?: string;
    headerFontSize?: string;
  };
}

export type BlockDTO =
  | TextDTO
  | PhotoDTO
  | PhotoGalleryDTO
  | Calendar
  | CalendarAvailable
  | PricingDTO
  | PricingShortDTO
  | AmenitiesCoreDTO
  | Weather
  | LeafletMap
  | AccoCardDTO
  | AccoDescriptionDTO
  | undefined;

export const isAccoCardDTO = (b: BlockDTO): b is AccoCardDTO => {
  if (!b) return false;
  return b.kind === 'acco-card';
};

export const isTextDTO = (b: BlockDTO): b is TextDTO => {
  if (!b) return false;
  return b.kind === 'text';
};

export const isPhotoDTO = (b: BlockDTO): b is PhotoDTO => {
  if (!b) return false;
  return b.kind === 'photo';
};

export const isGalleryDTO = (b: BlockDTO): b is PhotoGalleryDTO => {
  if (!b) return false;
  return b.kind === 'gallery';
};

export const isLeafletMapDTO = (b: BlockDTO): b is LeafletMap => {
  if (!b) return false;
  return b.kind === 'leaflet-map';
};

export const isWeatherDTO = (b: BlockDTO): b is Weather => {
  if (!b) return false;
  return b.kind === 'weather';
};

export const isAmenitiesCoreDTO = (b: BlockDTO): b is AmenitiesCoreDTO => {
  if (!b) return false;
  return b.kind === 'amenities-core';
};

export const isCalendarAvailableDTO = (b: BlockDTO): b is CalendarAvailable => {
  if (!b) return false;
  return b.kind === 'calendar-available';
};

export const isCalendarDTO = (b: BlockDTO): b is Calendar => {
  if (!b) return false;
  return b.kind === 'calendar';
};

export const isPricingDTO = (b: BlockDTO): b is PricingDTO => {
  if (!b) return false;
  return b.kind === 'pricing';
};

export const isPricingShortDTO = (b: BlockDTO): b is PricingShortDTO => {
  if (!b) return false;
  return b.kind === 'pricing-short';
};

export const isAccoDescriptionDTO = (b: BlockDTO): b is AccoDescription => {
  if (!b) return false;
  return b.kind === 'acco-description';
};
