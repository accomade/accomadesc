<script lang="ts">
  import type {
    AmenitiesCore as AmenitiesCoreBlock,
    I18nFacade,
    Text as TextBlock,
  } from '$lib/types.ts';
  import Text from '$lib/Text.svelte';
  import type { Dinero, DineroSnapshot } from 'dinero.js';
  import { dinero, toDecimal } from 'dinero.js';
  import type { DateTime } from 'luxon';
  import { DateTime as luxon } from 'luxon';
  import Button from '$lib/basic/Button.svelte';
  import AmenitiesCore from '$lib/AmenitiesCore.svelte';
  import { randomID } from '$lib/names/gen.ts';

  import TextEditor from './TextEditor.svelte';
  import AmenitiesEditor from './AmenitiesEditor.svelte';

  let textRef = 'textRef';
  let text: TextBlock = $state({
    id: textRef,
    kind: 'text',
    content: {
      ref: textRef,
      minHeight: '10rem',
      textFontSize: '1rem',
      headerFontSize: '1rem',
    },
  });

  let amenities: AmenitiesCoreBlock = $state({
    id: randomID(),
    kind: 'amenities-core',
    content: {
      peopleMin: 4,
      peopleMax: 5,
      size: 56,
      bedRooms: 2,
      bathRooms: 1,
      pets: true,
      showPets: true,
      wifi: false,
      showWifi: true,
      smoking: false,
      showSmoking: false,
      ac: true,
      showAc: true,
      tv: true,
      showTv: true,
      parking: false,
      showParking: false,
    },
  });

  let translations: Record<string, Record<string, string>> = $state({
    en: {
      textRef: '<h3>HEADER</h3><p>Some english text</p>',
    },
    de: {
      textRef: '<h3>HEADER</h3><p>Ein deutscher text</p>',
    },
    fr: {
      textRef: '<h3>HEADER</h3><p>En francaise text</p>',
    },
  });

  let formats: Record<string, Record<string, any>> = $state({
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

  const isDinero = (d: Dinero<number> | DineroSnapshot<number>): d is Dinero<number> => {
    if ('calculator' in d) {
      return true;
    } else {
      return false;
    }
  };

  class I18n implements I18nFacade {
    currentLang = $state('en');
    calendarTranslation = $state('');
    translateFunc(ref: string): string {
      return translations[this.currentLang][ref];
    }
    formatFunc(ref: string, props: Record<string, any>): string {
      return formats[this.currentLang][ref](props);
    }
    formatMoneyFunc(d: Dinero<number> | DineroSnapshot<number>): string {
      if (!isDinero(d)) d = dinero(d);
      return toDecimal(d, ({ value, currency }) => `${value} ${currency.code}`);
    }
    formatDateFunc(d: string | DateTime<boolean>): string {
      if (typeof d === 'string') {
        d = luxon.fromISO(d);
      }
      return d.toFormat('d. MMMM yy');
    }
  }

  const i18n = new I18n();
</script>

<h1>Welcome to Accomade Svelte Components (accomadesc)</h1>
<h2>Components Show-Case</h2>
<div class="wrapper">
  <div class="lang-switcher">
    <Button
      pressed={i18n.currentLang == 'en'}
      text="en"
      clicked={() => (i18n.currentLang = 'en')}
    />
    <Button
      pressed={i18n.currentLang == 'de'}
      text="de"
      clicked={() => (i18n.currentLang = 'de')}
    />
    <Button
      pressed={i18n.currentLang == 'fr'}
      text="fr"
      clicked={() => (i18n.currentLang = 'fr')}
    />
  </div>
  <h3>Text</h3>
  <div class="component">
    <div class="component-view">
      <Text {...text.content} {...i18n} />
    </div>
    <TextEditor
      bind:text={translations[i18n.currentLang].textRef}
      bind:minHeight={text.content.minHeight}
      bind:textFontSize={text.content.textFontSize}
      bind:headerFontSize={text.content.headerFontSize}
    />
  </div>
  <h3>AmenitiesCore</h3>
  <div class="component">
    <div class="component-view">
      <AmenitiesCore {...amenities.content} {...i18n} />
    </div>
    <AmenitiesEditor
      bind:peopleMin={amenities.content.peopleMin}
      bind:peopleMax={amenities.content.peopleMax}
      bind:size={amenities.content.size}
      bind:bedRooms={amenities.content.bedRooms}
      bind:bathRooms={amenities.content.bathRooms}
      bind:pets={amenities.content.pets}
      bind:showPets={amenities.content.showPets}
      bind:wifi={amenities.content.wifi}
      bind:showWifi={amenities.content.showWifi}
      bind:smoking={amenities.content.smoking}
      bind:showSmoking={amenities.content.showSmoking}
      bind:ac={amenities.content.ac}
      bind:showAc={amenities.content.showAc}
      bind:tv={amenities.content.tv}
      bind:showTv={amenities.content.showTv}
      bind:parking={amenities.content.parking}
      bind:showParking={amenities.content.showParking}
    />
  </div>
</div>

<style>
  .lang-switcher {
    display: flex;
    justify-content: right;
  }

  h1 {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    margin-left: 0.5rem;
  }
  h2 {
    margin: 1rem;
  }
  h3 {
    text-align: center;
  }

  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .wrapper {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    width: 100vw;
  }
  .component {
    display: flex;
    width: 100%;
    border-radius: 2rem;
    border: 2px solid black;
  }

  .component-view {
    padding: 1rem;
    flex: 1;
    min-width: 40%;
  }
</style>
