<script lang="ts">
  import TextInput from '$lib/basic/TextInput.svelte';
  import type {
    PricingColumn,
    PricingEntry,
    PricingRange,
    StaticPricingRange,
  } from '$lib/types.ts';
  import PriceEditor from './PriceEditor.svelte';

  let {
    global = $bindable(),
    staticRanges = $bindable(),
    ranges = $bindable(),
    entries = $bindable(),
    columns = $bindable(),
    footnoteText = $bindable(),
  }: {
    global: PricingEntry;
    staticRanges: StaticPricingRange[];
    ranges: PricingRange[];
    entries: PricingRange[];
    columns: PricingColumn[];
    footnoteText: string;
  } = $props();
</script>

{#snippet pricingEntry(e: PricingEntry)}
  <div class="entry-wrapper">
    <label> EachNight <PriceEditor e={e.perNightPrice} /> </label>
  </div>
{/snippet}

<div class="component-control">
  <div class="input-wrapper">
    <label>
      Footnote
      <TextInput marginForMessage={false} type="text" bind:value={footnoteText} />
    </label>
    {@render pricingEntry(global)}
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
