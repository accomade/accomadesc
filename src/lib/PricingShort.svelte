<script lang="ts">
  import { DateTime } from 'luxon';
  import type { I18nFacade, PricingShortContent, PricingEntry } from '$lib/types.js';

  let {
    global,
    entries = [],
    ranges = [],
    staticRanges = [],
    showMaximum = true,
    showMinimum = true,
    formatMoneyFunc,
    translateFunc,
    formatFunc,
  }: PricingShortContent & I18nFacade = $props();

  $effect(() => {
    //unclear if this is even needed and working as expected
    if (!ranges && entries) ranges = entries;
  });

  let filteredEntries = $derived.by(() => {
    let now = DateTime.now();
    return entries.filter((e) => {
      if (!e.to) return true;
      const pTo = DateTime.fromISO(e.to);
      return pTo > now;
    });
  });

  let calculatedMinimum = $state(Number.MAX_SAFE_INTEGER);
  let calculatedMaximum = $state(0);

  const calcAverage = (entry: PricingEntry): number | undefined => {
    if (entry && entry.firstNightPrice && entry.perNightPrice && entry.minNumberOfNights) {
      const fnp = entry.firstNightPrice;
      const pnp = entry.perNightPrice;
      const oda = (entry.minNumberOfNights - 1) * pnp;
      const avg = (oda + fnp) / entry.minNumberOfNights;
      return Math.round(avg);
    } else if (entry && entry.firstNightPrice && entry.perNightPrice) {
      const avg = (entry.firstNightPrice + entry.perNightPrice) / 2;
      return Math.round(avg);
    } else if (entry && entry.perNightPrice) {
      return entry.perNightPrice;
    }
    return;
  };

  $effect(() => {
    [...filteredEntries, ...staticRanges].forEach((fe) => {
      let entry = fe.entry;
      let avg: number | undefined = calcAverage(entry);
      if (avg) {
        if (avg > calculatedMaximum) {
          calculatedMaximum = avg;
        }
        if (avg < calculatedMinimum) {
          calculatedMinimum = avg;
        }
      }
    });

    if (global) {
      let globalAvg = calcAverage(global);
      if (globalAvg) {
        if (globalAvg > calculatedMaximum) {
          calculatedMaximum = globalAvg;
        }
        if (globalAvg < calculatedMinimum) {
          calculatedMinimum = globalAvg;
        }
      }
    }
  });

  let formattedMax: string | undefined = $derived(
    formatMoneyFunc && formatMoneyFunc(calculatedMaximum),
  );
  let formattedMin: string | undefined = $derived(
    formatMoneyFunc && formatMoneyFunc(calculatedMinimum),
  );
</script>

<div class="pricing-short-wrapper">
  <h3>
    {translateFunc ? translateFunc('shortPriceLabel') : 'shortPriceLabel'}
    {#if showMinimum}<span
        >{formatFunc ? formatFunc('minimumPrice', { min: formattedMin }) : ''}</span
      >{/if}
    {#if showMaximum}<span
        >{formatFunc ? formatFunc('maximumPrice', { max: formattedMax }) : ''}</span
      >{/if}
  </h3>
</div>

<style>
  div.pricing-short-wrapper {
    color: var(--main-font-color);
    background-color: var(--main-bg-color);

    display: flex;
    flex-direction: column;
    align-items: center;

    * {
      color: var(--main-font-color);
      background-color: var(--main-bg-color);
    }
  }

  div.pricing-short-wrapper h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
