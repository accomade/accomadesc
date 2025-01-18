<script lang="ts">
  import { DateTime } from 'luxon';
  import { add, allocate, dinero, multiply, greaterThan, lessThan, type Dinero } from 'dinero.js';
  import { EUR } from '@dinero.js/currencies';
  import type { I18nFacade, PricingShortContent, PricingEntry } from '$lib/types.js';

  let {
    global = undefined,
    entries = [],
    ranges = [],
    staticRanges = [],
    showMaximum = true,
    showMinimum = true,
    translateFunc,
    formatFunc,
  }: PricingShortContent & I18nFacade = $props();

  if (!ranges && entries) ranges = entries;

  let filteredEntries = $derived.by(() => {
    let now = DateTime.now();
    return entries.filter((e) => {
      if (!e.to) return true;
      const pTo = DateTime.fromISO(e.to);
      return pTo > now;
    });
  });

  let calculatedMinium = $state(dinero({ amount: Number.MAX_SAFE_INTEGER, currency: EUR }));
  let calculatedMaximum = $state(dinero({ amount: 0, currency: EUR }));

  const calcAverage = (entry: PricingEntry): Dinero<number> | undefined => {
    let avg: Dinero<number> | undefined;
    if (entry && entry.firstNightPrice && entry.perNightPrice && entry.minNumberOfNights) {
      const fnp = dinero(entry.firstNightPrice);
      const pnp = dinero(entry.perNightPrice);

      [avg] = allocate(
        add(multiply(pnp, entry.minNumberOfNights - 1), fnp),
        new Array(entry.minNumberOfNights).fill(1),
      );
    } else if (entry && entry.firstNightPrice && entry.perNightPrice) {
      const fnp = dinero(entry.firstNightPrice);
      const pnp = dinero(entry.perNightPrice);

      [avg] = allocate(add(pnp, fnp), [1, 1]);
    } else if (entry && entry.perNightPrice) {
      avg = dinero(entry.perNightPrice);
    }
    return avg;
  };

  $effect(() => {
    [...filteredEntries, ...staticRanges].forEach((fe) => {
      let entry = fe.entry;
      let avg: Dinero<number> | undefined = calcAverage(entry);
      if (avg) {
        if (greaterThan(avg, calculatedMaximum)) {
          calculatedMaximum = avg;
        }
        if (lessThan(avg, calculatedMinium)) {
          calculatedMinium = avg;
        }
      }
    });

    if (global) {
      let globalAvg = calcAverage(global);
      if (globalAvg) {
        if (greaterThan(globalAvg, calculatedMaximum)) {
          calculatedMaximum = globalAvg;
        }
        if (lessThan(globalAvg, calculatedMinium)) {
          calculatedMinium = globalAvg;
        }
      }
    }
  });
</script>

<div class="pricing-short-wrapper">
  <h3>
    {translateFunc ? translateFunc('shortPriceLabel') : 'shortPriceLabel'}
    {#if showMinimum}<span
        >{formatFunc ? formatFunc('minimumPrice', { min: calculatedMinium }) : ''}</span
      >{/if}
    {#if showMaximum}<span
        >{formatFunc ? formatFunc('maximumPrice', { max: calculatedMaximum }) : ''}</span
      >{/if}
  </h3>
</div>

<style>
  .pricing-short-wrapper {
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

  .pricing-short-wrapper h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
