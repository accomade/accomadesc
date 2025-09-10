<script lang="ts">
  import '@fontsource/raleway/500.css';
  import '@fontsource/raleway/700.css';
  import type { Hero, Nav, PageProps } from '$lib/types.js';

  import Page from '$lib/PageComponent.svelte';
  import { randomID, type LeafletMapI, type SectionI } from '$lib/index.js';

  import { page } from '$app/state';
  let pathLang = page.params['lang'];

  import { css } from './style.ts';
  import { installTwicPics } from '@twicpics/components/sveltekit';
  import '@twicpics/components/style.css';
  installTwicPics({
    domain: `https://accomade.twic.pics`,
  });

  import { I18n } from './I18n.svelte.ts';
  const i18n = new I18n(pathLang ?? 'en');

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
    disableLinks: true,
  };
</script>

<div class="showcase-wrapper">
  <Page {...p} {...i18n} {css} />
</div>

<style>
  .showcase-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
