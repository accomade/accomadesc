import { type Dinero, type DineroSnapshot } from 'dinero.js';
import type { FirstMonth, OccuplanTranslations } from '$lib/occuplan/state.svelte.js';
import type { DateTime, MonthNumbers, WeekdayNumbers } from 'luxon';
import type { CookieType, Translation as CookieTranslation } from 'gdpr-cooco-banner';

export type WeekdayLabels = {
  [key in WeekdayNumbers]: string;
};

export type MonthLabels = {
  [key in MonthNumbers]: string;
};

export interface GridPhoto {
  photo: Photo;
  zoomed: boolean;
  id: string;
}

export interface LeafletMap {
  id: string;
  kind: 'leaflet-map';
  content: LeafletMapContent;
}

export interface LeafletMapContent {
  address: string;
  lat: number;
  long: number;
  zoom: number;
}

export interface Calendar {
  id: string;
  kind: 'calendar';
  content: CalendarContent;
}
export interface CalendarContent {
  url: string;
  toggleGridOffset?: number;
  gridMonthNumbers?: number;
  gridFirstMonth?: FirstMonth;
  gridMaxWidth?: string;
  toggleRowsOffset?: number;
  rowsMonthNumbers?: number;
  rowsFirstMonth?: FirstMonth;
  rowsMaxWidth?: string;
}

export interface CalendarAvailable {
  id: string;
  kind: 'calendar-available';
  content: CalendarAvailableContent;
}
export interface CalendarAvailableContent {
  url: string;
  search: number[];
  maxFutureDate?: string;
}

export interface CalendarGrid {
  id: string;
  kind: 'calendar-grid';
  content: CalendarGridContent;
}

export interface CalendarGridContent {
  url: string;
  maxYear?: number;
  minYear?: number;
}

export interface CalendarRows {
  id: string;
  kind: 'calendar-rows';
  content: CalendarRowsContent;
}

export interface CalendarRowsContent {
  url: string;
  maxYear?: number;
  minYear?: number;
}

export interface Text {
  id: string;
  kind: 'text';
  content: TextContent;
}

export const DEFAULT_TEXT_FONT_SIZE = '1rem';
export const DEFAULT_HEADERS_FONT_SIZE = '1.5rem';

export const DEFAULT_EXT_HEADERS_1_FONT_SIZE = '3.2rem';
export const DEFAULT_EXT_HEADERS_2_FONT_SIZE = '2.2rem';
export const DEFAULT_EXT_HEADERS_3_FONT_SIZE = '1.8rem';
export const DEFAULT_EXT_HEADERS_4_FONT_SIZE = '1.2rem';

export interface TextContent {
  ref: string;
  minHeight?: string;
  textFontSize?: string;
  headerFontSize?: string;
  extendedHeaders?: boolean;
  extendedHeaders1Size?: string;
  extendedHeaders2Size?: string;
  extendedHeaders3Size?: string;
  extendedHeaders4Size?: string;
}

export interface Weather {
  id: string;
  kind: 'weather';
  content: WeatherContent;
}
export interface WeatherContent {
  header1: string;
  header2: string;
  location: string;
}

export interface Photo {
  id: string;
  kind: 'photo';
  content: PhotoContent;
}
export interface PhotoContent {
  photoPath: string;
  alt: string;
  attribution?: string;
  link?: string;
  external?: boolean;
  height?: string | undefined;
  ratio?: string | undefined;
  width?: string | undefined;
  eager?: boolean;
  frame?: boolean;
  transition?: 'none';
}

export interface PhotoGallery {
  id: string;
  kind: 'gallery';
  content: PhotoGalleryContent;
}
export interface PhotoGalleryContent {
  gridPhotoWidth?: number;
  photos: Photo[];
}

export interface Pricing {
  id: string;
  kind: 'pricing';
  content: PricingContent;
}

export interface PricingContent {
  global: PricingEntry;
  staticRanges?: StaticPricingRange[];
  ranges?: PricingRange[];
  entries?: PricingRange[]; //different name for ranges ... always the same
  columns?: PricingColumn[];
  footnote?: string;
}

export const PRICING_COLUMNS = [
  'timeRange',
  'firstNight',
  'eachNight',
  'peopleNum',
  'extraPerson',
  'minNumNights',
];

