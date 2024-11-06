<script lang="ts">
  import TextInput from '$lib/basic/TextInput.svelte';

  let {
    peopleMin = $bindable(),
    peopleMax = $bindable(),
    size = $bindable(),
    bedRooms = $bindable(),
    bathRooms = $bindable(),
    pets = $bindable(),
    showPets = $bindable(),
    wifi = $bindable(),
    showWifi = $bindable(),
    smoking = $bindable(),
    showSmoking = $bindable(),
    ac = $bindable(),
    showAc = $bindable(),
    tv = $bindable(),
    showTv = $bindable(),
    parking = $bindable(),
    showParking = $bindable(),
  }: {
    peopleMin: number;
    peopleMax: number;
    size: number;
    bedRooms: number;
    bathRooms: number;
    pets: boolean;
    showPets?: boolean;
    wifi: boolean;
    showWifi?: boolean;
    smoking: boolean;
    showSmoking?: boolean;
    ac: boolean;
    showAc?: boolean;
    tv: boolean;
    showTv?: boolean;
    parking: boolean;
    showParking?: boolean;
  } = $props();
</script>

<div class="component-control">
  <div class="input-wrapper">
    <label>
      PeopleMin
      <TextInput marginForMessage={false} type="number" bind:value={peopleMin} />
    </label>
    <label>
      PeopleMax
      <TextInput marginForMessage={false} type="number" bind:value={peopleMax} />
    </label>
    <label>
      PeopleMin
      <TextInput marginForMessage={false} type="number" bind:value={peopleMin} />
    </label>
    <label>
      Size
      <TextInput marginForMessage={false} type="number" bind:value={size} />
    </label>
    <label>
      BedRooms
      <TextInput marginForMessage={false} type="number" bind:value={bedRooms} />
    </label>
    <label>
      BathRooms
      <TextInput marginForMessage={false} type="number" bind:value={bathRooms} />
    </label>
    <label>
      Pets
      <input type="checkbox" bind:checked={pets} />
    </label>
    <label>
      ShowPets
      <input type="checkbox" bind:checked={showPets} />
    </label>
    <label>
      Wifi
      <input type="checkbox" bind:checked={wifi} />
    </label>
    <label>
      ShowWifi
      <input type="checkbox" bind:checked={showWifi} />
    </label>
    <label>
      Smoking
      <input type="checkbox" bind:checked={smoking} />
    </label>
    <label>
      ShowSmoking
      <input type="checkbox" bind:checked={showSmoking} />
    </label>
    <label>
      AC
      <input type="checkbox" bind:checked={ac} />
    </label>
    <label>
      ShowAc
      <input type="checkbox" bind:checked={showAc} />
    </label>
    <label>
      TV
      <input type="checkbox" bind:checked={tv} />
    </label>
    <label>
      ShowTV
      <input type="checkbox" bind:checked={showTv} />
    </label>
    <label>
      Parking
      <input type="checkbox" bind:checked={parking} />
    </label>
    <label>
      ShowParking
      <input type="checkbox" bind:checked={showParking} />
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
