<script lang="ts">
  import NotSvg from '$lib/svg/NotSVG.svelte';

  import AcSvg from '$lib/svg/AcSVG.svelte';
  import AreaSvg from '$lib/svg/AreaSVG.svelte';
  import BathroomSvg from '$lib/svg/BathroomSVG.svelte';
  import BedroomSvg from '$lib/svg/BedroomSVG.svelte';
  import ParkingSvg from '$lib/svg/ParkingSVG.svelte';
  import PeopleSvg from '$lib/svg/PeopleSVG.svelte';
  import PetsSvg from '$lib/svg/PetsSVG.svelte';
  import SmokingSvg from '$lib/svg/SmokingSVG.svelte';
  import TvSvg from '$lib/svg/TvSVG.svelte';
  import WifiSvg from '$lib/svg/WifiSVG.svelte';
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
    <AreaSvg size="2rem" />
    <div>
      {@html formattedSize}
    </div>
  </div>
  <div class="element-wrapper">
    <PeopleSvg size="2rem" />
    <div>
      {peopleMin}-{peopleMax}
    </div>
  </div>
  <div class="element-wrapper">
    <BedroomSvg size="2rem" />
    <div>
      {bedRooms}
    </div>
  </div>
  <div class="element-wrapper">
    <BathroomSvg size="2rem" />
    <div>
      {bathRooms}
    </div>
  </div>
  {#if showPets}
    <div class="bool-element-wrapper">
      {#if !pets}
        <div class="main-icon-container">
          <PetsSvg size="1.6rem" />
        </div>
        <div class="not-icon-container">
          <NotSvg size="2.2rem" />
        </div>
      {:else}
        <div class="main-icon-container">
          <PetsSvg size="2rem" />
        </div>
      {/if}
    </div>
  {/if}
  {#if showWifi}
    <div class="bool-element-wrapper">
      {#if !wifi}
        <div class="main-icon-container">
          <WifiSvg size="1.6rem" />
        </div>
        <div class="not-icon-container">
          <NotSvg size="2.2rem" />
        </div>
      {:else}
        <WifiSvg size="2rem" />
      {/if}
    </div>
  {/if}
  {#if showSmoking}
    <div class="bool-element-wrapper">
      {#if !smoking}
        <div class="main-icon-container">
          <SmokingSvg size="1.6rem" />
        </div>
        <div class="not-icon-container">
          <NotSvg size="2.2rem" />
        </div>
      {:else}
        <SmokingSvg size="2rem" />
      {/if}
    </div>
  {/if}
  {#if showAc}
    <div class="bool-element-wrapper">
      {#if !ac}
        <div class="main-icon-container">
          <AcSvg size="1.6rem" />
        </div>
        <div class="not-icon-container">
          <NotSvg size="2.2rem" />
        </div>
      {:else}
        <AcSvg size="2rem" />
      {/if}
    </div>
  {/if}
  {#if showTv}
    <div class="bool-element-wrapper">
      {#if !tv}
        <div class="main-icon-container">
          <TvSvg size="1.6rem" />
        </div>
        <div class="not-icon-container">
          <NotSvg size="2.2rem" />
        </div>
      {:else}
        <TvSvg size="2rem" />
      {/if}
    </div>
  {/if}
  {#if showParking}
    <div class="bool-element-wrapper">
      {#if !parking}
        <div class="main-icon-container">
          <ParkingSvg size="1.6rem" />
        </div>
        <div class="not-icon-container">
          <NotSvg size="2.2rem" />
        </div>
      {:else}
        <ParkingSvg size="2rem" />
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
