<script lang="ts">
  import AmenitiesCore from '$lib/AmenitiesCore.svelte';
  import CalendarAvailable from '$lib/CalendarAvailable.svelte';
  import Photo from '$lib/Photo.svelte';
  import PricingShort from '$lib/PricingShort.svelte';
  import { type AccoCardContent, type I18nFacade } from './types.js';

  let {
    displayName,
    coverPhoto,
    slug,
    pricing,
    avail,
    amenities,
    translateFunc,
    formatFunc,
    formatMoneyFunc,
    formatDateFunc,
  }: AccoCardContent & I18nFacade = $props();

  let translatedSlug = $derived(translateFunc && slug ? translateFunc(slug) : '');
</script>

<div class="accocard-wrapper">
  <div class="title-with-slug">
    <h2>{displayName}</h2>
    {#if slug}
      <div class="slug">{@html translatedSlug}</div>
    {/if}
  </div>
  {#if coverPhoto}
    <div class="photo">
      <Photo {...coverPhoto} {translateFunc} />
    </div>
  {/if}
  {#if amenities}
    <div class="amenities-container">
      <AmenitiesCore {...amenities.content} {formatFunc} {formatMoneyFunc} {formatDateFunc} />
    </div>
  {/if}
  {#if pricing}
    <div class="pricing-container">
      <PricingShort
        {...pricing.content}
        {translateFunc}
        {formatFunc}
        {formatMoneyFunc}
        {formatDateFunc}
      />
    </div>
  {/if}
  {#if avail}
    <div class="calendar-container">
      <CalendarAvailable
        {...avail.content}
        {translateFunc}
        {formatFunc}
        {formatMoneyFunc}
        {formatDateFunc}
      />
    </div>
  {/if}
</div>

<style>
  div.title-with-slug {
    grid-area: first-row-line / middle-line / second-row-line / end-line;
  }

  div.photo {
    grid-area: first-row-line / start-line / fifth-row-line / middle-line;
    position: relative;
  }

  div.amenities-container {
    grid-area: second-row-line / middle-line / third-row-line / end-line;
    position: relative;
  }

  div.pricing-container {
    grid-area: third-row-line / middle-line / fourth-row-line / end-line;
    position: relative;
  }

  div.calendar-container {
    grid-area: fourth-row-line / middle-line / fifth-row-line / end-line;
    position: relative;
  }

  div.accocard-wrapper {
    width: calc(100% - 8rem);
    position: relative;
    display: grid;
    grid-template-columns: [start-line] 1fr [middle-line] 1fr [end-line];
    grid-template-rows: [first-row-line] auto [second-row-line] auto [third-row-line] auto [fourth-row-line] auto [fifth-row-line];

    gap: 1rem;
    padding: 2rem;
    margin: 2rem;
    border-radius: 2rem;
    box-shadow: var(--acco-card-shadow);

    background-color: var(--acco-card-bg-color);
    color: var(--acco-card-font-color);

    * {
      --main-font-color: var(--acco-card-font-color);
      --main-bg-color: var(--acco-card-bg-color);
      background-color: var(--acco-card-bg-color);
      color: var(--acco-card-font-color);
    }
  }

  div.accocard-wrapper h2 {
    margin-top: 0;
    margin-bottom: 0;
    text-align: right;
  }

  div.slug {
    text-align: right;
    margin-bottom: 1rem;
  }

  @media (max-width: 999px) {
    div.accocard-wrapper {
      grid-template-rows: [first-row-line] auto [second-row-line] auto [third-row-line] auto [fourth-row-line];
    }

    div.title-with-slug {
      grid-area: first-row-line / middle-line / second-row-line / end-line;
    }

    div.photo {
      grid-area: first-row-line / start-line / third-row-line / middle-line;
    }

    div.amenities-container {
      grid-area: second-row-line / middle-line / third-row-line / end-line;
    }

    div.pricing-container {
      grid-area: third-row-line / start-line / fourth-row-line / middle-line;
    }

    div.calendar-container {
      grid-area: third-row-line / middle-line / fourth-row-line / end-line;
    }
  }

  @media (max-width: 750px) {
    div.accocard-wrapper {
      grid-template-rows: repeat(auto);
      grid-template-columns: 1fr;
    }

    div.title-with-slug {
      grid-row: auto;
      grid-column: 1;
    }

    div.photo {
      grid-row: auto;
      grid-column: 1;
    }

    div.amenities-container {
      grid-row: auto;
      grid-column: 1;
    }

    div.pricing-container {
      grid-row: auto;
      grid-column: 1;
    }

    div.calendar-container {
      grid-row: auto;
      grid-column: 1;
    }

    div.accocard-wrapper h2 {
      text-align: center;
    }

    div.slug {
      text-align: center;
    }
  }

  @media (max-width: 750px) {
    div.accocard-wrapper {
      width: calc(100% - 2rem);

      gap: 0.5rem;
      padding: 0.5rem;
      margin: 0.5rem;

      border-radius: 0.5rem;
    }
  }
</style>
