import type { I18nFacade } from '$lib/types.ts';
import { dinero, toDecimal, type Dinero, type DineroSnapshot } from 'dinero.js';
import { DateTime as luxon, type DateTime } from 'luxon';

export class I18n implements I18nFacade {
  translations: Record<string, Record<string, string>> = $state({
    en: {
      textRef: '<h3>HEADER</h3><p>Some english text</p>',
      photoAlt: 'A Lake',
      priceGAdd1: 'Kids',
      priceGAdd2: 'Teens',
      priceGAdd3: 'Toddlers',
      priceGFoot: 'Towel package 15.50 Euro',
      timeRange: 'Range',
      firstNight: 'First Night',
      eachNight: 'Every Night',
      peopleNum: '# Guests',
      extraPerson: 'Addon Guest(s)',
      minNumNights: 'Min. Nights',
      globalPricing: 'Prices',
      accoCCCalt: 'Picture of Apartment',
    },
    de: {
      textRef: '<h3>HEADER</h3><p>Ein deutscher text</p>',
      photoAlt: 'Ein See',
      priceGAdd1: 'Kinder',
      priceGAdd2: 'Teenagers',
      priceGAdd3: 'Babys',
      priceGFoot: 'Handtuch-Paket 15.50 Euro',
      timeRange: 'Zeitraum',
      firstNight: 'Erste Nacht',
      eachNight: 'Pro Nacht',
      peopleNum: '# Gäste',
      extraPerson: 'Zus. Gäste',
      minNumNights: 'Min. Nächte',
      globalPricing: 'Basispreis',
      accoCCCalt: 'Bild vom Apartment',
    },
    fr: {
      textRef: '<h3>HEADER</h3><p>En francaise text</p>',
      photoAlt: 'Un Lac',
      priceGAdd1: 'Kids',
      priceGAdd2: 'Teens',
      priceGAdd3: 'Toddlers',
      priceGFoot: 'Towel packackage 15.50 Euro',
      timeRange: 'Range',
      firstNight: 'First Night',
      eachNight: 'Every Night',
      peopleNum: '# Guests',
      extraPerson: 'Addon Guest(s)',
      minNumNights: 'Min. Nights',
      globalPricing: 'Prices',
      accoCCCalt: 'Picture of Apartment',
    },
  });

  formats: Record<string, Record<string, any>> = $state({
    en: {
      size: (props: Record<string, any>) => `${props.size} m<sup>2</sup>`,
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
  calendarTranslation = $state('');

  isDinero(d: Dinero<number> | DineroSnapshot<number>): d is Dinero<number> {
    if ('calculator' in d) {
      return true;
    } else {
      return false;
    }
  }

  public translateFunc = (ref: string): string => {
    return this.translations[this.currentLang][ref];
  };
  public formatFunc = (ref: string, props: Record<string, any>): string => {
    if (this.formats[this.currentLang][ref]) {
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
