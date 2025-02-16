<script lang="ts">
  import Photo from '$lib/Photo.svelte';
  import Section from '$lib/Section.svelte';
  import Hamburger from '$lib/Hamburger.svelte';
  import PageHeader from '$lib/PageHeader.svelte';
  import PageFooter from '$lib/PageFooter.svelte';
  import {
    type Nav,
    type PageProps,
    type Section as SectionI,
    type I18nFacade,
  } from '$lib/types.js';
  import NavItem from './NavItem.svelte';
  import { fade } from 'svelte/transition';
  import Icon from './basic/Icon.svelte';
  import { page } from '$app/state';

  let {
    hero,
    header,
    title,
    slug,
    logoLink,
    content,
    nav,
    showFooter = true,
    footerRef = 'footer_html',
    fixedHamburger = true,
    navbarOverHamburger = true,
    translateFunc,
    formatMoneyFunc,
    formatDateFunc,
    formatFunc,
    supportedLangs,
    updateCurrentLang,
    currentLang,
    calendarTranslation,
  }: PageProps & I18nFacade = $props();

  let pageTitle = hero && hero.title ? hero.title : header ? header : title;

  let langSelectorOpen = $state(false);
  let allTranslations = $state(supportedLangs);

  let currentPath = $derived(page.url.pathname);
  const pathForLang = (lang: string) => {
    const pathElements = currentPath.split('/');
    //initial slash results in empty string real first element
    if (pathElements.length == 1) return `/${lang}`;

    const firstElement = pathElements[1];
    if (allTranslations?.includes(firstElement)) {
      return ['', lang, ...pathElements.slice(2)].join('/');
    } else {
      return ['', lang, ...pathElements.slice(1)].join('/');
    }
  };

  let hamburgerOpen = $state(false);
  let pageWidth = $state(0);
</script>

<svelte:head>
  <title
    >{translateFunc && pageTitle
      ? translateFunc(pageTitle)
      : //TODO default to something here?
        ''}</title
  >
</svelte:head>

{#snippet navbar(nav: Nav)}
  <div class="nav" transition:fade>
    {#each nav.main as n}
      {#if n.path && !n.sub}
        <div class="link-wrapper">
          <NavItem {n} {currentLang} {translateFunc} />
        </div>
      {/if}
    {/each}
    {#if supportedLangs && supportedLangs.length > 1}
      <div class="langs-switcher" style="display:flex; gap: 0.2rem;">
        {#each supportedLangs as l}
          {#if l == currentLang}
            <div class="flag-wrapper disabled">
              <Icon iconName={l} height="1.5rem" width="1.5rem" />
            </div>
          {:else}
            <div class="flag-wrapper">
              <a
                onclick={() => (updateCurrentLang ? updateCurrentLang(l) : '')}
                href={pathForLang(l)}
              >
                <Icon iconName={l} height="1.5rem" width="1.5rem" />
              </a>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
{/snippet}

<div class="page-wrapper" bind:clientWidth={pageWidth}>
  {#if hero}
    <header class="hero-image">
      <Photo photoPath={hero.photoPath} alt="Hero Image" eager={true} />
      {#if nav && navbarOverHamburger && pageWidth > 799}
        <div class="hero-nav-wrapper">
          {@render navbar(nav)}
        </div>
      {/if}
    </header>

    <div class="floating-title">
      <h1>{translateFunc ? translateFunc(hero.title) : ''}</h1>
    </div>
  {:else}
    {#if title}
      <PageHeader {title} {slug} {logoLink} {translateFunc} />
    {/if}
    {#if nav && navbarOverHamburger && pageWidth > 799}
      {@render navbar(nav)}
    {/if}
    {#if header}
      <h1>{@html translateFunc ? translateFunc(header) : ''}</h1>
    {/if}
  {/if}

  <main class:hero-margin={hero}>
    {#if content}
      {#each content as s}
        <div class="section-wrapper">
          <Section
            {...s as SectionI}
            {translateFunc}
            {formatMoneyFunc}
            {formatDateFunc}
            {formatFunc}
            {currentLang}
            {calendarTranslation}
          />
        </div>
      {/each}
    {/if}
  </main>

  {#if nav && showFooter}
    <div class="footer-wrapper">
      <PageFooter {nav} ref={footerRef} {translateFunc} {currentLang} />
    </div>
  {/if}

  {#if nav}
    {#if !navbarOverHamburger || pageWidth < 800}
      <div class="ham-wrapper" class:fixed={fixedHamburger || hamburgerOpen}>
        <Hamburger
          {nav}
          {translateFunc}
          {currentLang}
          {supportedLangs}
          {updateCurrentLang}
          bind:isMenuOpen={hamburgerOpen}
        />
      </div>
    {/if}
  {/if}

  {#if langSelectorOpen && allTranslations && allTranslations.length > 1}
    <fieldset class="lang-selector" transition:fade>
      <legend>{translateFunc ? translateFunc('lang') : ''}</legend>

      {#each allTranslations as langKey}
        <a
          class="lang-link"
          rel="alternate"
          onclick={() => (updateCurrentLang ? updateCurrentLang(langKey) : '')}
          href={pathForLang(langKey)}
          hreflang={langKey}
        >
          <div class="radio-wrapper">
            <input
              type="radio"
              name="language"
              id={langKey}
              value={langKey}
              checked={langKey === currentLang}
            />
            <label for={langKey}>{translateFunc ? translateFunc(langKey) : ''}</label>
          </div>
        </a>
      {/each}
    </fieldset>
  {/if}
</div>

<style>
  .section-wrapper {
    margin-bottom: 2rem;
    width: 100%;
    overflow-y: clip;
    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
  }

  h1 {
    margin-bottom: 0;
    margin-top: 1rem;
  }

  header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 2rem);
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: clip;

    width: 100%;
    min-height: 100%;

    text-align: center;
  }

  main.hero-margin {
    margin-top: calc(100vh - 1rem);
  }

  .floating-title {
    width: 100%;
    height: calc(100vh - 2rem);
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 2rem;
    padding-right: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /* mix-blend-mode: difference; */
    text-align: center;
  }

  .floating-title h1 {
    font-weight: bolder;
    font-size: 2.8rem;
    font-family: var(--landing-title-font-family, 'sans-serif');
    font-variant: var(--landing-title-font-variant, 'small-caps');
    color: var(--title-font-color);
    filter: var(--title-filter);
  }

  @media (max-width: 300px) {
    .floating-title h1 {
      font-size: 1.6rem;
    }
  }

  .ham-wrapper {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 3rem;
    height: 3rem;
    z-index: 999;
  }

  .fixed {
    position: fixed;
  }

  .nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    flex-grow: 3;
    background-color: var(--header-bg-color);
    padding-bottom: 1rem;
    padding-top: 0.5rem;
  }

  .nav :global(*) {
    background-color: var(--header-bg-color);
    color: var(--footer-font-color);
  }

  .page-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;

    background-color: var(--main-bg-color);
  }

  .disabled {
    filter: grayscale();
  }

  .hero-nav-wrapper {
    position: absolute;
    right: 0;
    left: 0;
    padding-top: 1rem;
    background-color: var(--header-bg-color);
    bottom: -3rem;
  }
</style>
