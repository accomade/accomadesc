import type { I18nFacade } from '$lib/types.ts';
import { dinero, toDecimal, type Dinero, type DineroSnapshot } from 'dinero.js';
import { DateTime as luxon, type DateTime } from 'luxon';

export class I18n implements I18nFacade {
  translations: Record<string, Record<string, string>> = $state({
    en: {
      textRef: '<h3>HEADER</h3><p>Some english text</p>',
      photoAlt: 'A Lake',
    },
    de: {
      textRef: '<h3>HEADER</h3><p>Ein deutscher text</p>',
      photoAlt: 'Ein See',
    },
    fr: {
      textRef: '<h3>HEADER</h3><p>En francaise text</p>',
      photoAlt: 'Un Lac',
    },
  });

  formats: Record<string, Record<string, any>> = $state({
    en: {
      size: (props: Record<string, any>) => `${props.size} m<sup>2</sup>`,
    },
    de: {
      size: (props: Record<string, any>) => `${props.size} p<sup>3</sup>`,
    },
    fr: {
      size: (props: Record<string, any>) => `${props.size} f<sup>2</sup>`,
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

  translateFunc(ref: string): string {
    return this.translations[this.currentLang][ref];
  }
  formatFunc(ref: string, props: Record<string, any>): string {
    return this.formats[this.currentLang][ref](props);
  }
  formatMoneyFunc(d: Dinero<number> | DineroSnapshot<number>): string {
    if (!this.isDinero(d)) d = dinero(d);
    return toDecimal(d, ({ value, currency }) => `${value} ${currency.code}`);
  }
  formatDateFunc(d: string | DateTime<boolean>): string {
    if (typeof d === 'string') {
      d = luxon.fromISO(d);
    }
    return d.toFormat('d. MMMM yy');
  }
}
