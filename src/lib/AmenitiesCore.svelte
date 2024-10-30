<script lang="ts">
  import NotSvg from './svg/NotSVG.svelte';

  import AcSvg from './svg/AcSVG.svelte';
  import AreaSvg from './svg/AreaSVG.svelte';
  import BathroomSvg from './svg/BathroomSVG.svelte';
  import BedroomSvg from './svg/BedroomSVG.svelte';
  import ParkingSvg from './svg/ParkingSVG.svelte';
  import PeopleSvg from './svg/PeopleSVG.svelte';
  import PetsSvg from './svg/PetsSVG.svelte';
  import SmokingSvg from './svg/SmokingSVG.svelte';
  import TvSvg from './svg/TvSVG.svelte';
  import WifiSvg from './svg/WifiSVG.svelte';
  import type { AmenitiesCore } from './types/blocks.ts';

  let theCore: AmenitiesCore = $props();
</script>

<div class="amneties-wrapper">
  {#if theCore}
    {@const content = theCore.content}
    <div class="element-wrapper">
      <AreaSvg size="2rem" />
      <div>
        {@html content.formattedSize}
      </div>
    </div>
    <div class="element-wrapper">
      <PeopleSvg size="2rem" />
      <div>
        {content.peopleMin}-{content.peopleMax}
      </div>
    </div>
    <div class="element-wrapper">
      <BedroomSvg size="2rem" />
      <div>
        {content.bedRooms}
      </div>
    </div>
    <div class="element-wrapper">
      <BathroomSvg size="2rem" />
      <div>
        {content.bathRooms}
      </div>
    </div>
    {#if content.showPets}
      <div class="bool-element-wrapper">
        {#if !content.pets}
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
    {#if content.showWifi}
      <div class="bool-element-wrapper">
        {#if !content.wifi}
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
    {#if content.showSmoking}
      <div class="bool-element-wrapper">
        {#if !content.smoking}
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
    {#if content.showAc}
      <div class="bool-element-wrapper">
        {#if !content.ac}
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
    {#if content.showTv}
      <div class="bool-element-wrapper">
        {#if !content.tv}
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
    {#if content.showParking}
      <div class="bool-element-wrapper">
        {#if !content.parking}
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
  {/if}
</div>

<style>
  .amneties-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: baseline;
    justify-content: center;
  }

  .element-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bool-element-wrapper {
    position: relative;
    width: 2.2rem;
    height: 2.2rem;
  }

  .main-icon-container {
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
  }

  .not-icon-container {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
