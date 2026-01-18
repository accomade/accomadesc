import type { CookieSelection, Translation as CookieTranslation } from 'gdpr-cooco-banner';
import { DateTime } from 'luxon';
import type { FormatSpec, I18nFacade, SiteConfig } from './types.js';
import type { OccuplanTranslations } from './occuplan/state.svelte.js';
import { format } from './helpers/format.js';

interface FullTranslation {
  calendar: OccuplanTranslations;
  cookies: CookieTranslation;
  site: Record<string, string>;
}

export class SiteState implements I18nFacade {
  _getSiteConfigFn: () => SiteConfig;

  //fullTranslations: Record<string, FullTranslation> = $derived(this._getSiteConfigFn().lang.translations);
  get fullTranslations(): Record<string, FullTranslation> {
    return this._getSiteConfigFn().lang.translations;
  }

  get calendarTranslations(): Record<string, OccuplanTranslations> {
    return Object.entries(this.fullTranslations).reduce(
      (s, e) => {
        s[e[0]] = e[1].calendar;
        return s;
      },
      {} as Record<string, OccuplanTranslations>,
    );
  }

  get cookieTranslations(): Record<string, CookieTranslation> {
    return Object.entries(this.fullTranslations).reduce(
      (s, e) => {
        s[e[0]] = e[1].cookies;
        return s;
      },
      {} as Record<string, CookieTranslation>,
    );
  }

  get siteTranslations(): Record<string, Record<string, string>> {
    return Object.entries(this.fullTranslations).reduce(
      (s, e) => {
        s[e[0]] = e[1].site;
        return s;
      },
      {} as Record<string, Record<string, string>>,
    );
  }

  get supportedLangs(): string[] {
    return this._getSiteConfigFn().lang.supportedLangs;
  }

  cookieSelection: CookieSelection = $state({
    analytics: false,
    marketing: false,
    preferences: false,
    necessary: true,
  });

  currentLang: string = $state('en');

  get translations(): Record<string, Record<string, string>> {
    return this.siteTranslations;
  }
  get calendarTranslation(): OccuplanTranslations {
    return this.calendarTranslations[this.currentLang];
  }
  get cookieTranslation(): CookieTranslation {
    return this.cookieTranslations[this.currentLang];
  }

  get formats(): Record<string, FormatSpec> {
    return this._getSiteConfigFn().lang.formats;
  }

  selectedTheme: 'light' | 'dark' = $state('light');
  selectedThemeInitialized: boolean = $state(false);

  constructor(getSiteConfig: () => SiteConfig, lang: string | undefined) {
    this._getSiteConfigFn = getSiteConfig;
    if (!lang || !getSiteConfig().lang.supportedLangs.includes(lang)) {
      this.currentLang = getSiteConfig().lang.defaultLang;
    } else {
      this.currentLang = lang;
    }
  }

  public updateCurrentLang = (lang: string) => (this.currentLang = lang);

  public translateFunc = (ref: string): string => {
    if (!ref) return '[UNDEF]';

    const current = this.translations[this.currentLang];
    if (!current[ref]) return '';

    return this.translations[this.currentLang][ref];
  };

  public formatFunc = (ref: string, props: Record<string, any>): string => {
    const fString = this.formats[this.currentLang][ref];
    if (!fString) {
      console.warn(`[Missing formatFunc: ${ref}]`);
      return '[UNDEF]';
    }

    let formatted = format(fString, props);
    return formatted;
  };

  public formatDateFunc = (d: DateTime | string) => {
    if (!d) return this.translateFunc('invalid');

    const formatSpecs = this.formats[this.currentLang];
    let f = 'yyyy-MM-dd';
    if (formatSpecs?.dateFormat) {
      f = formatSpecs.dateFormat;
    }

    let date: DateTime;
    if (typeof d === 'string') date = DateTime.fromISO(d);
    else date = d;

    // if d was invalid to begin with or
    // translformation from ISO didn't yield a valid DateTime object
    if (date.isValid) return this.translateFunc('invalid');

    return date.setLocale(formatSpecs.locale).toFormat(f);
  };

  public translateWithLangFunc = (ref: string, lang: string): string => {
    const translation = this.translations[lang];
    if (!translation) {
      console.error(`[Tried to access unknown translation: ${lang}]`);
      return '[UNDEF]';
    }

    const res = translation[ref];
    if (res === undefined) {
      console.warn(`[Missing Translation for: ${ref}]`);
      return '[UNDEF]';
    } else {
      return res;
    }
  };
}
