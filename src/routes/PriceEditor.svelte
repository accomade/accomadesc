<script lang="ts">
  import TextInput from '$lib/basic/TextInput.svelte';
  import { dinero, toSnapshot, type DineroSnapshot } from 'dinero.js';

  let {
    price = $bindable(),
  }: {
    price?: DineroSnapshot<number>;
  } = $props();

  if (!price)
    price = toSnapshot(
      dinero({
        amount: 0,
        currency: { code: 'EUR', base: 10, exponent: 2 },
        scale: 2,
      }),
    );

  const changed = (valid: boolean, name: string, value: string | number) => {
    console.log(valid, name, value);
    if (valid && value) {
      if (price) {
        const d = dinero({ ...price, amount: value as number });
        price = toSnapshot(d);
      }
    }
  };
</script>

{#if price}
  <TextInput type="number" marginForMessage={false} value={price.amount} valueChanged={changed} />
{/if}
