import type { CookieSelection, Translation as CookieTranslation } from 'gdpr-cooco-banner';
import { DateTime } from 'luxon';
import type { FormatSpec, I18nFacade, SiteConfig } from './types.js';
import type { OccuplanTranslations } from './occuplan/state.svelte.js';
import { format } from './helpers/format.js';
import { MoneyFormats } from './helpers/moneyFormats.js';

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
    return this.calendarTranslations[this.currentLang] ?? ({} as OccuplanTranslations);
  }
  get cookieTranslation(): CookieTranslation {
    return this.cookieTranslations[this.currentLang] ?? ({} as CookieTranslation);
  }

  get formats(): Record<string, FormatSpec> {
    return this._getSiteConfigFn().lang.formats;
  }

  #defaultFormats: Record<string, FormatSpec> | undefined;

  selectedTheme: 'light' | 'dark' = $state('light');
  selectedThemeInitialized: boolean = $state(false);

  constructor(
    getSiteConfig: () => SiteConfig,
    lang: string | undefined,
    defaultFormats?: Record<string, FormatSpec>,
  ) {
    this._getSiteConfigFn = getSiteConfig;
    this.#defaultFormats = defaultFormats;
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
    if (!current) return '';
    const value = current[ref];
    if (!value) return '';

    return value;
  };

  public formatFunc = (ref: string, props: Record<string, unknown>): string => {
    const langFormats = this.formats[this.currentLang];
    const defaultLangFormats = this.#defaultFormats?.[this.currentLang];
    const fString = langFormats?.[ref] ?? defaultLangFormats?.[ref];
    if (!fString) {
      console.warn(`[Missing formatFunc: ${ref}]`);
      return '[UNDEF]';
    }

    let formatted = format(fString, props as Record<string, string>);
    return formatted;
  };

  public formatDateFunc = (d: DateTime | string) => {
    if (!d) return this.translateFunc('invalid');

    const formatSpecs = this.formats[this.currentLang];
    const defaultFormatSpecs = this.#defaultFormats?.[this.currentLang];
    const effectiveFormat = formatSpecs ?? defaultFormatSpecs;
    if (!effectiveFormat) {
      return this.translateFunc('invalid');
    }
    let f = 'yyyy-MM-dd';
    if (effectiveFormat.dateFormat) {
      f = effectiveFormat.dateFormat;
    }

    let date: DateTime;
    if (typeof d === 'string') date = DateTime.fromISO(d);
    else date = d;

    if (!date.isValid) return this.translateFunc('invalid');

    return date.setLocale(effectiveFormat.locale).toFormat(f);
  };

  public formatMoneyFunc = (value: number): string => {
    const scaled = value / 100.0;
    const fmt = MoneyFormats[this.currentLang] ?? MoneyFormats['en'];
    if (!fmt) {
      return String(scaled);
    }
    return fmt.format(scaled);
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
