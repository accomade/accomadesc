import type { OccuplanTranslations } from '$lib/occuplan/state.svelte';
import type { I18nFacade } from '$lib/types.js';
import { DateTime as luxon, type DateTime } from 'luxon';

export const calendarTranslations: Record<string, OccuplanTranslations> = {
  en: {
    monthHeaderFormat: '{{year}}-{{month}}',
  },
  de: {
    monthHeaderFormat: '{{month}}-{{year}}',
  },
  fr: {
    monthHeaderFormat: '{{year}}/{{month}}',
  },
};

export class I18n implements I18nFacade {
  constructor(lang: string) {
    this.currentLang = lang;
  }

  updateCurrentLang = (lang: string) => (this.currentLang = lang);
  supportedLangs = ['de', 'en', 'fr'];
  translations: Record<string, Record<string, string>> = $state({
    en: {
      'hero-title': 'Finally Holidays!',
      footer_html: '<address>Dirk P.<br>Sollbrüggenstr. 15<br>47899 Krefeld</address>',
      'nav-1': 'Nav-1',
      'nav-2': 'Nav-2',
      'nav-3': 'Nav-3',
      lang: 'Language',
      en: 'English',
      de: 'Deutsch',
      fr: 'Francais',
      sec_1_header: 'Location',
    },
    de: {
      'hero-title': 'Endlich Urlaub!',
      footer_html: '<address>Dirk P.<br>Sollbrüggenstr. 15<br>47899 Krefeld</address>',
      'nav-1': 'Nav-1',
      'nav-2': 'Nav-2',
      'nav-3': 'Nav-3',
      lang: 'Sprache',
      en: 'English',
      de: 'Deutsch',
      fr: 'Francais',
      sec_1_header: 'Lokation',
    },
    fr: {
      'hero-title': 'Enfin en Vacances!',
      footer_html: '<address>Dirk P.<br>Sollbrüggenstr. 15<br>47899 Krefeld</address>',
      'nav-1': 'Nav-1',
      'nav-2': 'Nav-2',
      'nav-3': 'Nav-3',
      lang: 'Language',
      en: 'English',
      de: 'Deutsch',
      fr: 'Francais',
      sec_1_header: 'Location',
    },
  });

