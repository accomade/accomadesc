<script lang="ts">
  import type { AccoDescription } from "./types/blocks.ts";
  let {
    id,
    content = {
    ref,
    translatedRef = ''
    minHeight = '100%',
    textFontSize = '1rem',
    headerFontSize = '1.5rem',
    }
  }: AccoDescription = $props();
</script>

<div class="container">
  <div
    style="
        min-height: {minHeight};
        --font-size-text-text-editor: {textFontSize};
        --font-size-header-text-editor: {headerFontSize};
        "
    class="content"
    id="content"
  >
    {@html dictEntry($currentLang, ref)}
  </div>
</div>

<style>
  .content {
    width: 100%;
    height: 100%;

    text-align: left;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }

  .content :global(*) {
    font-size: var(--font-size-text-text-editor);
  }

  .content :global(h3) {
    font-size: var(--font-size-header-text-editor);
    text-align: left;
  }

  .container {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>

