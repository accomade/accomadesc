<script lang="ts">
  import Icon from '$lib/basic/Icon.svelte';
  import type { AmenitiesCoreContent, I18nFacade } from '$lib/types.js';

  let {
    peopleMin,
    peopleMax,
    size,
    bedRooms,
    bathRooms,
    pets,
    showPets,
    wifi,
    showWifi,
    smoking,
    showSmoking,
    ac,
    showAc,
    tv,
    showTv,
    parking,
    showParking,
    formatFunc,
  }: AmenitiesCoreContent & I18nFacade = $props();

  let formattedSize: string = $derived(formatFunc ? formatFunc('size', { size: size }) : `${size}`);
</script>

<div class="amenities-wrapper">
  <div class="element-wrapper">
    <Icon iconName="area" width="2rem" height="2rem" />
    <div>
      {@html formattedSize}
    </div>
  </div>
  <div class="element-wrapper">
    <Icon iconName="people" width="2rem" height="2rem" />
    <div>
      {peopleMin}-{peopleMax}
    </div>
  </div>
  <div class="element-wrapper">
    <Icon iconName="bedroom" width="2rem" height="2rem" />
    <div>
      {bedRooms}
    </div>
  </div>
  <div class="element-wrapper">
    <Icon iconName="bathroom" width="2rem" height="2rem" />
    <div>
      {bathRooms}
    </div>
  </div>
  {#if showPets}
    <div class="bool-element-wrapper">
      {#if !pets}
        <div class="main-icon-container">
          <Icon iconName="pets" width="1.6rem" height="1.6rem" />
        </div>
        <div class="not-icon-container">
          <Icon iconName="not" width="2.2rem" height="2.2rem" color="var(--icon-not-color, red)" />
        </div>
      {:else}
        <div class="main-icon-container">
          <Icon iconName="pets" width="2rem" height="2rem" />
        </div>
      {/if}
    </div>
  {/if}
  {#if showWifi}
    <div class="bool-element-wrapper">
      {#if !wifi}
        <div class="main-icon-container">
          <Icon iconName="wifi" width="1.6rem" height="1.6rem" />
        </div>
        <div class="not-icon-container">
          <Icon iconName="not" width="2.2rem" height="2.2rem" color="var(--icon-not-color, red)" />
        </div>
      {:else}
        <Icon iconName="wifi" width="2rem" height="2rem" />
      {/if}
    </div>
  {/if}
  {#if showSmoking}
    <div class="bool-element-wrapper">
      {#if !smoking}
        <div class="main-icon-container">
          <Icon iconName="smoking" width="1.6rem" height="1.6rem" />
        </div>
        <div class="not-icon-container">
          <Icon iconName="not" width="2.2rem" height="2.2rem" color="var(--icon-not-color, red)" />
        </div>
      {:else}
        <Icon iconName="smoking" width="2rem" height="2rem" />
      {/if}
    </div>
  {/if}
  {#if showAc}
    <div class="bool-element-wrapper">
      {#if !ac}
        <div class="main-icon-container">
          <Icon iconName="ac" width="1.6rem" height="1.6rem" />
        </div>
        <div class="not-icon-container">
          <Icon iconName="not" width="2.2rem" height="2.2rem" color="var(--icon-not-color, red)" />
        </div>
      {:else}
        <Icon iconName="ac" width="2rem" height="2rem" />
      {/if}
    </div>
  {/if}
  {#if showTv}
    <div class="bool-element-wrapper">
      {#if !tv}
        <div class="main-icon-container">
          <Icon iconName="tv" width="1.6rem" height="1.6rem" />
        </div>
        <div class="not-icon-container">
          <Icon iconName="not" width="2.2rem" height="2.2rem" color="var(--icon-not-color, red)" />
        </div>
      {:else}
        <Icon iconName="tv" width="2rem" height="2rem" />
      {/if}
    </div>
  {/if}
  {#if showParking}
    <div class="bool-element-wrapper">
      {#if !parking}
        <div class="main-icon-container">
          <Icon iconName="parking" width="1.6rem" height="1.6rem" />
        </div>
        <div class="not-icon-container">
          <Icon iconName="not" width="2.2rem" height="2.2rem" color="var(--icon-not-color, red)" />
        </div>
      {:else}
        <Icon iconName="parking" width="2rem" height="2rem" />
      {/if}
    </div>
  {/if}
</div>

<style>
  div.amenities-wrapper {
    background-color: var(--main-bg-color);
    color: var(--main-font-color);

    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: baseline;
    justify-content: center;

    :global(*) {
      color: var(--main-font-color);
    }
  }

  div.element-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div.bool-element-wrapper {
    position: relative;
    width: 2.2rem;
    height: 2.2rem;
  }

  div.main-icon-container {
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
  }

  div.not-icon-container {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
