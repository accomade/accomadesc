<script lang="ts">
  import Text from './Text.svelte';
  import Photo from './Photo.svelte';
  import PhotoGallery from './PhotoGallery.svelte';
  import Calendar from './Calendar.svelte';
  import CalendarAvailable from './CalendarAvailable.svelte';
  import Pricing from './Pricing.svelte';
  import PricingShort from './PricingShort.svelte';
  import AmenitiesCore from './AmenitiesCore.svelte';
  import Weather from './Weather.svelte';
  import LeafletMap from './LeafletMap.svelte';
  import AccoCard from './AccoCard.svelte';
  import AccoDescription from './AccoDescription.svelte';

  import {
    type Section as SectionI,
    type I18nFacade,
    isAmenitiesCore,
    isLeafletMap,
    isPhoto,
    isGallery,
    isText,
    isWeather,
    isCalendar,
    isCalendarAvailable,
    isPricing,
    isPricingShort,
    isAccoDescription,
    isAccoCard,
  } from './types.js';

  let {
    header = undefined,
    columnCount = 2,
    padding = $bindable('10vw'),
    blocks = [],
    translateFunc,
    formatMoneyFunc,
    formatDateFunc,
    formatFunc,
    currentLang,
    calendarTranslation,
  }: SectionI & I18nFacade = $props();

  let translatedHeader = $derived(header && translateFunc ? translateFunc(header) : '');

  let gridTemplateColumns = $state(`repeat(${columnCount}, 1fr)`);

  let clientWidth = $state(Number.MAX_SAFE_INTEGER);
  $effect(() => {
    if (clientWidth < 500) {
      gridTemplateColumns = '1fr';
      padding = '0';
    } else if (clientWidth < 800 && clientWidth >= 500 && !!columnCount && columnCount > 2) {
      gridTemplateColumns = '1fr 1fr';
    } else {
      if (!!columnCount && columnCount > 1) {
        gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
      }
    }
  });
</script>

<svelte:window bind:innerWidth={clientWidth} />

<section style="padding-left: {padding}; padding-right: {padding};">
  {#if header}
    <h2>{translatedHeader}</h2>
  {/if}
  <div class="content" style="grid-template-columns: {gridTemplateColumns}">
    {#each blocks as block}
      <div class="block-container">
        {#if isAccoCard(block)}
          <AccoCard {...block.content} {translateFunc} {formatFunc} />
        {:else if isAccoDescription(block)}
          <AccoDescription {...block.content} {translateFunc} />
        {:else if isAmenitiesCore(block)}
          <AmenitiesCore {...block.content} {formatFunc} />
        {:else if isCalendar(block)}
          <Calendar {...block.content} {translateFunc} {calendarTranslation} />
        {:else if isCalendarAvailable(block)}
          <CalendarAvailable {...block.content} {formatFunc} {translateFunc} />
        {:else if isLeafletMap(block)}
          <LeafletMap {...block.content} />
        {:else if isPhoto(block)}
          <Photo {...block.content} {translateFunc} />
        {:else if isGallery(block)}
          <PhotoGallery {...block.content} {translateFunc} />
        {:else if isPricing(block)}
          <Pricing
            {...block.content}
            {translateFunc}
            {formatFunc}
            {formatMoneyFunc}
            {formatDateFunc}
            {currentLang}
          />
        {:else if isPricingShort(block)}
          <PricingShort {...block.content} {translateFunc} {formatFunc} />
        {:else if isText(block)}
          <Text {...block.content} {translateFunc} />
        {:else if isWeather(block)}
          <Weather {...block.content} {translateFunc} {currentLang} />
        {:else}
          <div>[UNEXPECTED VALUE]</div>
        {/if}
      </div>
    {/each}
  </div>
</section>

<style>
  .block-container {
    position: relative;
  }

  section {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .content {
    display: grid;
    width: 100%;
    gap: 1rem;
    grid-auto-flow: dense;
  }

  h2 {
    padding-left: 0.5rem;
    font-weight: bolder;
    font-size: 2.2rem;
    font-variant: small-caps;
    margin-bottom: 0.8rem;
  }
</style>
