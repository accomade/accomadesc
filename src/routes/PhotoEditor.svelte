<script lang="ts">
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
      <input type="string" bind:value={altText} />
    </label>
    <label>
      Attribution
      <input type="string" bind:value={attribution} />
    </label>
    <label>
      Link
      <input type="string" bind:value={link} />
    </label>
    <label>
      External
      <input type="checkbox" bind:checked={external} />
    </label>
    <label>
      Height
      <input type="text" bind:value={height} />
    </label>
    <label>
      Width
      <input type="text" bind:value={width} />
    </label>
    <label>
      Ratio (format: W/H)
      <input type="text" bind:value={ratio} />
    </label>
    <label>
      Frame
      <input type="checkbox" bind:checked={frame} />
    </label>
    <label>
      Transition
      <select bind:value={transition}>
        <option value="none">none</option>
        <option value="slide">slide</option>
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
