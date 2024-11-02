<script lang="ts">
  let {
    address = $bindable(),
    lat = $bindable(),
    long = $bindable(),
    zoom = $bindable(),
  }: {
    address: string;
    lat: number;
    long: number;
    zoom: number;
  } = $props();
</script>

<div class="component-control">
  <div class="input-wrapper">
    <label>
      Address
      <input type="string" bind:value={address} />
    </label>
    <label>
      Latitude
      <input type="number" bind:value={lat} />
    </label>
    <label>
      Longitude
      <input type="number" bind:value={long} />
    </label>
    <label>
      Zoom
      <input type="number" bind:value={zoom} />
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
