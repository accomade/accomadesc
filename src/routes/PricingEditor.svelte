<script lang="ts">
  import Button from '$lib/basic/Button.svelte';
  import TextInput from '$lib/basic/TextInput.svelte';
  import { PRICING_COLUMNS } from '$lib/types.js';
  import type {
    PricingColumn,
    PricingEntry,
    PricingRange,
    StaticPricingRange,
  } from '$lib/types.js';
  import type { I18n } from './I18n.svelte.js';
  import PricingEntryEditor from './PricingEntryEditor.svelte';
  import { DateTime } from 'luxon';

  let {
    global = $bindable(),
    staticRanges = $bindable(),
    ranges = $bindable(),
    columns = $bindable([]),
    useColumns = true,
    footnoteText = $bindable(),
    i18n,
  }: {
    global: PricingEntry;
    staticRanges: StaticPricingRange[];
    ranges: PricingRange[];
    columns?: PricingColumn[];
    useColumns?: boolean;
    footnoteText: string;
    i18n: I18n;
  } = $props();

  const newEntry = (): PricingEntry => {
    return {
      perNightPrice: 0,
      minNumberOfNights: 3,
    };
  };

  const addStaticRange = () => {
    const sr: StaticPricingRange = {
      from: {
        month: 1,
        day: 1,
      },
      to: {
        month: 12,
        day: 31,
      },
      entry: newEntry(),
    };
    staticRanges.push(sr);
  };

  const addSpecRange = () => {
    const r: PricingRange = {
      from: DateTime.utc().toISO(),
      to: DateTime.utc().plus({ years: 1 }).toISO(),
      entry: newEntry(),
    };

    ranges.push(r);
  };

  const makeFromChangeHandler = (r: PricingRange) => {
    return (e: Event) => {
      const newDateString = (e.target as HTMLInputElement).value;
      const newDate = DateTime.fromFormat(newDateString, 'yyyy-MM-dd', { zone: 'utc' });
      r.from = newDate.toISO() as string;
    };
  };

  const makeToChangeHandler = (r: PricingRange) => {
    return (e: Event) => {
      const newDateString = (e.target as HTMLInputElement).value;
      const newDate = DateTime.fromFormat(newDateString, 'yyyy-MM-dd', { zone: 'utc' });
      r.to = newDate.toISO() as string;
    };
  };

  const toggleColumn = (c: PricingColumn) => {
    const index = columns.indexOf(c);
    if (index == -1) {
      columns.push(c);
    } else {
      columns.splice(index, 1);
    }
  };
</script>

<div class="component-control">
  <div class="input-wrapper">
    <label>
      Footnote
      <TextInput marginForMessage={false} type="text" bind:value={footnoteText} />
    </label>
    {#if useColumns}
      <div class="pricing-columns">
        <h4>Columns to display</h4>
        {#each PRICING_COLUMNS as pc}
          <label
            >{pc}
            <input
              type="checkbox"
              checked={columns.includes(pc)}
              oninput={() => toggleColumn(pc)}
            />
          </label>
        {/each}
      </div>
    {/if}
    <h4>Global</h4>
    <PricingEntryEditor bind:pricingEntry={global} {i18n} />
  </div>
  <div class="button-row">
    <Button text="Add Static Range" clicked={addStaticRange} />
    <Button text="Add Specific Range" clicked={addSpecRange} />
  </div>
  <div class="input-wrapper">
    <h4>Generic Ranges</h4>
    {#each staticRanges as r}
      <div class="input-wrapper range">
        <div class="static-wrapper">
          <label
            >From Day <TextInput
              maxNumber={31}
              minNumber={1}
              maxWidth="4rem"
              type="number"
              marginForMessage={false}
              bind:value={r.from.day}
            /></label
          >
          <label
            >From Month <TextInput
              maxNumber={12}
              minNumber={1}
              maxWidth="4rem"
              type="number"
              marginForMessage={false}
              bind:value={r.from.month}
            /></label
          >
        </div>
        <div class="static-wrapper">
          <label
            >To Day <TextInput
              maxNumber={31}
              minNumber={1}
              maxWidth="4rem"
              type="number"
              marginForMessage={false}
              bind:value={r.to.day}
            /></label
          >
          <label
            >To Month <TextInput
              maxNumber={12}
              minNumber={1}
              maxWidth="4rem"
              type="number"
              marginForMessage={false}
              bind:value={r.to.month}
            /></label
          >
        </div>
        <PricingEntryEditor bind:pricingEntry={r.entry} {i18n} />
      </div>
    {/each}
  </div>
  <div class="input-wrapper">
    <h4>Specific Ranges</h4>
    {#each ranges as r}
      <div class="input-wrapper range">
        <label
          >From
          <input
            type="date"
            value={DateTime.fromISO(r.from).toFormat('yyyy-MM-dd')}
            oninput={makeFromChangeHandler(r)}
          />
        </label>
        <label
          >To
          <input
            type="date"
            value={DateTime.fromISO(r.to).toFormat('yyyy-MM-dd')}
            oninput={makeToChangeHandler(r)}
          />
        </label>
        <PricingEntryEditor bind:pricingEntry={r.entry} {i18n} />
      </div>
    {/each}
  </div>
</div>

<style>
  .static-wrapper {
    display: flex;
    justify-content: space-around;
  }

  .component-control {
    display: flex;
    padding: 1rem;
    flex: 1;
    gap: 1rem;
    flex-direction: column;
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
    gap: 1rem;
    text-align: center;
  }

  .button-row {
    display: flex;
    justify-content: space-between;
  }

  .range {
    padding: 1rem;
    background-color: var(--bg-tert-color);
    margin: 0.5rem;
  }
</style>
