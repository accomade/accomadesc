<script lang="ts">
  import type { NavItem, I18nFacade } from './types.js';
  import ExtLinkSvg from './svg/ExtLinkSVG.svelte';

  let {
    n,
    onclick,
    currentLang,
    translateFunc,
  }: {
    n: NavItem;
    onclick?: () => void;
  } & I18nFacade = $props();

  const path = $derived(`/${currentLang}${n.path}`);
</script>

<div class="wrapper" class:sub={n.sub}>
  {#if n.path}
    {#if n.external}
      <div class="ext-link-wrapper">
        <a href={n.path} target="_blank" rel="noreferrer noopener">
          {translateFunc ? translateFunc(n.key) : ''}
        </a>
        <div class="link-icon-wrapper">
          <ExtLinkSvg size="2rem" />
        </div>
      </div>
    {:else}
      <a href={path} {onclick}>
        {translateFunc ? translateFunc(n.key) : ''}
      </a>
    {/if}
  {:else}
    <span>{translateFunc ? translateFunc(n.key) : ''}</span>
  {/if}
</div>

<style>
  .sub {
    font-size: 1.2rem;
    padding-left: 0.4rem;
  }

  a {
    text-decoration: underline;
    color: var(--nav-font-color);
  }

  .ext-link-wrapper {
    position: relative;
  }

  .link-icon-wrapper {
    position: absolute;
    left: -2.5rem;
    top: 0;
  }
</style>
