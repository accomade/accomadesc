<script lang="ts">
  import Photo from './Photo.svelte';
  import Section from './Section.svelte';
  import Hamburger from './Hamburger.svelte';
  import PageHeader from './PageHeader.svelte';
  import PageFooter from './PageFooter.svelte';
  import type { Page, Section as SectionI, I18nFacade } from './types.ts';

  let {
    hero,
    header,
    title,
    slug,
    content,
    nav,
    showFooter = true,
    fixedHamburger = true,
    translateFunc,
    formatMoneyFunc,
    formatDateFunc,
    formatFunc,
    supportedLangs,
    updateCurrentLang,
    currentLang,
    calendarTranslation,
  }: Page & I18nFacade = $props();

  let pageTitle = hero && hero.title ? hero.title : header ? header : null;

  let hamburgerOpen = $state(false);
</script>

<svelte:head>
  <title
    >{translateFunc && pageTitle
      ? translateFunc(pageTitle)
      : //TODO default to something here?
        ''}</title
  >
</svelte:head>

<div class="page-wrapper">
  {#if hero}
    <header class="hero-image">
      <Photo photoPath={hero.photoPath} alt="Hero Image" eager={true} />
    </header>

    <div class="floating-title">
      <h1>{translateFunc ? translateFunc(hero.title) : ''}</h1>
    </div>
  {:else}
    {#if title}
      <PageHeader {title} {slug} />
    {/if}
    {#if header}
      <h1>{@html translateFunc ? translateFunc(header) : ''}</h1>
    {/if}
  {/if}

  <main>
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
      <PageFooter {nav} {translateFunc} {currentLang} />
    </div>
  {/if}

  {#if nav}
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

    margin-top: calc(100vh - 1rem);
    text-align: center;
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
    filter: drop-shadow(0.2rem 0.3rem 0.2rem black);
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

  .page-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }
</style>
