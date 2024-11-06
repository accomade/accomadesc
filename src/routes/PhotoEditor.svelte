<script lang="ts">
  import TextInput from '$lib/basic/TextInput.svelte';

  let {
    photos = [],
    photoPath = $bindable(),
    altText = $bindable(),
    attribution = $bindable(),
    link = $bindable(),
    external = $bindable(false),
    height = $bindable('5rem'),
    ratio = $bindable('1/1'),
    width = $bindable('5rem'),
    frame = $bindable(false),
    transition = $bindable('none'),
  }: {
    photos: string[];
    photoPath: string;
    altText: string;
    attribution?: string;
    link?: string;
    external?: boolean;
    height?: string;
    ratio?: string;
    width?: string;
    frame?: boolean;
    transition?: string;
  } = $props();
</script>

<div class="component-control">
  <div class="input-wrapper">
    <label>
      Photo
      <select bind:value={photoPath}>
        {#each photos as p, i}
          <option value={p}>{i}</option>
        {/each}
      </select>
    </label>
    <label>
      AltText
      <TextInput marginForMessage={false} type="text" bind:value={altText} />
    </label>
    <label>
      Attribution
      <TextInput marginForMessage={false} type="text" bind:value={attribution} />
    </label>
    <label>
      Link
      <TextInput marginForMessage={false} type="text" bind:value={link} />
    </label>
    <label>
      External
      <input type="checkbox" bind:checked={external} />
    </label>
    <label>
      Height
      <TextInput marginForMessage={false} type="text" bind:value={height} />
    </label>
    <label>
      Width
      <TextInput marginForMessage={false} type="text" bind:value={width} />
    </label>
    <label>
      Ratio (format: W/H)
      <TextInput marginForMessage={false} type="text" bind:value={ratio} />
    </label>
    <label>
      Frame
      <input type="checkbox" bind:checked={frame} />
    </label>
    <label>
      Transition
      <select bind:value={transition}>
        <option value="none">none</option>
        <option value="zoom">zoom</option>
        <option value="fade">fade</option>
      </select>
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
    gap: 0.2rem;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  label {
    justify-content: space-between;
    display: flex;
  }
</style>
