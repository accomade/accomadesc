<script lang="ts">
  import { page } from '$app/state';
  import { fade } from 'svelte/transition';
  import type { Nav, I18nFacade } from './types.js';
  import NavItem from './NavItem.svelte';

  let currentPath = $derived($page.url.pathname);
  let {
    nav,
    close,
    translateFunc,
    currentLang,
    supportedLangs,
  }: {
    nav: Nav;
    close: () => void;
  } & I18nFacade = $props();

  let allTranslations = $state(supportedLangs);

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
</script>

<button class="not-nav" onclick={close} aria-label="close" transition:fade|global></button>

<nav class="main-nav open" transition:fade|global>
  <ul>
    {#each nav.main as n}
      <li>
        <NavItem {n} {supportedLangs} {currentLang} {translateFunc} onclick={close} />
      </li>
    {/each}

    {#if allTranslations && allTranslations.length > 1}
      <li>
        <fieldset>
          <legend>{translateFunc ? translateFunc('lang') : ''}</legend>

          {#each allTranslations as langKey}
            <a class="lang-link" rel="alternate" href={pathForLang(langKey)} hreflang={langKey}>
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
      </li>
    {/if}
  </ul>
</nav>

<style>
  .lang-link {
    color: var(--nav-font-color);
  }

  fieldset {
    padding-left: 1rem;
  }

  nav {
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
  }

  .not-nav {
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

  .radio-wrapper {
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
    padding-left: 3rem;
    margin: 0;
  }
</style>
