<script lang="ts">
  import type { Nav, I18nFacade } from '$lib/types.js';
  import { blur } from 'svelte/transition';

  import MainNav from '$lib/MainNav.svelte';
  import Icon from '$lib/basic/Icon.svelte';

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
    <Icon
      iconName="x"
      color="var(--nav-font-color)"
      filter="drop-shadow(0.2rem 0.2rem 0.2rem black)"
    />
  {:else}
    <Icon iconName="hamburger" color="var(--hamburger-color)" filter="var(--hamburger-filter)" />
  {/if}
</button>

<style>
  button {
    background-color: var(--hamburger-bg-color);
    padding: 0.5rem;
    border: 0;
    border-radius: 0.2rem;
    width: 4rem;
    height: 4rem;
    z-index: 999;
    position: relative;
  }
</style>
