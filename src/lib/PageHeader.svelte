<script lang="ts">
  import type { I18nFacade } from '$lib/types.js';

  let {
    logoLink,
    title,
    slug,
    translateFunc,
  }: {
    title: string;
    slug?: string;
    logoLink?: string;
  } & I18nFacade = $props();
</script>

<header>
  <object title="logo" class="logo" data={logoLink}></object>
  <div class="text-wrapper">
    <div class="header"><h1>{@html translateFunc ? translateFunc(title) : ''}</h1></div>
    {#if slug}
      <div class="slug">{@html translateFunc ? translateFunc(slug) : ''}</div>
    {/if}
  </div>
</header>

<style>
  header {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 0;
    width: 100%;
    background-color: var(--header-bg-color);
  }

  div.text-wrapper {
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 10rem;
    margin-right: 8rem;
  }

  div.slug {
    font-size: 1.6rem;
    font-family: var(--header-font-family, 'sans-serif');
    font-variant: var(--header-font-variant, 'small-caps');
    margin-bottom: 1rem;
    color: var(--header-font-color);
  }

  div.header h1 {
    margin-top: 0.6rem;
    margin-bottom: 0.3rem;
    font-family: var(--page-title-font-family, 'sans-serif');
    font-variant: var(--page-title-font-variant, 'small-caps');
    color: var(--header-font-color);
  }

  object.logo {
    position: absolute;
    left: 0;
    top: 0;

    margin-left: 0.6rem;
    margin-top: 0.6rem;
    width: 8.5rem;
  }

  @media (max-width: 550px) {
    div.text-wrapper {
      margin-left: 10rem;
      margin-right: 2rem;
    }
  }

  @media (max-width: 500px) {
    div.text-wrapper {
      min-height: 6rem;
      margin-left: 6rem;
    }

    div.slug {
      display: none;
    }
    object.logo {
      width: 4.5rem;
    }
    div.header h1 {
      font-size: 2.2rem;
    }
  }

  @media (max-width: 300px) {
    div.text-wrapper {
      min-height: 4rem;
      margin-left: 0.5rem;
      margin-right: 1rem;
    }

    object.logo {
      display: none;
    }
    div.header h1 {
      padding-left: 1rem;
    }
  }
</style>
