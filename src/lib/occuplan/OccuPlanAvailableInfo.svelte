<script lang="ts">
  import { DateTime } from 'luxon';
  import { normalizeDate } from '$lib/helpers/normalizeDate.js';
  import { getContext, setContext, type Snippet } from 'svelte';
  import {
    OCCUPATION_STATE,
    OccupationState,
    getOccupationState,
    type AvailableSpans,
  } from '$lib/occuplan/state.svelte.js';
  import Spinner from '$lib/basic/Spinner.svelte';
  import { browser } from '$app/environment';

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

  const oStateID = `i-${url}-${OCCUPATION_STATE}`;
  let occupationState: OccupationState = $state(getContext(oStateID));

  $effect(() => {
    if (!occupationState && browser) {
      occupationState = getOccupationState(url, debug);
      setContext(oStateID, occupationState);
    }
  });
  let av = $derived(occupationState ? occupationState.calcAvailability(search, maxFutureDate) : {});
</script>

{#if !occupationState || occupationState.loading}
  <Spinner />
{/if}

{@render children(av)}
