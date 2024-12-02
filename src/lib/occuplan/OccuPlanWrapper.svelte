<script lang="ts">
  import OccuPlanGrid from './OccuPlanGrid.svelte';
  import OccuPlanRows from './OccuPlanRows.svelte';
  import { getContext, setContext } from 'svelte';
  import {
    OCCUPATION_STATE,
    OccupationState,
    type OccuplanTranslations,
    type OccuplanMiscProps,
  } from './state.svelte.ts';

  let props: OccuplanTranslations & OccuplanMiscProps = $props();

  const oStateID = `i-${props.url}-${OCCUPATION_STATE}`;
  let occupationState: OccupationState = getContext(oStateID);
  if (!occupationState) {
    occupationState = new OccupationState(props.url);
    setContext(oStateID, occupationState);
  }

  /*
    use different component based on different media size.
  */
  let w: Number = $state(0);
</script>

<div class="calendar-wrapper" bind:clientWidth={w}>
  {#if w && w.valueOf() > 640}
    BIG:({w.valueOf()}) {JSON.stringify(props)}
    <!-- OccuPlanRows {...props} /-->
  {:else}
    SMALL:({w.valueOf()}) {JSON.stringify(props)}
    <!--  OccuPlanGrid {...props} /-->
  {/if}
</div>

<style>
  .calendar-wrapper {
    min-width: 210px;
    max-width: 820px;
    width: 100%;
  }
</style>
