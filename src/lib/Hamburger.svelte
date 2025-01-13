<script lang="ts">
  import type { Nav, I18nFacade } from './types.js';
  import { blur } from 'svelte/transition';

  import MainNav from './MainNav.svelte';
  import HamburgerSVG from './svg/HamburgerSVG.svelte';
  import XSVG from './svg/XSVG.svelte';

  let {
    nav,
    translateFunc,
    currentLang,
    supportedLangs,
  }: {
    nav: Nav;
  } & I18nFacade = $props();

  let isMenuOpen = $state(false);
</script>

<button
  transition:blur
  onclick={() => (isMenuOpen = !isMenuOpen)}
  aria-pressed={isMenuOpen}
  aria-label="menu button"
  tabindex={isMenuOpen ? 0 : -1}
>
  {#if isMenuOpen}
    <XSVG />
  {:else}
    <HamburgerSVG />
  {/if}
</button>

{#if isMenuOpen}
  <MainNav
    {nav}
    {translateFunc}
    {currentLang}
    {supportedLangs}
    close={() => (isMenuOpen = false)}
  />
{/if}

<style>
  button {
    background-color: transparent;
    border: 0;
    width: 3rem;
    height: 3rem;
  }
</style>
