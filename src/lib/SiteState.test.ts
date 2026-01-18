import { describe, it, expect } from 'vitest';
import { SiteState } from './SiteState.svelte.js';
import type { SiteConfig } from './types.js';
import type { WeekdayNumbers, MonthNumbers } from 'luxon';

interface MockOccuplanTranslations {
  arrivalLabel?: string;
  leaveLabel?: string;
  header?: string;
  footer?: string;
  weekendLabel?: string;
  weekdayLabels?: Record<WeekdayNumbers, string>;
  monthLabels?: Record<MonthNumbers, string>;
  monthHeaderFormat?: string;
  datePickerDateFormat?: string;
  numberOfNights?: string;
  nextPage?: string;
  prevPage?: string;
  typeLabels?: Record<string, string>;
}

const createMockSiteConfig = (
  supportedLangs: string[] = ['en', 'de'],
  defaultLang: string = 'en',
): SiteConfig => ({
  settings: {
    ACCOMADE_USER_ID: 'test-user',
    PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
  },
  cookies: {
    types: [],
    showIcon: true,
  },
  fonts: {
    main: {
      shortName: 'Main',
      cssName: 'main-font',
      variant: 'normal',
      fallback: 'sans-serif',
      fontsource: false,
    },
    nav: {
      shortName: 'Nav',
      cssName: 'nav-font',
      variant: 'normal',
      fallback: 'sans-serif',
      fontsource: false,
    },
    pageTitle: {
      shortName: 'Title',
      cssName: 'title-font',
      variant: 'normal',
      fallback: 'serif',
      fontsource: false,
    },
    landingTitle: {
      shortName: 'Landing',
      cssName: 'landing-font',
      variant: 'normal',
      fallback: 'serif',
      fontsource: false,
    },
    header: {
      shortName: 'Header',
      cssName: 'header-font',
      variant: 'normal',
      fallback: 'sans-serif',
      fontsource: false,
    },
  },
  nav: {
    main: [],
    footer: [],
  },
  pages: {
    '/': { id: 'home', path: '/' },
  },
  lang: {
    defaultLang,
    supportedLangs,
    translations: {
      en: {
        calendar: {
          arrivalLabel: 'Arrival',
          leaveLabel: 'Departure',
          header: 'Calendar',
          weekdayLabels: {
            1: 'Mon',
            2: 'Tue',
            3: 'Wed',
            4: 'Thu',
            5: 'Fri',
            6: 'Sat',
            7: 'Sun',
          } as unknown as MockOccuplanTranslations,
        } as unknown as MockOccuplanTranslations,
        cookies: { accept: 'Accept', reject: 'Reject' },
        site: { welcome: 'Welcome', goodbye: 'Goodbye' },
      },
      de: {
        calendar: {
          arrivalLabel: 'Anreise',
          leaveLabel: 'Abreise',
          header: 'Kalender',
          weekdayLabels: {
            1: 'Mo',
            2: 'Di',
            3: 'Mi',
            4: 'Do',
            5: 'Fr',
            6: 'Sa',
            7: 'So',
          } as unknown as MockOccuplanTranslations,
        } as unknown as MockOccuplanTranslations,
        cookies: { accept: 'Akzeptieren', reject: 'Ablehnen' },
        site: { welcome: 'Willkommen', goodbye: 'Auf Wiedersehen' },
      },
    },
    formats: {
      en: { locale: 'en-US', dateFormat: 'yyyy-MM-dd' },
      de: { locale: 'de-DE', dateFormat: 'dd.MM.yyyy' },
    },
  },
  css: {
    base: '',
    themes: { light: '', dark: '' },
  },
});

describe('SiteState', () => {
  describe('constructor', () => {
    it('uses provided language when supported', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, 'de');
      expect(state.currentLang).toBe('de');
    });

    it('uses default language when provided language not supported', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, 'fr');
      expect(state.currentLang).toBe('en');
    });

    it('uses default language when undefined provided', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, undefined);
      expect(state.currentLang).toBe('en');
    });

    it('initializes with default theme', () => {
      const config = createMockSiteConfig();
      const state = new SiteState(() => config, 'en');
      expect(state.selectedTheme).toBe('light');
    });
  });

  describe('updateCurrentLang', () => {
    it('updates current language', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, 'en');
      state.updateCurrentLang('de');
      expect(state.currentLang).toBe('de');
    });

    it('updates to unsupported language (method does not validate)', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, 'en');
      state.updateCurrentLang('fr');
      expect(state.currentLang).toBe('fr');
    });
  });

  describe('translateFunc', () => {
    it('returns translation for existing key', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, 'en');
      expect(state.translateFunc('welcome')).toBe('Welcome');
    });

    it('returns empty string for missing key', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, 'en');
      expect(state.translateFunc('nonexistent')).toBe('');
    });

    it('returns [UNDEF] for empty ref', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, 'en');
      expect(state.translateFunc('')).toBe('[UNDEF]');
    });

    it('switches translations based on current language', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, 'en');
      expect(state.translateFunc('welcome')).toBe('Welcome');
      state.updateCurrentLang('de');
      expect(state.translateFunc('welcome')).toBe('Willkommen');
    });
  });

  describe('translateWithLangFunc', () => {
    it('returns translation for specified language', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, 'en');
      expect(state.translateWithLangFunc('welcome', 'de')).toBe('Willkommen');
    });

    it('returns [UNDEF] for unknown language', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, 'en');
      expect(state.translateWithLangFunc('welcome', 'fr')).toBe('[UNDEF]');
    });

    it('returns [UNDEF] for missing translation key', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, 'en');
      expect(state.translateWithLangFunc('missing', 'en')).toBe('[UNDEF]');
    });
  });

  describe('formatFunc', () => {
    it('formats string with replacements', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      config.lang.formats.en.dateFormat = '{{year}}-{{month}}-{{day}}';
      const state = new SiteState(() => config, 'en');
      expect(state.formatFunc('dateFormat', { year: '2024', month: '05', day: '15' })).toBe(
        '2024-05-15',
      );
    });

    it('returns [UNDEF] for missing format spec', () => {
      const config = createMockSiteConfig(['en', 'de'], 'en');
      const state = new SiteState(() => config, 'en');
      expect(state.formatFunc('nonexistent', {})).toBe('[UNDEF]');
    });
  });

  describe('supportedLangs', () => {
    it('returns supported languages from config', () => {
      const config = createMockSiteConfig(['en', 'de', 'fr'], 'en');
      const state = new SiteState(() => config, 'en');
      expect(state.supportedLangs).toEqual(['en', 'de', 'fr']);
    });
  });

  describe('cookieSelection', () => {
    it('initializes with default values', () => {
      const config = createMockSiteConfig();
      const state = new SiteState(() => config, 'en');
      expect(state.cookieSelection.analytics).toBe(false);
      expect(state.cookieSelection.marketing).toBe(false);
      expect(state.cookieSelection.preferences).toBe(false);
      expect(state.cookieSelection.necessary).toBe(true);
    });
  });
});
