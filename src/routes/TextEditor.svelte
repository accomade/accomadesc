<script lang="ts">
  import TextInput from '$lib/basic/TextInput.svelte';

  let {
    text = $bindable(''),
    minHeight = $bindable('10rem'),
    textFontSize = $bindable('1rem'),
    headerFontSize = $bindable('1rem'),
  }: {
    text: string;
    minHeight?: string;
    textFontSize?: string;
    headerFontSize?: string;
  } = $props();
</script>

<div class="component-control">
  <div
    bind:textContent={text}
    style="height: 100%; padding: 1rem; width: 100%; border: 1px solid red; border-radius: 1rem;"
    contenteditable
  >
    {text}
  </div>
  <div class="input-wrapper">
    <label>
      Block Height
      <TextInput marginForMessage={false} type="text" bind:value={minHeight} />
    </label>
    <label>
      Text Fontsize
      <TextInput marginForMessage={false} type="text" bind:value={textFontSize} />
    </label>
    <label>
      H3 Fontsize
      <TextInput marginForMessage={false} type="text" bind:value={headerFontSize} />
    </label>
  </div>
</div>

<style>
  .component-control {
    display: flex;
    padding: 1rem;
    flex: 1;
    gap: 1rem;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
  }
</style>
