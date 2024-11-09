<script lang="ts">
  import { I18n } from './I18n.svelte';
  import type { PricingEntry } from '$lib/types.ts';
  import PriceEditor from './PriceEditor.svelte';
  import TextInput from '$lib/basic/TextInput.svelte';
  import { randomID } from '$lib/names/gen.ts';
  import Button from '$lib/basic/Button.svelte';

  let {
    pricingEntry = $bindable(),
    i18n,
  }: {
    pricingEntry: PricingEntry;
    i18n: I18n;
  } = $props();

  let collapsed = $state(true);

  const changeAdd1Translation = (valid: boolean, _: string, value: string | number) => {
    if (valid && value) {
      if (!pricingEntry.additionalPersonText1) pricingEntry.additionalPersonText1 = randomID();

      i18n.translations[i18n.currentLang][pricingEntry.additionalPersonText1] = `${value}`;
    }
  };

  const changeAdd2Translation = (valid: boolean, _: string, value: string | number) => {
    if (valid && value) {
      if (!pricingEntry.additionalPersonText2) pricingEntry.additionalPersonText2 = randomID();

      i18n.translations[i18n.currentLang][pricingEntry.additionalPersonText2] = `${value}`;
    }
  };

  const changeAdd3Translation = (valid: boolean, _: string, value: string | number) => {
    if (valid && value) {
      if (!pricingEntry.additionalPersonText3) pricingEntry.additionalPersonText3 = randomID();

      i18n.translations[i18n.currentLang][pricingEntry.additionalPersonText3] = `${value}`;
    }
  };

  const changeMinNumNights = (valid: boolean, _: string, value: string | number) => {
    if (valid && value) {
      pricingEntry.minNumberOfNights = value as number;
    }
  };

  const changeNumberOfGuestsBase = (valid: boolean, _: string, value: string | number) => {
    if (valid && value) {
      pricingEntry.numberOfGuestsBase = value as number;
    }
  };

  const changeNumberOfGuestsMax = (valid: boolean, _: string, value: string | number) => {
    if (valid && value) {
      pricingEntry.numberOfGuestsMax = value as number;
    }
  };
</script>

<div class="entry-wrapper">
  {#if !collapsed}
    <div>
      <label
        >Min Number of Nights <TextInput
          marginForMessage={false}
          value={pricingEntry.minNumberOfNights}
          type="number"
          minNumber={1}
          valueChanged={changeMinNumNights}
        />
      </label>
      <label
        >Number of Guests Base <TextInput
          marginForMessage={false}
          value={pricingEntry.numberOfGuestsBase}
          type="number"
          minNumber={1}
          valueChanged={changeNumberOfGuestsBase}
        />
      </label>
      <label
        >Number of Guests Max <TextInput
          marginForMessage={false}
          value={pricingEntry.numberOfGuestsMax}
          type="number"
          minNumber={1}
          valueChanged={changeNumberOfGuestsMax}
        />
      </label>

      <label>FirstNight <PriceEditor bind:price={pricingEntry.firstNightPrice} /> </label>
      <label>EachNight <PriceEditor bind:price={pricingEntry.perNightPrice} /> </label>
      <hr />
      <label>Add 1 price<PriceEditor bind:price={pricingEntry.additionalPersonPrice1} /> </label>
      <label
        >Add 1 text <TextInput
          marginForMessage={false}
          valueChanged={changeAdd1Translation}
          name={pricingEntry.additionalPersonText1}
          value={pricingEntry.additionalPersonText1
            ? i18n.translations[i18n.currentLang][pricingEntry.additionalPersonText1]
            : ''}
        />
      </label>
      <hr />
      <label>Add 2 price<PriceEditor bind:price={pricingEntry.additionalPersonPrice2} /> </label>
      <label
        >Add 2 text <TextInput
          marginForMessage={false}
          valueChanged={changeAdd2Translation}
          name={pricingEntry.additionalPersonText2}
          value={pricingEntry.additionalPersonText2
            ? i18n.translations[i18n.currentLang][pricingEntry.additionalPersonText2]
            : ''}
        />
      </label>
      <hr />
      <label>Add 3 price<PriceEditor bind:price={pricingEntry.additionalPersonPrice3} /> </label>
      <label
        >Add 3 text <TextInput
          marginForMessage={false}
          valueChanged={changeAdd3Translation}
          name={pricingEntry.additionalPersonText3}
          value={pricingEntry.additionalPersonText3
            ? i18n.translations[i18n.currentLang][pricingEntry.additionalPersonText3]
            : ''}
        />
      </label>
    </div>
  {/if}
  <div class="open-close">
    {#if collapsed}
      <Button text="open" clicked={() => (collapsed = false)} />
    {:else}
      <Button text="close" clicked={() => (collapsed = true)} />
    {/if}
  </div>
</div>

<style>
  .entry-wrapper {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .open-close {
    position: absolute;
    top: -1rem;
    right: -1rem;
  }
  label {
    justify-content: space-between;
    display: flex;
    gap: 0.5rem;
  }
</style>
