<script lang="ts">
  import { page } from '$app/state';
  import { fade } from 'svelte/transition';
  import type { Nav, I18nFacade } from '$lib/types.js';
  import NavItem from '$lib/NavItem.svelte';
  import { getContext } from 'svelte';
  import { GLOBAL_STATE, GlobalState } from './state.svelte';

  let currentPath = $derived(page.url.pathname);
  let {
    nav,
    close,
    translateFunc,
    updateCurrentLang,
    currentLang,
    supportedLangs,
  }: {
    nav: Nav;
    close: () => void;
  } & I18nFacade = $props();

  const pathForLang = (lang: string) => {
    const pathElements = currentPath.split('/');
    //initial slash results in empty string real first element
    if (pathElements.length == 1) return `/${lang}`;

    const firstElement = pathElements[1];
    if (supportedLangs?.includes(firstElement)) {
      return ['', lang, ...pathElements.slice(2)].join('/');
    } else {
      return ['', lang, ...pathElements.slice(1)].join('/');
    }
  };

  const gs: GlobalState = getContext(GLOBAL_STATE);
</script>

<button class="not-nav" onclick={close} aria-label="close" transition:fade|global></button>

<nav class="main-nav open" transition:fade|global>
  <ul>
    {#each nav.main as n}
      <li>
        <NavItem {n} {supportedLangs} {currentLang} {translateFunc} onclick={close} />
      </li>
    {/each}
  </ul>
  {#if supportedLangs && supportedLangs.length > 1}
    <fieldset>
      <legend>{translateFunc ? translateFunc('lang') : ''}</legend>

      {#each supportedLangs as langKey}
        <a
          data-sveltekit-keepfocus
          data-sveltekit-noscroll
          class={{ 'lang-link': true, disabled: gs.disableLinks }}
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
</nav>

<style>
  fieldset {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: 1rem;
  }

  nav.main-nav {
    z-index: 998;
    position: fixed;
    padding-right: 1rem;
    top: 0;
    right: 0;
    padding-top: 3rem;
    background-color: var(--nav-bg-color);
    color: var(--nav-font-color);
    height: 100vh;
    font-family: var(--nav-font-family);
    font-variant: var(--nav-font-variant);
    font-size: 1.6rem;
    font-weight: bold;

    overflow-y: auto;
    overflow-x: hidden;

    * {
      color: var(--nav-font-color);
    }
  }

  button.not-nav {
    border: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    overflow-y: hidden;
    overflow-x: hidden;
  }

  li {
    list-style: none;
    margin-bottom: 1rem;
  }

  div.radio-wrapper {
    font-family: var(--nav-font-family);
    font-variant: var(--nav-font-variant);
    font-size: 1.6rem;
    font-weight: bold;
    line-height: 1.1;
    display: grid;
    grid-template-columns: 1em auto;
    gap: 0.5em;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 2.5rem;
    margin: 0;
  }

  .disabled {
    pointer-events: none;
  }
</style>
