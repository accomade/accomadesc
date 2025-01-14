import type { OccuplanTranslations } from '$lib/occuplan/state.svelte.ts';
import type { I18nFacade } from '$lib/types.js';
import { dinero, toDecimal, type Dinero, type DineroSnapshot } from 'dinero.js';
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
    },
  });

  formats: Record<string, Record<string, any>> = $state({
    en: {
      size: (props: Record<string, any>) => `${props.size} m<sup>2</sup>`,
      minimumPrice: (props: Record<string, any>) => `From ${this.formatMoneyFunc(props.min)}`,
      maximumPrice: (props: Record<string, any>) => `To ${this.formatMoneyFunc(props.max)}`,
      nothingAvailable: (props: Record<string, any>) =>
        `Not Available for ${props.forDays} days before ${this.formatDateFunc(props.maxFutureDate)}`,
      availableFromFor: (props: Record<string, any>) =>
        `Min. ${props.forDays} days from ${this.formatDateFunc(props.from)}`,

      additionalPersonPrice: (props: Record<string, any>) =>
        `${this.formatMoneyFunc(props.price)} for ${props.terms}`,
      minNumberOfNights: (props: Record<string, any>) => `${props.num} nights`,
      numberOfGuests: (props: Record<string, any>) => {
        if (!props.base && !props.max) return '';
        if (props.base && !props.max) return `${props.base}`;
        return `${props.base}-${props.max}`;
      },
      rangeFromTo: (props: Record<string, any>) =>
        `${this.formatDateFunc(props.from)} => ${this.formatDateFunc(props.to)}`,
      rangeFrom: (props: Record<string, any>) => `${this.formatDateFunc(props.from)} => ???`,
      rangeTo: (props: Record<string, any>) => `??? => ${this.formatDateFunc(props.to)}`,
      staticRangeFromTo: (props: Record<string, any>) =>
        `${props.from.day ?? 1}.${props.from.month}. => ${props.to.day ?? '28/29/30/31'}.${props.to.month}.`,
      staticRangeFrom: (props: Record<string, any>) =>
        `${props.from.day ?? 1}.${props.from.month}. => ???`,
      staticRangeTo: (props: Record<string, any>) =>
        `??? => ${props.to.day ?? '28/29/30/31'}.${props.to.month}.`,
    },
    de: {
      size: (props: Record<string, any>) => `${props.size} p<sup>3</sup>`,
      minimumPrice: (props: Record<string, any>) => `Von: ${this.formatMoneyFunc(props.min)}`,
      maximumPrice: (props: Record<string, any>) => `Bis: ${this.formatMoneyFunc(props.max)}`,
      nothingAvailable: (props: Record<string, any>) => `${JSON.stringify(props)}`,
      availableFromFor: (props: Record<string, any>) => `${JSON.stringify(props)}`,

      additionalPersonPrice: (props: Record<string, any>) =>
        `${this.formatMoneyFunc(props.price)} für ${props.terms}`,
      minNumberOfNights: (props: Record<string, any>) => `${props.num} Nächte`,
      numberOfGuests: (props: Record<string, any>) => {
        if (!props.base && !props.max) return '';
        if (props.base && !props.max) return `${props.base}`;
        return `${props.base}-${props.max}`;
      },
      rangeFromTo: (props: Record<string, any>) =>
        `${this.formatDateFunc(props.from)} => ${this.formatDateFunc(props.to)}`,
      rangeFrom: (props: Record<string, any>) => `${this.formatDateFunc(props.from)} => ???`,
      rangeTo: (props: Record<string, any>) => `??? => ${this.formatDateFunc(props.to)}`,
      staticRangeFromTo: (props: Record<string, any>) =>
        `${props.from.day ?? 1}.${props.from.month}. => ${props.to.day ?? '28/29/30/31'}.${props.to.month}.`,
      staticRangeFrom: (props: Record<string, any>) =>
        `${props.from.day ?? 1}.${props.from.month}. => ???`,
      staticRangeTo: (props: Record<string, any>) =>
        `??? => ${props.to.day ?? '28/29/30/31'}.${props.to.month}.`,
    },
    fr: {
      size: (props: Record<string, any>) => `${props.size} f<sup>2</sup>`,
      minimumPrice: (props: Record<string, any>) => `${JSON.stringify(props)}`,
      maximumPrice: (props: Record<string, any>) => `${JSON.stringify(props)}`,
      nothingAvailable: (props: Record<string, any>) => `${JSON.stringify(props)}`,
      availableFromFor: (props: Record<string, any>) => `${JSON.stringify(props)}`,

      additionalPersonPrice: (props: Record<string, any>) =>
        `${this.formatMoneyFunc(props.price)} e ${props.terms}`,
      minNumberOfNights: (props: Record<string, any>) => `${props.num} nuits`,
      numberOfGuests: (props: Record<string, any>) => {
        if (!props.base && !props.max) return '';
        if (props.base && !props.max) return `${props.base}`;
        return `${props.base}-${props.max}`;
      },
      rangeFromTo: (props: Record<string, any>) =>
        `${this.formatDateFunc(props.from)} => ${this.formatDateFunc(props.to)}`,
      rangeFrom: (props: Record<string, any>) => `${this.formatDateFunc(props.from)} => ???`,
      rangeTo: (props: Record<string, any>) => `??? => ${this.formatDateFunc(props.to)}`,
      staticRangeFromTo: (props: Record<string, any>) =>
        `${props.from.day ?? 1}.${props.from.month}. => ${props.to.day ?? '28/29/30/31'}.${props.to.month}.`,
      staticRangeFrom: (props: Record<string, any>) =>
        `${props.from.day ?? 1}.${props.from.month}. => ???`,
      staticRangeTo: (props: Record<string, any>) =>
        `??? => ${props.to.day ?? '28/29/30/31'}.${props.to.month}.`,
    },
  });

  currentLang = $state('en');
  calendarTranslation = $derived(calendarTranslations[this.currentLang]);

  isDinero(d: Dinero<number> | DineroSnapshot<number>): d is Dinero<number> {
    if ('calculator' in d) {
      return true;
    } else {
      return false;
    }
  }

  public translateFunc = (ref: string): string => {
    const translation = this.translations[this.currentLang];
    const res = translation[ref];
    if (!res) {
      return ref;
    } else {
      return res;
    }
  };

  public formatFunc = (ref: string, props: Record<string, any>): string => {
    if (!this.formats[this.currentLang][ref]) {
      console.log('missing formatFunc', ref);
      return '';
    } else {
      return this.formats[this.currentLang][ref](props);
    }
  };

  public formatMoneyFunc = (d: Dinero<number> | DineroSnapshot<number>): string => {
    if (!this.isDinero(d)) d = dinero(d);
    return toDecimal(d, ({ value, currency }) => `${value} ${currency.code}`);
  };

  public formatDateFunc = (d: string | DateTime<boolean>): string => {
    if (typeof d === 'string') {
      d = luxon.fromISO(d);
    }
    return d.toFormat('d. MMMM yy');
  };
}
