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
    rowsNumberOfMonths = 12,
    rowsFirstMonth = 1,
    toggleGridOffset = 640,
    toggleRowsOffset = 640,
    year = DateTime.utc().year,
    maxYear = DateTime.utc().plus({ years: 2 }).year,
    minYear = year,
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

  $effect(() => {
    console.log('gfm', gridFirstMonth, 'rfm', rowsFirstMonth);
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
      numberOfMonth={rowsNumberOfMonths}
      firstMonth={rowsFirstMonth}
      {year}
      {maxYear}
      {minYear}
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
      {monthHeaderFormat}
      numberOfMonth={gridNumberOfMonths}
      firstMonth={gridFirstMonth}
      {year}
      {maxYear}
      {minYear}
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