export type PricingColumn = (typeof PRICING_COLUMNS)[number];

export interface StaticRangeDate {
  month: number;
  day: number;
}

export interface PricingRange {
  from: string;
  to: string;
  entry: PricingEntry;
}

export interface StaticPricingRange {
  from: StaticRangeDate;
  to: StaticRangeDate;
  entry: PricingEntry;
}

export interface PricingEntry {
  firstNightPrice?: DineroSnapshot<number>;
  perNightPrice: DineroSnapshot<number>;

  numberOfGuestsBase?: number;
  numberOfGuestsMax?: number;
  minNumberOfNights?: number;

  additionalPersonPrice1?: DineroSnapshot<number>;
  additionalPersonPrice2?: DineroSnapshot<number>;
  additionalPersonPrice3?: DineroSnapshot<number>;

  additionalPersonText1?: string;
  additionalPersonText2?: string;
  additionalPersonText3?: string;
}

export interface PricingShort {
  id: string;
  kind: 'pricing-short';
  content: PricingShortContent;
}

export interface PricingShortContent {
  global?: PricingEntry;
  entries?: PricingRange[];
  ranges?: PricingRange[]; // is the same
  staticRanges?: StaticPricingRange[];
  showMaximum?: boolean;
  showMinimum?: boolean;
  footnote?: string;
}

export interface AmenitiesCore {
  id: string;
  kind: 'amenities-core';
  content: AmenitiesCoreContent;
}
export interface AmenitiesCoreContent {
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
}

export interface AccoCard {
  id: string;
  kind: 'acco-card';
  content: AccoCardContent;
}

export interface AccoCardContent {
  cardContent: CardContent;
  displayName: string;
}

export interface CardContent {
  coverPhoto: PhotoContent;
  slug?: string;
  blocks: Block[];
}

export interface AccoDescription {
  id: string;
  kind: 'acco-description';
  content: AccoDescriptionContent;
}

export interface AccoDescriptionContent {
  ref: string;
  minHeight?: string;
  textFontSize?: string;
  headerFontSize?: string;
  extendedHeaders?: boolean;
  extendedHeaders1Size?: string;
  extendedHeaders2Size?: string;
  extendedHeaders3Size?: string;
  extendedHeaders4Size?: string;
}

export interface ContactForm {
  id: string;
  kind: 'contact-form';
  content: ContactFormContent;
}

export interface ContactFormContent {
  userID: string;
  endpoint: string;
  nameLabel: string;
  emailLabel: string;
  questionLabel: string;
  submitText: string;
  successfullySentText: string;
  sentErroredText: string;
  maxCharsAllowed?: number;
  explainer?: string;
}

export interface BookingRequest {
  id: string;
  kind: 'booking-request';
  content: BookingRequestContent;
}

export interface BookingRequestContent {
  endpoint: string;
  userID: string;
  accoID: string;
  calUrl: string;
  nameLabel: string;
  emailLabel: string;
  dateEntryLabel: string;
  submitText: string;
  successfullySentText: string;
  sentErroredText: string;
  invalidText: string;
  messageLabel: string;
  numberOfNightsLabel: string;
  maxCharsAllowed?: number;
  explainer?: string;
}

export type Block =
  | Text
  | Photo
  | PhotoGallery
  | Calendar
  | CalendarAvailable
  | CalendarGrid
  | CalendarRows
  | Pricing
  | PricingShort
  | AmenitiesCore
  | Weather
  | LeafletMap
  | AccoCard
  | AccoDescription
  | ContactForm
  | BookingRequest
  | undefined;

export interface FontSpec {
  shortName: string;
  cssName: string;
  variant: string;
  fallback: string;
  fontsource: boolean;
}

export interface SiteTranslation {
  calendar: OccuplanTranslations;
  cookies: CookieTranslation;
  site: Record<string, string>;
}

export const FORMAT_TEMPLATE_NAMES = [
  'dateFormat',
  'monthHeader',
  'nothingAvailable',
  'availableFromFor',
  'minimumPrice',
  'maximumPrice',
  'additionalPersonPrice',
  'minNumberOfNights',
  'seating',
  'numberOf',
  'size',
  'bed',
];

