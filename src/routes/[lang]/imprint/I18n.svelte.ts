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
      'page-title': "Uschi's Holiday Apartments",
      'page-slug': 'Cosy and Sweet',
      'imprint-header': 'Imprint',
      imprint_html:
        '<section class="contact">\n  <strong>Kordula Schumacher</strong><br>\n  <p>\n    Achterstr. 3<br>\n    17459 Koserow - Deutschland<br>\n    Telefon: 038375 - 20562<br>\n    E-Mail: <a href="mailto:G.Schumacher@koserow.de">G.Schumacher@koserow.de</a>\n  </p>\n</section>\n<section>\n  <h2>Urheberrechte</h2>\n  <p>Die auf der Webseite verwendeten Fotos unterliegen dem Urheberrecht und dürfen ohne ausdrückliche Genehmigung des Urhebers nicht verwendet werden. Sollten Sie ein Foto verwenden möchten, wenden Sie sich bitte an den Betreiber der Webseite.</p>\n  <p>Sofern nicht direkt am Foto gekennzeichnet, handelt es sich bei den Fotos um eigene Werke.</p>\n  <p>Fotos, die mit dem Accomade-Logo versehen sind, sind Eigentum von "Accomade - Dirk Porsche", werden durch die Plattform: <a target="_blank" rel="noreferrer noopener" href="https://accoma.de">accoma.de</a> bereitgestellt und sind lizensiert.</p>\n</section>\n<section>\n  <h2>Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO</h2>\n  <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter <a href="http://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer noopener">http://ec.europa.eu/consumers/odr/</a> finden. Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und grundsätzlich nicht bereit.\n  </p>\n</section>\n<section>\n  Verantwortlich für den Inhalt nach § 5 TMG und § 55 RStV Abs.2: {name}\n</section>\n<section>\n  Verantwortlich für die technische Umsetzung, den Betrieb und die Bereitstellung der Plattform: <a  target="_blank" rel="noreferrer noopener" href="https://accoma.de">Accoma.de - Dirk Porsche</a>\n</section>\n',
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
      'page-title': "Uschi's Ferienwohnungen",
      'page-slug': 'Kuschelig und Herzlich',
      'imprint-header': 'Impressum',
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
      'page-title': "Uschi's Apartements",
      'page-slug': 'Chou et Belle',
      'imprint-header': 'Imprint',
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
        `??? => ${props.to.day ?? '28/29/30/31'}.${props.to.month}.`,
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
        `${props.fromDay ?? 1}.${props.fromMonth}. => ${props.toDay ?? '28/29/30/31'}.${props.toMonth}.`,
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
