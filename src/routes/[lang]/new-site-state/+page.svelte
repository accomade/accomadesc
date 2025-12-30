<script lang="ts">
  import '@fontsource/raleway/500.css';
  import '@fontsource/raleway/700.css';
  import type { FontSpec, Hero, Nav, PageProps, SiteConfig } from '$lib/types.js';

  import Page from '$lib/PageComponent.svelte';
  import { randomID, SiteState, type LeafletMapI, type SectionI } from '$lib/index.js';

  import { page } from '$app/state';
  let pathLang = page.params['lang'];

  import { css } from './style.ts';
  import { installTwicPics } from '@twicpics/components/sveltekit';
  import '@twicpics/components/style.css';
  import { DefaultCalTranslations } from '$lib/occuplan/defaultTranslations.ts';
  import { DefaultTranslations } from 'gdpr-cooco-banner';
  installTwicPics({
    domain: `https://accomade.twic.pics`,
  });

  const nav: Nav = {
    main: [
      {
        key: 'nav-1',
      },
      {
        key: 'nav-1',
        path: '/',
        external: false,
        sub: false,
      },
      {
        key: 'nav-3',
        path: 'https://google.com',
        external: false,
        sub: true,
      },
      {
        key: 'nav-3',
        path: 'https://google.com',
        external: true,
        sub: true,
      },
      {
        key: 'nav-3',
        path: 'https://google.com',
        external: true,
        sub: false,
      },
    ],
    footer: [
      {
        key: 'nav-2',
        path: '/heropage',
        external: false,
        sub: false,
      },
      {
        key: 'nav-3',
        path: 'https://google.com',
        external: true,
        sub: false,
      },
    ],
  };

  const heroTitle = 'hero-title';
  const hero: Hero = {
    id: randomID(),
    title: heroTitle,
    photoPath: 'https://accomade.twic.pics/prod/stock/photos/PXL_20220103_114534268.jpg',
  };

  const content: SectionI[] = [];
  const sec_1: SectionI = {
    header: 'sec_1_header',
    columnCount: 1,
    id: randomID(),
    padding: '5rem',
    blocks: [],
  };
  const map: LeafletMapI = {
    id: randomID(),
    kind: 'leaflet-map',
    content: {
      address: 'Somewher nice',
      lat: 56,
      long: 13,
      zoom: 10,
    },
  };
  sec_1.blocks?.push(map);
  content.push(sec_1);

  const p: PageProps = {
    id: 'someid',
    path: '/heropage',
    nav,
    hero,
    content,
    showFooter: true,
    fixedHamburger: false,
    navbarOverHamburger: false,
    disableLinks: false,
  };

  const font: FontSpec = {
    shortName: 'helvetica',
    cssName: 'Helvetica',
    variant: 'normal',
    fallback: 'sans-serif',
    fontsource: false,
  };

  let siteConfig: SiteConfig = $state({
    settings: {
      ACCOMADE_USER_ID: 'id',
      PUBLIC_SUPABASE_URL: 'http://localhost:54323',
    },
    cookies: {
      types: ['necessary'],
      showIcon: false,
    },
    fonts: {
      main: font,
      nav: font,
      pageTitle: font,
      landingTitle: font,
      header: font,
    },
    nav,
    pages: { '/': p, '/heropage': p },
    lang: {
      defaultLang: 'en',
      supportedLangs: ['en', 'de'],
      translations: {
        en: {
          calendar: DefaultCalTranslations['en'],
          cookies: DefaultTranslations['en'],
          site: {
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
        },
        de: {
          calendar: DefaultCalTranslations['de'],
          cookies: DefaultTranslations['de'],
          site: {
            'hero-title': 'Endlich Ferien!',
            footer_html: '<address>Dirk P.<br>Sollbrüggenstr. 15<br>47899 Krefeld</address>',
            'nav-1': 'Nav-1',
            'nav-2': 'Nav-2',
            'nav-3': 'Nav-3',
            lang: 'Language',
            en: 'English',
            de: 'Deutsch',
            fr: 'Francais',
            sec_1_header: 'Lokation',
          },
        },
      },
      formats: {
        en: {
          locale: 'en-US',
          dateFormat: 'yyyy/MM/dd',
          monthHeader: '{{month}} / {{year}}',
          nothingAvailable: 'No availability for {{forDays}} days until {{maxFutureDate}}',
          availableFromFor: 'Min. {{forDays}} days from {{from}} available',

          minimumPrice: 'From {{min}} per night',
          maximumPrice: 'To {{max}} per night',
          additionalPersonPrice: '{{price}} ({{terms}})',
          minNumberOfNights: '{{num}} nights',
          seating: 'Seating for {{num}} people',
          numberOf: '{{num}} pieces',
          size: '{{size}}&nbsp;m²',
          bed: 'for {{num}}',
        },
        de: {
          locale: 'de-DE',
          dateFormat: 'dd.MM.yyyy',
          monthHeader: '{{month}} / {{year}}',
          nothingAvailable: 'Nichts frei für {{forDays}} Tage bis {{maxFutureDate}}',
          availableFromFor: 'Mindestens {{forDays}} Tage ab dem {{from}} verfügbar',

          minimumPrice: 'Ab {{min}} pro Nacht',
          maximumPrice: 'Maximal {{max}} pro Nacht',
          additionalPersonPrice: '{{price}} ({{terms}})',
          minNumberOfNights: '{{num}} Nächte',
          seating: 'Sitzplätze für {{num}} Erwachsene',
          numberOf: 'Anzahl {{num}}',
          size: '{{size}}&nbsp;m²',
          bed: 'für {{num}} Person(en)',
        },
      },
    },
    css,
  });

  const siteState = new SiteState(() => {
    return siteConfig;
  }, pathLang);
</script>

<div class="showcase-wrapper">
  <Page {...p} {...siteState} {css} />
</div>

<style>
  .showcase-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
