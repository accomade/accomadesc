import { format, type I18nFacade, type OccuplanTranslations } from 'accomadesc';
import type { CookieSelection, Translation as CookieTranslation } from 'gdpr-cooco-banner';
import { DateTime } from 'luxon';
import type { SiteConfig } from './types.ts';

interface FullTranslation {
  calendar: OccuplanTranslations;
  cookies: CookieTranslation;
  site: Record<string, string>;
}

export class SiteState implements I18nFacade {

  fullTranslations: Record<string, FullTranslation> = {}
  calendarTranslations: Record<string, OccuplanTranslations> = {};
  cookieTranslations: Record<string, CookieTranslation> = {};
  siteTranslations: Record<string, Record<string, string>> = {};

  supportedLangs: string[] = $state(['en']);
  isMenuOpen = $state(false);
  cookieSelection: CookieSelection = $state({
    analytics: false,
    marketing: false,
    preferences: false,
    necessary: true,
  });
  currentLang: string = $state('en');
  translations: Record<string, Record<string, string>> = $state(this.siteTranslations);

  calendarTranslation: OccuplanTranslations = $derived(this.calendarTranslations[this.currentLang]);
  cookieTranslation: CookieTranslation = $state(this.cookieTranslations[this.currentLang]);

  formats: Record<string, Record<string, any>> = $state({});
  selectedTheme: 'light' | 'dark' = $state('light');
  selectedThemeInitialized: boolean = $state(false);

  constructor(siteConfig: SiteConfig, lang: string | undefined) {

    if (!lang || !siteConfig.lang.supportedLangs.includes(lang)) {
      this.currentLang = siteConfig.lang.defaultLang;
    } else {
      this.currentLang = lang;
    }

    this.fullTranslations = siteConfig.lang.translations as Record<
      string,
      FullTranslation
    >;

    for (const lang in this.fullTranslations) {
      this.calendarTranslations[lang] = this.fullTranslations[lang].calendar;
      this.siteTranslations[lang] = this.fullTranslations[lang].site;
      this.cookieTranslations[lang] = this.fullTranslations[lang].cookies;
    }

    this.supportedLangs = siteConfig.lang.supportedLangs;
    this.formats = siteConfig.lang.formats;
  }

  public updateCurrentLang = (lang: string) => (this.currentLang = lang);

  public translateFunc = (ref: string): string => {
    if (!ref) return 'UNDEF';

    const current = this.translations[this.currentLang];
    if (!current[ref]) return '';

    return this.translations[this.currentLang][ref];
  };

  public formatFunc = (ref: string, props: Record<string, any>): string => {
    const fString = this.formats[this.currentLang][ref];
    if (!fString) {
      console.log('missing formatFunc', ref);
      return '';
    }

    let formatted = format(fString, props);
    return formatted;
  };

  public formatDateFunc = (d: DateTime | string) => {

    let f = 'yyyy-MM-dd';
    if (this.formats[this.currentLang]?.dateFormat) {
      f = this.formats[this.currentLang].dateFormat;
    }

    let date: DateTime;
    if (typeof d === 'string') date = DateTime.fromISO(d);
    else date = d;

    return date.toFormat(f);
  };
}
