<script lang="ts">
  import '@fontsource/raleway/500.css';
  import '@fontsource/raleway/700.css';

  import {
    PageComponent,
    randomID,
    type LeafletMapI,
    type SectionI,
    type TextI,
    type PageProps,
    type NavI,
  } from '$lib/index.ts';

  import { css } from './style.ts';
  import { page } from '$app/state';
  let pathLang = page.params['lang'];

  import { installTwicPics } from '@twicpics/components/sveltekit';
  import '@twicpics/components/style.css';
  installTwicPics({
    domain: `https://accomade.twic.pics`,
  });

  import { I18n } from './I18n.svelte.ts';
  const i18n = new I18n(pathLang);

  const ACCOMADE_USER_ID = 'template1';
  const PUBLIC_SUPABASE_URL = 'https://ipajhcabityibeaqfzju.supabase.co';
  const logoLink = `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/users/${ACCOMADE_USER_ID}/logo.svg`;

  const nav: NavI = {
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

  const content: SectionI[] = [];

  const sec_1: SectionI = {
    columnCount: 1,
    id: randomID(),
    padding: '15%',
    maxWidth: '25rem',
    blocks: [],
  };
  const text: TextI = {
    id: randomID(),
    kind: 'text',
    content: {
      extendedHeaders: true,
      ref: 'imprint_html',
    },
  };
  sec_1.blocks?.push(text);
  content.push(sec_1);

  const sec_2: SectionI = {
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
  sec_2.blocks?.push(map);
  content.push(sec_2);

  const p: PageProps = {
    id: 'someid',
    path: '/heropage',
    nav,
    content,
    logoLink,
    header: 'imprint-header',
    title: 'page-title',
    slug: 'page-slug',
    showFooter: true,
    navbarOverHamburger: false,
    fixedHamburger: false,
  };
</script>

<div class="showcase-wrapper">
  <PageComponent {...p} {...i18n} {css} />
</div>

<style>
  .showcase-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
