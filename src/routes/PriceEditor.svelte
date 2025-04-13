<script lang="ts">
  import TextInput from '$lib/basic/TextInput.svelte';
  import { dinero, toSnapshot, type DineroSnapshot } from 'dinero.js';

  let {
    price = $bindable(),
  }: {
    price?: number;
  } = $props();

  if (!price) price = 0;

  const changed = (valid: boolean, name: string, value: string | number) => {
    console.log(valid, name, value);
    if (valid && value && typeof value == 'string') {
      price = parseInt(value) * 100;
    } else if (valid && value && typeof value == 'number') {
      price = value * 100;
    }
  };
</script>

{#if price}
  <TextInput
    type="number"
    marginForMessage={false}
    value={Math.round(price / 100)}
    valueChanged={changed}
  />
{/if}