export type FormatTemplateName = (typeof FORMAT_TEMPLATE_NAMES)[number];

export interface FormatSpec {
  locale: string;
  [tmpl: FormatTemplateName]: string;
}

export interface SiteFonts {
  main: FontSpec;
  nav: FontSpec;
  pageTitle: FontSpec;
  landingTitle: FontSpec;
  header: FontSpec;
}

export interface SiteConfig {
  settings: {
    ACCOMADE_USER_ID: string;
    PUBLIC_SUPABASE_URL: string;
  };
  cookies: {
    types: CookieType[];
    showIcon: boolean;
  };
  fonts: SiteFonts;
  nav: Nav;
  pages: {
    '/': PageProps;
    [key: string]: PageProps;
  };
  lang: {
    defaultLang: string;
    supportedLangs: string[];
    translations: Record<string, SiteTranslation>;
    formats: Record<string, FormatSpec>;
  };
  css: string;
}

export interface PageProps {
  id: string;
  path: string;
  lastChange?: string;
  created?: string;
  nav?: Nav;
  hero?: Hero;
  title?: string;
  slug?: string;
  logoLink?: string;
  header?: string;
  showFooter?: boolean;
  fixedHamburger?: boolean;
  content?: Section[];
}

export interface NavItem {
  key: string;
  path?: string;
  external?: boolean;
  sub?: boolean;
}

export interface Nav {
  main: NavItem[];
  footer: NavItem[];
}

export interface Hero {
  id: string;
  title: string;
  photoPath: string;
}

export interface Section {
  id: string;
  header?: string;
  translatedHeader?: string;
  columnCount?: number;
  padding?: string;
  maxWidth?: string;
  blocks?: Block[];
}

export interface I18nFacade {
  currentLang?: string;
  supportedLangs?: string[];
  calendarTranslation?: OccuplanTranslations;
  translateFunc?: (ref: string) => string;
  formatFunc?: (formatter: string, props: Record<string, any>) => string;
  formatMoneyFunc?: (d: Dinero<number> | DineroSnapshot<number>) => string;
  formatDateFunc?: (d: DateTime | string) => string;
  updateCurrentLang?: (lang: string) => void;
}

export const isAccoCard = (b: Block): b is AccoCard => {
  if (!b) return false;
  return b.kind === 'acco-card';
};

export const isText = (b: Block): b is Text => {
  if (!b) return false;
  return b.kind === 'text';
};

export const isPhoto = (b: Block): b is Photo => {
  if (!b) return false;
  return b.kind === 'photo';
};

export const isGallery = (b: Block): b is PhotoGallery => {
  if (!b) return false;
  return b.kind === 'gallery';
};

export const isLeafletMap = (b: Block): b is LeafletMap => {
  if (!b) return false;
  return b.kind === 'leaflet-map';
};

export const isWeather = (b: Block): b is Weather => {
  if (!b) return false;
  return b.kind === 'weather';
};

export const isAmenitiesCore = (b: Block): b is AmenitiesCore => {
  if (!b) return false;
  return b.kind === 'amenities-core';
};

export const isCalendarAvailable = (b: Block): b is CalendarAvailable => {
  if (!b) return false;
  return b.kind === 'calendar-available';
};

export const isCalendar = (b: Block): b is Calendar => {
  if (!b) return false;
  return b.kind === 'calendar';
};

export const isCalendarGrid = (b: Block): b is CalendarGrid => {
  if (!b) return false;
  return b.kind === 'calendar-grid';
};

export const isCalendarRows = (b: Block): b is CalendarRows => {
  if (!b) return false;
  return b.kind === 'calendar-rows';
};

export const isPricing = (b: Block): b is Pricing => {
  if (!b) return false;
  return b.kind === 'pricing';
};

export const isPricingShort = (b: Block): b is PricingShort => {
  if (!b) return false;
  return b.kind === 'pricing-short';
};

export const isAccoDescription = (b: Block): b is AccoDescription => {
  if (!b) return false;
  return b.kind === 'acco-description';
};

export const isContactForm = (b: Block): b is ContactForm => {
  if (!b) return false;
  return b.kind === 'contact-form';
};

export const isBookingRequest = (b: Block): b is BookingRequest => {
  if (!b) return false;
  return b.kind === 'booking-request';
};
