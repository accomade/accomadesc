<script lang="ts">
  import { DateTime } from 'luxon';
  import { normalizeDate } from '$lib/helpers/normalizeDate.js';
  import type { AvailableSpans, OccupationState } from './state.svelte.js';
  import type { Snippet } from 'svelte';

  let {
    occupationState,
    search = [3, 7, 14],
    maxFutureDate = normalizeDate(DateTime.utc().plus({ years: 1 })),
    children,
  }: {
    occupationState: OccupationState;
    search?: number[];
    maxFutureDate?: DateTime;
    children: Snippet<[AvailableSpans]>;
  } = $props();

  let av = $derived(occupationState.calcAvailability(search, maxFutureDate));
</script>

{@render children(av)}
