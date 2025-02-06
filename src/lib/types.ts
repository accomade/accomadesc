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

export interface LangConfig {
  defaultLang: string;
  supportedLangs: string[];
  translations: Record<string, SiteTranslation>;
  formats: Record<string, FormatSpec>;
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
  lang: LangConfig;
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
  footerRef?: string;
  fixedHamburger?: boolean;
  navbarOverHamburger?: boolean;
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

export interface Lang {
  flag: string;
  short: string;
  englishName: string;
  locale: string;
  active: boolean;
}

export const Languages: Record<string, Lang> = {
  en: {
    active: true,
    short: 'en',
    englishName: 'English',
    locale: 'en-US',
    flag: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 4.95C32.475 2.775 28.425 1.5 24 1.5V4.95H36Z" fill="#ED4C5C"/><path d="M24 8.4H40.2C38.925 7.125 37.5 5.925 36 4.95H24V8.4Z" fill="white"/><path d="M24 11.85H42.975C42.15 10.575 41.25 9.44999 40.275 8.39999H24V11.85Z" fill="#ED4C5C"/><path d="M24 15.3H44.775C44.25 14.1 43.65 12.9 42.975 11.85H24V15.3Z" fill="white"/><path d="M24 18.75H45.9C45.6 17.55 45.225 16.425 44.775 15.3H24V18.75Z" fill="#ED4C5C"/><path d="M24 22.275H46.425C46.35 21.075 46.125 19.95 45.9 18.825H24V22.275Z" fill="white"/><path d="M46.425 22.275H24V24H1.5C1.5 24.6 1.5 25.125 1.575 25.725H46.425C46.5 25.125 46.5 24.6 46.5 24C46.5 23.4 46.5 22.8 46.425 22.275Z" fill="#ED4C5C"/><path d="M2.10001 29.175H45.9C46.2 28.05 46.35 26.925 46.425 25.725H1.57501C1.65001 26.85 1.87501 28.05 2.10001 29.175Z" fill="white"/><path d="M3.22501 32.625H44.775C45.225 31.5 45.6 30.375 45.9 29.175H2.10001C2.40001 30.375 2.77501 31.5 3.22501 32.625Z" fill="#ED4C5C"/><path d="M5.02501 36.075H42.975C43.65 34.95 44.25 33.825 44.775 32.625H3.22501C3.75001 33.825 4.35001 34.95 5.02501 36.075Z" fill="white"/><path d="M7.72499 39.525H40.275C41.25 38.475 42.225 37.275 42.975 36.075H5.02499C5.77499 37.35 6.74999 38.475 7.72499 39.525Z" fill="#ED4C5C"/><path d="M11.925 42.975H36.075C37.65 42 39 40.8 40.275 39.525H7.72501C9.00001 40.875 10.425 42 11.925 42.975Z" fill="white"/><path d="M24 46.5C28.425 46.5 32.55 45.225 36.075 42.975H11.925C15.45 45.225 19.575 46.5 24 46.5Z" fill="#ED4C5C"/><path d="M12 4.95C10.425 5.925 9 7.125 7.725 8.4C6.675 9.45 5.775 10.65 5.025 11.85C4.35 12.975 3.675 14.1 3.225 15.3C2.775 16.425 2.4 17.55 2.1 18.75C1.8 19.875 1.65 21 1.575 22.2C1.5 22.8 1.5 23.4 1.5 24H24V1.5C19.575 1.5 15.525 2.775 12 4.95Z" fill="#428BC1"/><path d="M18.75 2.25L19.125 3.375H20.25L19.35 4.125L19.65 5.25L18.75 4.575L17.85 5.25L18.15 4.125L17.25 3.375H18.375L18.75 2.25ZM21.75 6.75L22.125 7.875H23.25L22.35 8.625L22.65 9.75L21.75 9.075L20.85 9.75L21.15 8.625L20.25 7.875H21.375L21.75 6.75ZM15.75 6.75L16.125 7.875H17.25L16.35 8.625L16.65 9.75L15.75 9.075L14.85 9.75L15.15 8.625L14.25 7.875H15.375L15.75 6.75ZM18.75 11.25L19.125 12.375H20.25L19.35 13.125L19.65 14.25L18.75 13.575L17.85 14.25L18.15 13.125L17.25 12.375H18.375L18.75 11.25ZM12.75 11.25L13.125 12.375H14.25L13.35 13.125L13.65 14.25L12.75 13.575L11.85 14.25L12.15 13.125L11.25 12.375H12.375L12.75 11.25ZM6.74999 11.25L7.12499 12.375H8.24999L7.34999 13.125L7.64999 14.25L6.74999 13.575L5.84999 14.25L6.14999 13.125L5.24999 12.375H6.37499L6.74999 11.25ZM21.75 15.75L22.125 16.875H23.25L22.35 17.625L22.65 18.75L21.75 18.075L20.85 18.75L21.15 17.625L20.25 16.875H21.375L21.75 15.75ZM15.75 15.75L16.125 16.875H17.25L16.35 17.625L16.65 18.75L15.75 18.075L14.85 18.75L15.15 17.625L14.25 16.875H15.375L15.75 15.75ZM9.74999 15.75L10.125 16.875H11.25L10.35 17.625L10.65 18.75L9.74999 18.075L8.84999 18.75L9.14999 17.625L8.24999 16.875H9.37499L9.74999 15.75ZM18.75 20.25L19.125 21.375H20.25L19.35 22.125L19.65 23.25L18.75 22.575L17.85 23.25L18.15 22.125L17.25 21.375H18.375L18.75 20.25ZM12.75 20.25L13.125 21.375H14.25L13.35 22.125L13.65 23.25L12.75 22.575L11.85 23.25L12.15 22.125L11.25 21.375H12.375L12.75 20.25ZM6.74999 20.25L7.12499 21.375H8.24999L7.34999 22.125L7.64999 23.25L6.74999 22.575L5.84999 23.25L6.14999 22.125L5.24999 21.375H6.37499L6.74999 20.25ZM8.84999 9.75L9.74999 9.075L10.65 9.75L10.275 8.625L11.175 7.875H10.05L9.74999 6.75L9.37499 7.875H8.32499L9.22499 8.55L8.84999 9.75ZM2.84999 18.75L3.74999 18.075L4.64999 18.75L4.27499 17.625L5.17499 16.875H4.12499L3.74999 15.75L3.37499 16.875H2.62499C2.62499 16.95 2.54999 17.025 2.54999 17.1L3.14999 17.55L2.84999 18.75Z" fill="white"/>
    </svg>
    `,
  },
  de: {
    active: true,
    short: 'de',
    englishName: 'German',
    locale: 'de-DE',
    flag: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.925 1.5C14.1 1.5 5.77501 7.8 2.70001 16.5H45.15C42.075 7.8 33.75 1.5 23.925 1.5Z" fill="#3E4347"/><path d="M23.925 46.5C33.75 46.5 42.075 40.275 45.15 31.5H2.70001C5.77501 40.275 14.1 46.5 23.925 46.5Z" fill="#FFE62E"/><path d="M2.69999 16.5C1.87499 18.825 1.42499 21.375 1.42499 24C1.42499 26.625 1.87499 29.175 2.69999 31.5H45.15C45.975 29.175 46.425 26.625 46.425 24C46.425 21.375 45.975 18.825 45.15 16.5H2.69999Z" fill="#ED4C5C"/></svg>`,
  },
  fr: {
    active: true,
    short: 'fr',
    englishName: 'French',
    locale: 'fr-FR',
    flag: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1.42499 24C1.42499 33.825 7.72499 42.15 16.425 45.225V2.775C7.72499 5.85 1.42499 14.175 1.42499 24Z" fill="#428BC1"/><path d="M46.425 24C46.425 14.175 40.2 5.85 31.425 2.775V45.225C40.2 42.15 46.425 33.825 46.425 24Z" fill="#ED4C5C"/><path d="M16.425 45.225C18.75 46.05 21.3 46.5 23.925 46.5C26.55 46.5 29.1 46.05 31.425 45.225V2.775C29.1 1.95 26.625 1.5 23.925 1.5C21.225 1.5 18.75 1.95 16.425 2.775V45.225Z" fill="white"/>
    </svg>
    `,
  },
  es: {
    active: true,
    short: 'es',
    englishName: 'Spanish',
    locale: 'es-ES',
    flag: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 24C1.5 28.425 2.775 32.55 4.95 36H42.975C45.15 32.55 46.425 28.425 46.425 24C46.425 19.575 45.15 15.45 42.975 12H4.95C2.775 15.45 1.5 19.575 1.5 24Z" fill="#FFCE31"/><path d="M43.05 12C39.075 5.7 32.025 1.5 24 1.5C15.975 1.5 8.92501 5.7 4.95001 12H43.05ZM4.95001 36C8.92501 42.3 15.975 46.5 24 46.5C32.025 46.5 39.075 42.3 43.05 36H4.95001Z" fill="#ED4C5C"/><path d="M6.89999 21.525H9.29999V22.875H6.89999V21.525ZM6.89999 31.425H9.37499V32.7H6.89999V31.425Z" fill="#C8B100"/><path d="M6.67499 29.325C6.44999 29.475 6.29999 29.625 6.29999 29.7C6.29999 29.775 6.37499 29.85 6.52499 29.925C6.67499 30 6.82499 30.15 6.74999 30.3C6.89999 30.15 6.97499 30 6.97499 29.85C6.97499 29.625 6.82499 29.4 6.67499 29.325Z" fill="#ED4C5C"/><path d="M7.27499 22.875H8.99999V31.425H7.27499V22.875Z" fill="white"/><path d="M10.8 26.025C10.425 25.875 9.75001 25.725 9.00001 25.725C8.77501 25.725 8.47501 25.725 8.17501 25.8C7.12501 25.95 6.30001 26.4 6.37501 26.7L6.00001 25.875C5.92501 25.5 6.82501 25.05 7.95001 24.825C8.32501 24.75 8.70001 24.75 9.00001 24.75C9.75001 24.75 10.425 24.825 10.8 24.975V26.025Z" fill="#ED4C5C"/><path d="M7.27501 27.15C6.82501 27.15 6.45001 27 6.45001 26.775C6.45001 26.625 6.60001 26.4 6.90001 26.25H7.35001L7.27501 27.15ZM9.00001 26.475C9.30001 26.55 9.52501 26.625 9.67501 26.7C9.75001 26.775 9.45001 27.075 9.00001 27.3V26.475Z" fill="#ED4C5C"/><path d="M6.15 28.8C6.075 28.65 6.6 28.35 7.275 28.125C7.575 28.05 7.8 27.9 8.175 27.75C9.075 27.375 9.825 26.85 9.675 26.7L9.825 27.6C9.9 27.75 9.3 28.2 8.4 28.65C8.1 28.8 7.575 29.025 7.275 29.1C6.75 29.25 6.3 29.55 6.3 29.625L6.15 28.8Z" fill="#ED4C5C"/><path d="M23.025 21.525H25.425V22.875H23.025V21.525ZM22.95 31.425H25.425V32.7H22.95V31.425Z" fill="#C8B100"/><path d="M25.65 29.325C25.875 29.475 26.025 29.625 26.025 29.7C26.025 29.775 25.95 29.85 25.8 29.925C25.65 30.075 25.5 30.3 25.575 30.375C25.425 30.225 25.35 30.075 25.35 29.925C25.35 29.625 25.5 29.4 25.65 29.325Z" fill="#ED4C5C"/><path d="M23.325 22.875H25.05V31.425H23.325V22.875Z" fill="white"/><path d="M21.525 26.025C21.9 25.875 22.575 25.725 23.325 25.725C23.55 25.725 23.85 25.725 24.15 25.8C25.2 25.95 26.025 26.4 25.95 26.7L26.325 25.8C26.4 25.425 25.5 24.975 24.375 24.75H23.325C22.575 24.75 21.9 24.825 21.525 24.975V26.025Z" fill="#ED4C5C"/><path d="M25.05 27.15C25.5 27.15 25.875 27 25.875 26.775C25.875 26.625 25.725 26.4 25.425 26.25H24.975L25.05 27.15ZM23.325 26.475C23.025 26.55 22.8 26.625 22.65 26.7C22.575 26.775 22.875 27.075 23.325 27.3V26.475Z" fill="#ED4C5C"/><path d="M26.175 28.8C26.25 28.65 25.725 28.35 25.05 28.125C24.75 28.05 24.525 27.9 24.15 27.75C23.25 27.375 22.5 26.85 22.65 26.7L22.5 27.6C22.425 27.75 23.025 28.2 23.925 28.65C24.225 28.8 24.75 29.025 25.05 29.1C25.575 29.25 26.025 29.625 25.95 29.7L26.175 28.8ZM16.125 16.725C17.55 16.725 20.475 17.025 21.525 18.075C20.4 20.775 18.6 19.65 16.125 19.65C13.725 19.65 11.85 20.775 10.725 18.075C11.775 17.025 14.625 16.725 16.125 16.725Z" fill="#ED4C5C"/><path d="M19.8 19.725C18.9 19.2 17.55 19.125 16.125 19.125C14.7 19.125 13.35 19.275 12.45 19.725L12.75 21C13.575 21.225 14.775 21.375 16.125 21.375C17.475 21.375 18.6 21.225 19.5 21L19.8 19.725ZM21.075 16.5C20.775 16.275 20.175 16.05 19.65 16.05C19.425 16.05 19.2 16.05 18.975 16.125C18.975 16.125 18.525 15.525 17.475 15.525C17.1 15.525 16.8 15.6 16.5 15.75V15.675C16.425 15.525 16.275 15.375 16.125 15.375C15.975 15.375 15.75 15.6 15.75 15.75V15.825C15.45 15.675 15.15 15.6 14.775 15.6C13.725 15.6 13.275 16.275 13.275 16.2C13.05 16.125 12.825 16.125 12.6 16.125C9.15001 16.125 10.875 18.45 10.875 18.45L11.25 18C10.425 16.95 11.175 16.35 12.675 16.35C12.9 16.35 13.05 16.35 13.2 16.425C12.675 17.175 13.65 17.85 13.65 17.85L13.875 17.475C13.35 17.1 13.275 15.825 14.775 15.825C15.15 15.825 15.45 15.9 15.75 16.125C15.75 16.2 15.675 17.25 15.6 17.4L16.2 17.925L16.8 17.4C16.725 17.175 16.65 16.2 16.65 16.125C16.875 15.975 17.25 15.825 17.625 15.825C19.2 15.825 19.2 17.1 18.525 17.475L18.75 17.85C18.75 17.85 19.575 17.175 19.2 16.425C19.35 16.425 19.575 16.35 19.725 16.35C21.525 16.35 21.6 17.7 21.15 18L21.45 18.45C21.3 18.45 22.125 17.4 21.075 16.5Z" fill="#C8B100"/><path d="M15.675 15.075C15.675 14.85 15.9 14.625 16.125 14.625C16.425 14.625 16.575 14.85 16.575 15.075C16.575 15.3 16.35 15.525 16.125 15.525C15.9 15.525 15.675 15.3 15.675 15.075Z" fill="#005BBF"/><path d="M15.975 13.8V14.025H15.75V14.25H15.975V15H15.675V15.225H16.575L16.65 15.075L16.575 15H16.275V14.25H16.5V14.025H16.275V13.8H15.975Z" fill="#C8B100"/><path d="M16.125 21.225C14.925 21.225 13.875 21.075 13.05 20.85C13.875 20.625 14.925 20.475 16.125 20.475C17.325 20.475 18.375 20.625 19.2 20.85C18.45 21.075 17.325 21.225 16.125 21.225Z" fill="#ED4C5C"/><path d="M16.2 34.2C14.775 34.2 13.425 33.825 12.225 33.3C11.325 32.85 10.8 32.025 10.8 31.05V27.45H21.6V31.05C21.6 32.025 21 32.925 20.175 33.3C18.975 33.9 17.625 34.2 16.2 34.2ZM16.125 21.45H21.525V27.45H16.125V21.45Z" fill="white"/><path d="M16.2 31.05C16.2 32.475 15 33.6 13.5 33.6C12 33.6 10.8 32.475 10.8 31.05V27.45H16.2V31.05Z" fill="#ED4C5C"/><path d="M11.925 33.15C12.075 33.225 12.3 33.375 12.6 33.45V27.3H12L11.925 33.15ZM10.725 30.975C10.725 31.725 11.025 32.325 11.325 32.625V27.3H10.725V30.975Z" fill="#C8B100"/><path d="M13.125 33.6H13.725V27.3H13.125V33.6Z" fill="#C7B500"/><path d="M14.325 33.45C14.55 33.375 14.85 33.225 15 33.15V27.3H14.4L14.325 33.45Z" fill="#C8B100"/><path d="M10.725 21.45H16.125V27.45H10.725V21.45Z" fill="#ED4C5C"/><path d="M15.6 32.625C15.9 32.4 16.125 31.875 16.2 31.275V27.375H15.6V32.625Z" fill="#C8B100"/><path d="M21.6 27.45V31.05C21.6 32.475 20.4 33.6 18.9 33.6C17.4 33.6 16.2 32.475 16.2 31.05V27.45H21.6ZM19.65 22.5C19.875 22.95 19.875 24.075 19.2 23.85C19.35 23.925 19.425 24.45 19.65 24.75C20.025 25.2 20.475 24.825 20.4 24.3C20.25 23.475 20.325 22.95 20.475 22.125C20.475 22.2 20.85 22.2 21 22.05C20.925 22.275 20.85 22.575 21 22.575C20.85 22.8 20.475 23.175 20.4 23.4C20.325 23.925 21.15 24.9 20.25 25.125C19.65 25.275 20.025 25.725 20.25 25.95C20.25 25.95 19.95 26.925 20.1 26.85C19.5 27.075 19.65 26.55 19.65 26.55C19.95 25.65 19.125 25.575 19.2 25.425C18.45 25.35 19.275 26.1 18.6 26.1C18.45 26.1 18.15 26.25 18.15 26.25C17.325 26.175 17.775 25.425 18.075 25.5C18.3 25.575 18.525 25.95 18.525 25.425C18.525 25.425 18.15 24.825 19.125 24.825C18.75 24.825 18.525 24.525 18.375 24.15C18.225 24.225 18 24.6 17.175 24.675C17.175 24.675 16.95 23.85 17.175 24C17.475 24.15 17.625 24.15 17.925 23.85C17.775 23.625 16.875 23.325 17.025 22.8C17.025 22.65 17.475 22.425 17.475 22.425C17.4 22.8 17.625 23.175 18.075 23.175C18.675 23.25 18.45 23.025 18.525 22.875C18.6 22.725 19.05 22.95 18.9 22.575C18.9 22.5 18.375 22.425 18.525 22.2C18.825 21.825 19.275 22.125 19.65 22.5ZM16.2 33.45L16.05 33.075L16.2 32.625L16.35 33.075L16.2 33.45Z" fill="#ED4C5C"/><path d="M12.375 22.725V23.1H12.525V23.4H12.15V24.15H12.375V25.8H11.925V26.625H15V25.8H14.625V24.15H14.775V23.4H14.4V23.1H14.625V22.725H13.875V23.1H14.025V23.4H13.65V22.5H13.875V22.125H13.05V22.5H13.275V23.4H12.9V23.1H13.05V22.725H12.375ZM20.85 31.95V28.2H16.95V31.95L18.75 32.775H18.975L20.85 31.95ZM18.75 28.5V29.775L17.475 28.5H18.75ZM17.175 28.575L18.675 30.075L17.175 31.575V28.575ZM17.325 31.875L18.75 30.45V32.55L17.325 31.875ZM18.975 32.475V30.375L20.4 31.8L18.975 32.475ZM20.55 31.575L19.05 30.075L20.55 28.575V31.575ZM18.975 28.5H20.25L18.975 29.775V28.5Z" fill="#C8B100"/><path d="M14.4 27.375C14.4 26.25 15.15 25.425 16.125 25.425C17.1 25.425 17.85 26.325 17.85 27.375C17.85 28.425 17.1 29.325 16.125 29.325C15.15 29.325 14.4 28.5 14.4 27.375Z" fill="#ED4C5C"/><path d="M14.925 27.375C14.925 26.55 15.45 25.95 16.125 25.95C16.8 25.95 17.325 26.625 17.325 27.375C17.325 28.2 16.8 28.8 16.125 28.8C15.525 28.875 14.925 28.2 14.925 27.375Z" fill="#005BBF"/><path d="M15.6 26.4L15.3 27.225L15.525 27.3L15.375 27.6H15.825L15.675 27.3L15.9 27.225L15.6 26.4ZM16.725 26.4L16.425 27.225L16.65 27.3L16.5 27.6H16.95L16.875 27.3L17.1 27.225L16.725 26.4ZM16.2 27.375L15.825 28.2L16.05 28.275L15.975 28.575H16.35L16.275 28.275L16.5 28.2L16.2 27.375Z" fill="#C8B100"/></svg>`,
  },
  pl: {
    active: true,
    short: 'pl',
    englishName: 'Polish',
    locale: 'pl-PL',
    flag: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 1.5C36.45 1.5 46.5 11.55 46.5 24H1.5C1.5 11.55 11.55 1.5 24 1.5Z" fill="#F9F9F9"/><path d="M24 46.5C11.55 46.5 1.5 36.45 1.5 24H46.5C46.5 36.45 36.45 46.5 24 46.5Z" fill="#ED4C5C"/></svg>`,
  },
};

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
