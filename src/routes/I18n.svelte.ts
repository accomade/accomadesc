import { MoneyFormats } from '$lib/index.ts';
import type { OccuplanTranslations } from '$lib/occuplan/state.svelte.ts';
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
  supportedLangs = ['en', 'fr', 'de'];
  translations: Record<string, Record<string, string>> = $state({
    en: {
      accRef: 'Some subtitle with <i>formatting</i>',
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
      weatherRef1: 'Koserow',
      weatherRef2: 'Weather',
      cfRef1: 'Name',
      cfRef2: 'Email',
      cfRef3: 'Submit',
      cfRef4: 'Your Message',
      cfRef5: 'Successfully Sent!',
      cfRef6: 'An error occurred!',
      cfRef7: '<p>Please feel free to send us a message if you have any questions.</p>',
      brRef1: 'Name',
      brRef2: 'Email',
      brRef3: 'Submit',
      brRef4: 'Your Message',
      brRef5: 'Successfully Sent!',
      brRef6: 'An error occurred!',
      brRef7: 'Vacation Dates',
      brRef8: 'Number of Nights',
      brRef9: 'Hallo',
      brRef10:
        '<p>Booking requests will be responded upon as soon as possible. Please be patient. Only our confirmation makes a booking binding.</p>',
      availability: 'Availability',
      calendarHeader: 'Calendar',
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
      weatherRef1: 'Koserow',
      weatherRef2: 'Wetter',
      cfRef1: 'Name',
      cfRef2: 'Email',
      cfRef3: 'Absenden',
      cfRef4: 'Ihre Nachricht',
      cfRef5: 'Erfolgreich gesendet!',
      cfRef6: 'Es ist ein Fehler aufgetreten!',
      brRef1: 'Name',
      brRef2: 'Email',
      brRef3: 'Absenden',
      brRef4: 'Ihre Nachricht',
      brRef5: 'Successfully Sent!',
      brRef6: 'An error occurred!',
      brRef7: 'Reisedaten',
      brRef8: '# Nächte',
      availability: 'Verfügbarkeit',
      calendarHeader: 'Belegung',
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
      weatherRef1: 'Koserow',
      weatherRef2: 'Clima',
      cfRef1: 'Name',
      cfRef2: 'Email',
      cfRef3: 'Submit',
      cfRef4: 'Ihre Nachricht',
      cfRef5: 'Erfolg!',
      cfRef6: 'Fehler!',
      brRef1: 'Name',
      brRef2: 'Email',
      brRef3: 'Submit',
      brRef4: 'Ihre Nachricht',
      brRef5: 'Successfully Sent!',
      brRef6: 'An error occurred!',
      brRef7: 'Vacation Dates',
      brRef8: 'Number of Nights',
      availability: 'Availability',
      calendarHeader: 'Calendar',
    },
  });

  formats: Record<string, Record<string, any>> = $state({
    en: {
      locale: 'en-US',
      dateFormat: 'MM/dd/yyyy',
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
      staticRangeFromTo: (props: Record<string, any>) => `${props.fromMonth} => ${props.toMonth}`,
      staticRangeFrom: (props: Record<string, any>) => `${props.fromMonth} => ???`,
      staticRangeTo: (props: Record<string, any>) => `??? => ${props.toMonth}`,
    },
    de: {
      locle: 'de-DE',
      dateFormat: 'yyyy-MM-dd',
      size: (props: Record<string, any>) => `${props.size} m<sup>2</sup>`,
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
      staticRangeFromTo: (props: Record<string, any>) => `${props.fromMonth} => ${props.toMonth}`,
      staticRangeFrom: (props: Record<string, any>) => `${props.fromMonth}. => ???`,
      staticRangeTo: (props: Record<string, any>) => `??? => ${props.toMonth}`,
    },
    fr: {
      locale: 'fr-FR',
      dateFormat: 'yyyy-MM-dd',
      size: (props: Record<string, any>) => `${props.size} m<sup>2</sup>`,
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
      rangeFromTo: (props: Record<string, any>) => `${props.from} => ${props.to}`,
      rangeFrom: (props: Record<string, any>) => `${props.from} => ???`,
      rangeTo: (props: Record<string, any>) => `??? => ${props.to}`,
      staticRangeFromTo: (props: Record<string, any>) => `${props.fromMonth} => ${props.toMonth}`,
      staticRangeFrom: (props: Record<string, any>) => `${props.fromMonth} => ???`,
      staticRangeTo: (props: Record<string, any>) => `??? => ${props.toMonth}`,
    },
  });

  currentLang = $state('en');
  calendarTranslation = $derived(calendarTranslations[this.currentLang]);

  public translateFunc = (ref: string): string => {
    return this.translations[this.currentLang][ref];
  };

  public formatFunc = (ref: string, props: Record<string, any>): string => {
    if (!this.formats[this.currentLang][ref]) {
      console.log('missing formatFunc', ref);
      return '';
    } else {
      return this.formats[this.currentLang][ref](props);
    }
  };

  moneyFormat = $derived(MoneyFormats[this.currentLang]);
  public formatMoneyFunc = (value: number): string => {
    const scaled = value / 100.0;
    return this.moneyFormat.format(scaled);
  };

  public formatDateFunc = (d: string | DateTime<boolean>): string => {
    if (typeof d === 'string') {
      d = luxon.fromISO(d);
    }
    const dFormat = this.formats[this.currentLang].dateFormat;
    return d.toFormat(dFormat);
  };
}
