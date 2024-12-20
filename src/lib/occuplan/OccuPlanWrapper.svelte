<script lang="ts">
  import OccuPlanGrid from './OccuPlanGrid.svelte';
  import OccuPlanRows from './OccuPlanRows.svelte';
  import { getContext, setContext } from 'svelte';
  import {
    OCCUPATION_STATE,
    OccupationState,
    type OccuplanTranslations,
    type OccuplanMiscProps,
    defaultWeekendLabel,
    defaultMonthLabels,
    defaultWeekdayLabels,
    defaultMonthHeaderFormat,
  } from './state.svelte.ts';
  import { DateTime } from 'luxon';

  let {
    url,
    header = '',
    footer = '',
    weekendLabel = defaultWeekendLabel,
    monthLabels = defaultMonthLabels,
    weekdayLabels = defaultWeekdayLabels,
    monthHeaderFormat = defaultMonthHeaderFormat,
    gridNumberOfMonths = 8,
    gridFirstMonth = '-1',
    gridMaxWidth = '1200px',
    rowsNumberOfMonths = 12,
    rowsFirstMonth = 1,
    rowsMaxWidth = '1200px',
    toggleGridOffset = 640,
    toggleRowsOffset = 640,
    maxDate = DateTime.utc().plus({ years: 2 }),
    minDate = DateTime.utc(),
    nextPage = '>',
    prevPage = '<',
    typeLabels = {
      one: 'BOOKING',
      two: 'RESERVATION',
      three: 'PERSONAL',
    },
  }: OccuplanTranslations & OccuplanMiscProps = $props();

  const oStateID = `i-${url}-${OCCUPATION_STATE}`;
  let occupationState: OccupationState = getContext(oStateID);
  if (!occupationState) {
    occupationState = new OccupationState(url);
    setContext(oStateID, occupationState);
  }

  /*
    use different component based on different media size.
  */
  let w: number = $state(0);
  let showGrid: boolean = $state(false);
  let showRows: boolean = $state(true);

  $effect(() => {
    if (w < toggleGridOffset && showRows) {
      showGrid = true;
      showRows = false;
    }
  });
  $effect(() => {
    if (w > toggleRowsOffset && showGrid) {
      showRows = true;
      showGrid = false;
    }
  });
</script>

<div class="calendar-wrapper" bind:clientWidth={w}>
  {#if showRows}
    <OccuPlanRows
      {url}
      {header}
      {footer}
      {weekendLabel}
      {monthLabels}
      {maxDate}
      {minDate}
      maxWidth={rowsMaxWidth}
      numberOfMonth={rowsNumberOfMonths}
      firstMonth={rowsFirstMonth}
      {typeLabels}
    />
  {:else if showGrid}
    <OccuPlanGrid
      {url}
      {header}
      {footer}
      {nextPage}
      {prevPage}
      {weekdayLabels}
      {monthLabels}
      {maxDate}
      {minDate}
      maxWidth={gridMaxWidth}
      {monthHeaderFormat}
      numberOfMonth={gridNumberOfMonths}
      firstMonth={gridFirstMonth}
      {typeLabels}
    />
  {/if}
</div>

<style>
  .calendar-wrapper {
    min-width: 210px;
    max-width: 110rem;
    width: 100%;
  }
</style>
