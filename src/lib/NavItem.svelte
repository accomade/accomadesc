<script lang="ts">
  import type { NavItem, I18nFacade } from '$lib/types.js';
  import ExtLinkSvg from '$lib/svg/ExtLinkSVG.svelte';

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
        <div class="link-icon-wrapper">
          <ExtLinkSvg size="1.6rem" />
        </div>
        <a href={n.path} target="_blank" rel="noreferrer noopener">
          {translateFunc ? translateFunc(n.key) : ''}
        </a>
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
  div.sub {
    font-size: 1.2rem;
    margin-left: 0.4rem;
  }

  a {
    text-decoration: underline;
    color: var(--nav-font-color);
  }

  span {
    color: var(--nav-font-color);
  }

  div.link-icon-wrapper {
    position: absolute;
    left: -1.8rem;
    top: 0rem;
  }
  div.sub div.link-icon-wrapper {
    left: -2.2rem;
  }

  div.ext-link-wrapper {
    display: flex;
    position: relative;
    width: 100%;
  }
</style>
