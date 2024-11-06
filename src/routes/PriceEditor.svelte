<script lang="ts">
  import TextInput from '$lib/basic/TextInput.svelte';
  import { dinero, toSnapshot, type DineroSnapshot } from 'dinero.js';

  let {
    e = $bindable(),
  }: {
    e: DineroSnapshot<number>;
  } = $props();

  let value = $state($state.snapshot(e.amount));

  $effect(() => {
    if (value) {
      const d = dinero({ ...e, amount: value });
      e = toSnapshot(d);
    }
  });
</script>

<TextInput type="number" marginForMessage={false} bind:value />
