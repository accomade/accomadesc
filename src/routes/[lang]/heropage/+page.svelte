<script lang="ts">
  import '@fontsource/raleway/500.css';
  import '@fontsource/raleway/700.css';
  import Button from '$lib/basic/Button.svelte';
  import type { Hero, Nav, PageProps } from '$lib/types.ts';

  import Page from '$lib/PageComponent.svelte';
  import { randomID, type LeafletMapI, type SectionI } from '$lib/index.ts';

  import { page } from '$app/state';
  let pathLang = page.params['lang'];

  import { css as initialCss } from '../../css.ts';
  import CssEditor from '../../CssEditor.svelte';
  let css = $state(initialCss);
  let styleOpen = $state(false);

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
  };
</script>

<div class="showcase-wrapper">
  <h3>
    Colors And Styles &nbsp;{#if styleOpen}<Button
        clicked={() => (styleOpen = !styleOpen)}
        text="Close"
      />{:else}<Button clicked={() => (styleOpen = !styleOpen)} text="Show" />{/if}
  </h3>
  {#if styleOpen}
    <div>
      <CssEditor bind:css />
    </div>
  {/if}

  <div class="page-wrapper" style={css}>
    <Page {...p} {...i18n} />
  </div>
</div>

<style>
  .showcase-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .page-wrapper {
    width: 100%;
    height: 100vh;
  }
</style>
