<script lang="ts">
  import { DateTime } from 'luxon';
  import {
    add,
    allocate,
    dinero,
    multiply,
    greaterThan,
    lessThan,
    type Dinero,
    type DineroOptions,
  } from 'dinero.js';
  import { EUR } from '@dinero.js/currencies';
  import type { I18nFacade, PricingShortContent } from './types/blocks.ts';
  import type { PricingEntry } from './types/sub.ts';

  let {
    global = undefined,
    entries = [],
    ranges = [],
    staticRanges = [],
    showMaximum = true,
    showMinimum = true,
  }: PricingShortContent & I18nFacade = $props();

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

  //const pp = (entry: PricingEntry): {fnp: Dinero<number>, pnp: Dinero<number>} => {
  //  return {
  //    fnp: dinero(entry.firstNightPrice ?? entry.perNightPrice),
  //    pnp: dinero(entry.perNightPrice),
  //  }
  //}

  $effect(() => {
    filteredEntries.forEach((fe) => {
      let entry = fe.entry;
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
      let globalAvg: Dinero<number> | undefined;
      if (global.firstNightPrice && global.perNightPrice && global.minNumberOfNights) {
        const fnp = dinero(global.firstNightPrice);
        const pnp = dinero(global.perNightPrice);

        [globalAvg] = allocate(
          add(multiply(global.perNightPrice, global.minNumberOfNights - 1), global.firstNightPrice),
          new Array(global.minNumberOfNights).fill(1),
        );
      } else if (global.firstNightPrice && global.perNightPrice) {
        [globalAvg] = allocate(add(global.perNightPrice, global.firstNightPrice), [1, 1]);
      } else if (global.perNightPrice) {
        globalAvg = global.perNightPrice;
      }
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
    {dictEntry($currentLang, 'shortPriceLabel')}
    {#if showMinimum}<span>{formatMinimumPrice($currentLang, calculatedMinium)}</span>{/if}
    {#if showMaximun}<span>{formatMaximumPrice($currentLang, calculatedMaximum)}</span>{/if}
  </h3>
</div>

<style>
  .pricing-short-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pricing-short-wrapper h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>

