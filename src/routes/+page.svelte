<script lang="ts">
  import type {
    AmenitiesCore as AmenitiesCoreBlock,
    I18nFacade,
    Text as TextBlock,
  } from '$lib/types.ts';
  import Text from '$lib/Text.svelte';
  import type { Dinero, DineroSnapshot } from 'dinero.js';
  import type { DateTime } from 'luxon';
  import Button from '$lib/basic/Button.svelte';
  import AmenitiesCore from '$lib/AmenitiesCore.svelte';
  import { randomID } from '$lib/names/gen.ts';

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

  let amenitiesCore: AmenitiesCoreBlock = $state({
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

  class I18n implements I18nFacade {
    currentLang = $state('en');
    calendarTranslation = $state('');
    translateFunc(ref: string): string {
      return translations[this.currentLang].textRef;
    }
    formatFunc(ref: string): string {
      return '';
    }
    formatMoneyFunc(d: Dinero<number> | DineroSnapshot<number>): string {
      return '';
    }
    formatDateFunc(d: string | DateTime<boolean>): string {
      return '';
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
    <div class="component-control">
      <div
        bind:textContent={translations[i18n.currentLang].textRef}
        style="height: 100%; padding: 1rem; width: 100%; border: 1px solid red; border-radius: 1rem;"
        contenteditable
      >
        {translations[i18n.currentLang].textRef}
      </div>
      <div class="input-wrapper">
        <label>
          Block Height
          <input type="text" bind:value={text.content.minHeight} />
        </label>
        <label>
          Text Fontsize
          <input type="text" bind:value={text.content.textFontSize} />
        </label>
        <label>
          H3 Fontsize
          <input type="text" bind:value={text.content.headerFontSize} />
        </label>
      </div>
    </div>
  </div>
  <h3>AmenitiesCore</h3>
  <div class="component">
    <div class="component-view">
      <AmenitiesCore {...amenitiesCore.content} {...i18n} />
    </div>
    <div class="component-control">
      <div
        bind:textContent={translations[i18n.currentLang].textRef}
        style="height: 100%; padding: 1rem; width: 100%; border: 1px solid red; border-radius: 1rem;"
        contenteditable
      >
        {translations[i18n.currentLang].textRef}
      </div>
      <div class="input-wrapper">
        <label>
          Block Height
          <input type="text" bind:value={text.content.minHeight} />
        </label>
        <label>
          Text Fontsize
          <input type="text" bind:value={text.content.textFontSize} />
        </label>
        <label>
          H3 Fontsize
          <input type="text" bind:value={text.content.headerFontSize} />
        </label>
      </div>
    </div>
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

  .input-wrapper {
    display: flex;
    flex-direction: column;
  }

  .component-control {
    display: flex;
    padding: 1rem;
    flex: 1;
    gap: 1rem;
  }
</style>
