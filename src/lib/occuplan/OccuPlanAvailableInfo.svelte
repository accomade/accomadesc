<script lang="ts">
  import { DateTime } from 'luxon';
  import { normalizeDate } from '$lib/helpers/normalizeDate.js';
  import { getContext, onMount, untrack, setContext, type Snippet } from 'svelte';
  import { OccupationState, contextKey, type AvailableSpans } from '$lib/occuplan/state.svelte.js';
  import Spinner from '$lib/basic/Spinner.svelte';

  let {
    url,
    debug = false,
    search = [3, 7, 14],
    maxFutureDate = normalizeDate(DateTime.utc().plus({ years: 1 })),
    children,
  }: {
    url: string;
    debug?: boolean | undefined;
    search?: number[];
    maxFutureDate?: DateTime;
    children: Snippet<[AvailableSpans]>;
  } = $props();

  const stateID = contextKey(untrack(() => url));
  let ss: OccupationState = getContext(stateID);
  if (!ss) {
    ss = new OccupationState(() => {
      return { iCalURL: url, debug };
    });
    setContext(stateID, ss);
  }

  let occupationState: OccupationState = $derived(ss);
  let av = $derived(occupationState ? occupationState.calcAvailability(search, maxFutureDate) : {});

  onMount(() => {
    occupationState.loadOccupations();
  });
</script>

{#if !occupationState || occupationState.loading}
  <Spinner />
{/if}

{@render children(av)}