  formats: Record<string, Record<string, any>> = $state({
    en: {
      size: (props: Record<string, any>) => `${props.size} m<sup>2</sup>`,
      minimumPrice: (props: Record<string, any>) => `From ${props.min}`,
      maximumPrice: (props: Record<string, any>) => `To ${props.max}`,
      nothingAvailable: (props: Record<string, any>) =>
        `Not Available for ${props.forDays} days before ${props.maxFutureDate}`,
      availableFromFor: (props: Record<string, any>) =>
        `Min. ${props.forDays} days from ${props.from}`,

      additionalPersonPrice: (props: Record<string, any>) => `${props.price} for ${props.terms}`,
      minNumberOfNights: (props: Record<string, any>) => `${props.num} nights`,
      numberOfGuests: (props: Record<string, any>) => {
        if (!props.base && !props.max) return '';
        if (props.base && !props.max) return `${props.base}`;
        return `${props.base}-${props.max}`;
      },
      rangeFromTo: (props: Record<string, any>) => `${props.from} => ${props.to}`,
      rangeFrom: (props: Record<string, any>) => `${props.from} => ???`,
      rangeTo: (props: Record<string, any>) => `??? => ${props.to}`,
      staticRangeFromTo: (props: Record<string, any>) =>
        `${props.fromDay ?? 1}.${props.fromMonth}. => ${props.toDay ?? '28/29/30/31'}.${props.toMonth}.`,
      staticRangeFrom: (props: Record<string, any>) =>
        `${props.fromDay ?? 1}.${props.fromMonth}. => ???`,
      staticRangeTo: (props: Record<string, any>) =>
        `??? => ${props.toDay ?? '28/29/30/31'}.${props.toMonth}.`,
    },
    de: {
      size: (props: Record<string, any>) => `${props.size} p<sup>3</sup>`,
      minimumPrice: (props: Record<string, any>) => `Von: ${props.min}`,
      maximumPrice: (props: Record<string, any>) => `Bis: ${props.max}`,
      nothingAvailable: (props: Record<string, any>) => `${JSON.stringify(props)}`,
      availableFromFor: (props: Record<string, any>) => `${JSON.stringify(props)}`,

      additionalPersonPrice: (props: Record<string, any>) => `${props.price} für ${props.terms}`,
      minNumberOfNights: (props: Record<string, any>) => `${props.num} Nächte`,
      numberOfGuests: (props: Record<string, any>) => {
        if (!props.base && !props.max) return '';
        if (props.base && !props.max) return `${props.base}`;
        return `${props.base}-${props.max}`;
      },
      rangeFromTo: (props: Record<string, any>) => `${props.from} => ${props.to}`,
      rangeFrom: (props: Record<string, any>) => `${props.from} => ???`,
      rangeTo: (props: Record<string, any>) => `??? => ${props.to}`,
      staticRangeFromTo: (props: Record<string, any>) =>
        `${props.fromday ?? 1}.${props.fromMonth}. => ${props.toDay ?? '28/29/30/31'}.${props.toMonth}.`,
      staticRangeFrom: (props: Record<string, any>) =>
        `${props.fromDay ?? 1}.${props.fromMonth}. => ???`,
      staticRangeTo: (props: Record<string, any>) =>
        `??? => ${props.toDay ?? '28/29/30/31'}.${props.toMonth}.`,
    },
    fr: {
      size: (props: Record<string, any>) => `${props.size} f<sup>2</sup>`,
      minimumPrice: (props: Record<string, any>) => `${JSON.stringify(props)}`,
      maximumPrice: (props: Record<string, any>) => `${JSON.stringify(props)}`,
      nothingAvailable: (props: Record<string, any>) => `${JSON.stringify(props)}`,
      availableFromFor: (props: Record<string, any>) => `${JSON.stringify(props)}`,

      additionalPersonPrice: (props: Record<string, any>) => `${props.price} e ${props.terms}`,
      minNumberOfNights: (props: Record<string, any>) => `${props.num} nuits`,
      numberOfGuests: (props: Record<string, any>) => {
        if (!props.base && !props.max) return '';
        if (props.base && !props.max) return `${props.base}`;
        return `${props.base}-${props.max}`;
      },
      rangeFromTo: (props: Record<string, any>) =>
        `${props.from} => ${this.formatDateFunc(props.to)}`,
      rangeFrom: (props: Record<string, any>) => `${props.from} => ???`,
      rangeTo: (props: Record<string, any>) => `??? => ${props.to}`,
      staticRangeFromTo: (props: Record<string, any>) =>
        `${props.fromDay ?? 1}.${props.fromMonth}. => ${props.toDay ?? '28/29/30/31'}.${props.toMonth}.`,
      staticRangeFrom: (props: Record<string, any>) =>
        `${props.fromDay ?? 1}.${props.fromMonth}. => ???`,
      staticRangeTo: (props: Record<string, any>) =>
        `??? => ${props.toDay ?? '28/29/30/31'}.${props.toMonth}.`,
    },
  });

  currentLang = $state('en');
  calendarTranslation = $derived(calendarTranslations[this.currentLang]);

  public translateFunc = (ref: string): string => {
    const translation = this.translations[this.currentLang];
    const res = translation[ref];
    if (!res) {
      return ref;
    } else {
      return res;
    }
  };

  public translateWithLangFunc = (ref: string, lang: string) => {
    return this.translations[lang][ref];
  }

  public formatFunc = (ref: string, props: Record<string, any>): string => {
    if (!this.formats[this.currentLang][ref]) {
      console.log('missing formatFunc', ref);
      return '';
    } else {
      return this.formats[this.currentLang][ref](props);
    }
  };

  public formatMoneyFunc = (value: number): string => {
    const locale = this.formats[this.currentLang].locale;
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(value);
  };

  public formatDateFunc = (d: string | DateTime<boolean>): string => {
    if (typeof d === 'string') {
      d = luxon.fromISO(d);
    }
    return d.toFormat('d. MMMM yy');
  };
}
