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
    updateCurrentLang,
    isMenuOpen = $bindable(false),
  }: {
    nav: Nav;
    isMenuOpen: boolean;
  } & I18nFacade = $props();
</script>

{#if isMenuOpen}
  <MainNav
    {nav}
    {translateFunc}
    {updateCurrentLang}
    {currentLang}
    {supportedLangs}
    close={() => (isMenuOpen = false)}
  />
{/if}

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

<style>
  button {
    background-color: transparent;
    border: 0;
    width: 3rem;
    height: 3rem;
    z-index: 999;
    position: relative;
  }
</style>
