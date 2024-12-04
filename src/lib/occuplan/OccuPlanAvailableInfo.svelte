<script lang="ts">
  import { DateTime } from 'luxon';
  import { normalizeDate } from '$lib/helpers/normalizeDate.js';
  import type { AvailableSpans } from './state.svelte.js';
  import { getContext, setContext, type Snippet } from 'svelte';
  import { OCCUPATION_STATE, OccupationState } from './state.svelte.js';
  import Spinner from '$lib/basic/Spinner.svelte';
  import { browser } from '$app/environment';

  let {
    url,
    search = [3, 7, 14],
    maxFutureDate = normalizeDate(DateTime.utc().plus({ years: 1 })),
    children,
  }: {
    url: string;
    search?: number[];
    maxFutureDate?: DateTime;
    children: Snippet<[AvailableSpans]>;
  } = $props();

  const oStateID = `i-${url}-${OCCUPATION_STATE}`;
  let occupationState: OccupationState = $state(getContext(oStateID));

  $effect(() => {
    if (!occupationState && browser) {
      occupationState = new OccupationState(url);
      setContext(oStateID, occupationState);
    }
  });
  let av = $derived(occupationState ? occupationState.calcAvailability(search, maxFutureDate) : {});
</script>

{#if !occupationState || occupationState.loading}
  <Spinner />
{/if}

{@render children(av)}
