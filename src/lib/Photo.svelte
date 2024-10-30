<script lang="ts">
  import LinkSvg from '$lib/svg/LinkSVG.svelte';
  import ExtLinkSvg from '$lib/svg/ExtLinkSVG.svelte';
  import { TwicImg } from '@twicpics/components/svelte5';
  import type { Photo } from './types/blocks.ts';

  let props: Photo = $props();

  export const className: string = 'photo-container-sizing';

  let photoHeight = $state(0);
</script>

{#snippet twic()}
  <TwicImg
    class={className}
    src={props.content.photoPath}
    alt={props.content.altTranslation}
    ratio={props.content.ratio}
    mode="cover"
    eager="false"
    transition="fade"
  />
{/snippet}

{#if props.content.link}
  {#if props.content.external}
    <a
      bind:clientHeight={photoHeight}
      style="width: {props.content.width}; height: {props.content.height};"
      href={props.content.link}
      target="_blank"
      rel="noreferrer noopener"
    >
      <div class="no-frame">
        {@render twic()}
      </div>

      {#if props.content.attribution}
        <div style="height:calc({photoHeight}px - 0.5rem);" class="attribution-container">
          <div class="attribution-wrapper">
            {@html props.content.attribution}
          </div>
        </div>
      {/if}
      <div class="link-icon-wrapper"><ExtLinkSvg size="1.8rem" /></div>
    </a>
  {:else}
    <a
      bind:clientHeight={photoHeight}
      style="width: {props.content.width}; height: {props.content.height};"
      href={props.content.link}
    >
      <div class="no-frame">
        {@render twic()}
      </div>

      {#if props.content.attribution}
        <div style="height:calc({photoHeight}px - 0.5rem);" class="attribution-container">
          <div class="attribution-wrapper">
            {@html props.content.attribution}
          </div>
        </div>
      {/if}
      <div class="link-icon-wrapper"><LinkSvg size="1.4rem" /></div>
    </a>
  {/if}
{:else}
  <div
    bind:clientHeight={photoHeight}
    style="width: {props.content.width}; height: {props.content.height};"
  >
    <div class="no-frame">
      {@render twic()}
    </div>
    {#if props.content.attribution}
      <div style="height:{photoHeight};" class="attribution-container">
        <div class="attribution-wrapper">
          {@html props.content.attribution}
        </div>
      </div>
    {/if}
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

  .link-icon-wrapper {
    position: absolute;
    top: -0.4rem;
    right: -0.4rem;
    background-color: var(--picture-link-bg-color);
    padding: 0.4rem;
    border-radius: 1rem;
  }

  .attribution-wrapper {
    color: var(--main-font-color);
    background-color: rgba(225, 225, 225, 0.6);
    font-size: 0.7rem;
    font-weight: bolder;
    padding: 0.2rem 0.7rem 0.1rem 0.7rem;
    margin-right: 0.2rem;
    border-radius: 1rem;
  }

  .attribution-container {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    position: absolute;
    padding-bottom: 0.2rem;
    top: 0;
    left: 0;
    width: 100%;
  }

  .no-frame {
    width: 100%;
    height: 100%;
  }
</style>
