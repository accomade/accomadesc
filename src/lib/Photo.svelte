<script lang="ts">
  import LinkSvg from '$lib/svg/LinkSVG.svelte';
  import ExtLinkSvg from '$lib/svg/ExtLinkSVG.svelte';
  import { TwicImg } from '@twicpics/components/svelte5';
  import type { PhotoContent, I18nFacade } from '$lib/types.js';

  let {
    alt,
    photoPath,
    eager = false,
    link = '',
    external = false,
    attribution = undefined,
    ratio = 'none',
    frame = false,
    transition = 'none',
    width = '100%',
    height = '100%',
    translateFunc,
  }: PhotoContent & I18nFacade = $props();

  const className: string = 'photo-container-sizing';

  let altTranslation = $derived(translateFunc ? translateFunc(alt) : '');
  let photoHeight = $state(0);
</script>

{#snippet twic()}
  <div class:no-frame={!frame} class:frame>
    <TwicImg
      class={className}
      src={photoPath}
      alt={altTranslation}
      mode="cover"
      {eager}
      {ratio}
      position="center"
      {transition}
    />
  </div>
  {#if attribution}
    <div style="height:calc({photoHeight}px - 0.5rem);" class="attribution-container">
      <div class="attribution-wrapper">
        {@html attribution}
      </div>
    </div>
  {/if}
{/snippet}

{#if link}
  {#if external}
    <a
      bind:clientHeight={photoHeight}
      style="width: {width}; height: {height};"
      href={link}
      target="_blank"
      rel="noreferrer noopener nofollow"
    >
      {@render twic()}
      <div class="link-icon-wrapper"><ExtLinkSvg size="1.8rem" /></div>
    </a>
  {:else}
    <a bind:clientHeight={photoHeight} style="width: {width}; height: {height};" href={link}>
      {@render twic()}
      <div class="link-icon-wrapper"><LinkSvg size="1.4rem" /></div>
    </a>
  {/if}
{:else}
  <div bind:clientHeight={photoHeight} style="width: {width}; height: {height};">
    {@render twic()}
  </div>
{/if}

<style>
  :global(.photo-container-sizing) {
    width: 100%;
    height: 100%;
  }

  a {
    display: block;
    position: relative;
  }

  div.link-icon-wrapper {
    position: absolute;
    top: -0.4rem;
    right: -0.4rem;
    background-color: var(--picture-link-bg-color);
    padding: 0.4rem;
    border-radius: 1rem;
  }

  div.attribution-wrapper {
    color: var(--attribution-font-color);
    background-color: var(--attribution-bg-color);
    font-size: 0.7rem;
    font-weight: bolder;
    padding: 0.2rem 0.7rem 0.1rem 0.7rem;
    margin-right: 0.2rem;
    border-radius: 1rem;
  }

  div.attribution-container {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    position: absolute;
    padding-bottom: 0.2rem;
    padding-right: 0.3rem;
    top: 0;
    left: 0;
    width: 100%;
  }

  div.no-frame {
    width: 100%;
    height: 100%;
  }

  div.frame {
    width: 100%;
    height: 100%;
    padding: 0.3rem;
    box-shadow: var(--picture-frame-shadow);
  }
</style>
