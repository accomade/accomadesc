<script lang="ts">
  import {
    type TextContent,
    type I18nFacade,
    DEFAULT_TEXT_FONT_SIZE,
    DEFAULT_HEADERS_FONT_SIZE,
    DEFAULT_EXT_HEADERS_1_FONT_SIZE,
    DEFAULT_EXT_HEADERS_2_FONT_SIZE,
    DEFAULT_EXT_HEADERS_3_FONT_SIZE,
    DEFAULT_EXT_HEADERS_4_FONT_SIZE,
  } from '$lib/types.js';

  let {
    ref,
    minHeight = '100%',
    textFontSize = DEFAULT_TEXT_FONT_SIZE,
    headerFontSize = DEFAULT_HEADERS_FONT_SIZE,
    extendedHeaders = false,
    extendedHeaders1Size = DEFAULT_EXT_HEADERS_1_FONT_SIZE,
    extendedHeaders2Size = DEFAULT_EXT_HEADERS_2_FONT_SIZE,
    extendedHeaders3Size = DEFAULT_EXT_HEADERS_3_FONT_SIZE,
    extendedHeaders4Size = DEFAULT_EXT_HEADERS_4_FONT_SIZE,
    translateFunc,
  }: TextContent & I18nFacade = $props();

  let translated = $derived(translateFunc ? translateFunc(ref) : '');
</script>

<div class="container">
  <div
    style="
        min-height: {minHeight};
        --font-size-text: {textFontSize};
        --font-size-header: {headerFontSize};
        --font-size-header-1: {extendedHeaders1Size};
        --font-size-header-2: {extendedHeaders2Size};
        --font-size-header-3: {extendedHeaders3Size};
        --font-size-header-4: {extendedHeaders4Size};
        "
    class="content"
    id="content"
    class:extended={extendedHeaders}
  >
    {@html translated}
  </div>
</div>

<style>
  .container {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: var(--main-bg-color);

    .content {
      width: 100%;
      height: 100%;

      text-align: left;
      margin-left: 0.2rem;
      margin-right: 0.2rem;

      :global(*) {
        color: var(--main-font-color);
        font-size: var(--font-size-text);
      }
      :global(h3) {
        font-size: var(--font-size-header);
        text-align: left;
      }
    }
    .extended {
      :global(h1) {
        font-size: var(--font-size-header-1);
        text-align: left;
      }
      :global(h2) {
        font-size: var(--font-size-header-2);
        text-align: left;
      }
      :global(h3) {
        font-size: var(--font-size-header-3);
        text-align: left;
      }
      :global(h4) {
        font-size: var(--font-size-header-4);
        text-align: left;
      }
    }
  }
</style>
