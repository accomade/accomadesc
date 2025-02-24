<script lang="ts">
  import Text from '$lib/Text.svelte';
  import Photo from '$lib/Photo.svelte';
  import PhotoGallery from '$lib/PhotoGallery.svelte';
  import Calendar from '$lib/Calendar.svelte';
  import CalendarAvailable from '$lib/CalendarAvailable.svelte';
  import Pricing from '$lib/Pricing.svelte';
  import PricingShort from '$lib/PricingShort.svelte';
  import AmenitiesCore from '$lib/AmenitiesCore.svelte';
  import Weather from '$lib/Weather.svelte';
  import LeafletMap from '$lib/LeafletMap.svelte';
  import AccoCard from '$lib/AccoCard.svelte';
  import AccoDescription from '$lib/AccoDescription.svelte';
  import ContactForm from '$lib/ContactForm.svelte';
  import BookingRequest from '$lib/BookingRequest.svelte';
  import CalendarRows from '$lib/CalendarRows.svelte';
  import CalendarGrid from '$lib/CalendarGrid.svelte';

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
    isContactForm,
    isCalendarGrid,
    isCalendarRows,
    isBookingRequest,
  } from '$lib/types.js';

  let {
    header = undefined,
    columnCount = 2,
    padding = $bindable('10vw'),
    maxWidth,
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

  let originalPadding = $state(padding);

  let clientWidth = $state(Number.MAX_SAFE_INTEGER);
  $effect(() => {
    if (clientWidth < 500) {
      gridTemplateColumns = '1fr';
      padding = '0';
    } else if (clientWidth < 800 && clientWidth >= 500 && !!columnCount && columnCount > 2) {
      gridTemplateColumns = '1fr 1fr';
      padding = originalPadding;
    } else {
      if (!!columnCount && columnCount > 1) {
        gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
      }
      padding = originalPadding;
    }
  });

  let widthStyle = $derived(
    maxWidth ? `max-width: ${maxWidth};` : `padding-left: ${padding}; padding-right: ${padding};`,
  );
</script>

<svelte:window bind:innerWidth={clientWidth} />

<section style={widthStyle}>
  {#if header}
    <h2>{translatedHeader}</h2>
  {/if}
  <div class="content" style="grid-template-columns: {gridTemplateColumns}">
    {#each blocks as block}
      <div class="block-container">
        {#if isAccoCard(block)}
          <AccoCard
            {...block.content}
            {translateFunc}
            {formatFunc}
            {formatDateFunc}
            {formatMoneyFunc}
          />
        {:else if isAccoDescription(block)}
          <AccoDescription {...block.content} {translateFunc} {formatDateFunc} {formatMoneyFunc} />
        {:else if isAmenitiesCore(block)}
          <AmenitiesCore {...block.content} {formatFunc} {formatDateFunc} {formatMoneyFunc} />
        {:else if isCalendar(block)}
          <Calendar
            {...block.content}
            {translateFunc}
            {calendarTranslation}
            {formatDateFunc}
            {formatMoneyFunc}
          />
        {:else if isCalendarAvailable(block)}
          <CalendarAvailable
            {...block.content}
            {formatFunc}
            {translateFunc}
            {formatDateFunc}
            {formatMoneyFunc}
          />
        {:else if isLeafletMap(block)}
          <LeafletMap {...block.content} />
        {:else if isPhoto(block)}
          <Photo {...block.content} {translateFunc} {formatDateFunc} {formatMoneyFunc} />
        {:else if isGallery(block)}
          <PhotoGallery {...block.content} {translateFunc} {formatDateFunc} {formatMoneyFunc} />
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
          <PricingShort
            {...block.content}
            {translateFunc}
            {formatFunc}
            {formatDateFunc}
            {formatMoneyFunc}
          />
        {:else if isText(block)}
          <Text {...block.content} {translateFunc} {formatDateFunc} {formatMoneyFunc} />
        {:else if isWeather(block)}
          <Weather
            {...block.content}
            {translateFunc}
            {currentLang}
            {formatDateFunc}
            {formatMoneyFunc}
          />
        {:else if isBookingRequest(block)}
          <BookingRequest {...block.content} {translateFunc} {formatDateFunc} {formatMoneyFunc} />
        {:else if isCalendarRows(block)}
          <CalendarRows {...block.content} {translateFunc} {formatDateFunc} {formatMoneyFunc} />
        {:else if isCalendarGrid(block)}
          <CalendarGrid {...block.content} {translateFunc} {formatDateFunc} {formatMoneyFunc} />
        {:else if isContactForm(block)}
          <ContactForm {...block.content} {translateFunc} {formatDateFunc} {formatMoneyFunc} />
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
