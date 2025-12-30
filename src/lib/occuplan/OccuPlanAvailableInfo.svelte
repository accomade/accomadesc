<script lang="ts">
  import { DateTime } from 'luxon';
  import { normalizeDate } from '$lib/helpers/normalizeDate.js';
  import { onMount, type Snippet } from 'svelte';
  import {
    OccupationState,
    getOccupationState,
    type AvailableSpans,
  } from '$lib/occuplan/state.svelte.js';
  import Spinner from '$lib/basic/Spinner.svelte';

  let {
    url,
    debug = false,
    search = [3, 7, 14],
    maxFutureDate = normalizeDate(DateTime.utc().plus({ years: 1 })),
    children,
  }: {
    url: string;
    debug?: boolean;
    search?: number[];
    maxFutureDate?: DateTime;
    children: Snippet<[AvailableSpans]>;
  } = $props();

  let occupationState: OccupationState = $derived(getOccupationState(url, debug));
  let av = $derived(occupationState ? occupationState.calcAvailability(search, maxFutureDate) : {});

  onMount(() => {
    occupationState.loadOccupations();
  });
</script>

{#if !occupationState || occupationState.loading}
  <Spinner />
{/if}

{@render children(av)}
