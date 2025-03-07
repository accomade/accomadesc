<script lang="ts">
  import OccuPlanGrid from '$lib/occuplan/OccuPlanGrid.svelte';
  import OccuPlanRows from '$lib/occuplan/OccuPlanRows.svelte';
  import {
    type OccuplanTranslations,
    type OccuplanMiscProps,
    defaultWeekendLabel,
    defaultMonthLabels,
    defaultWeekdayLabels,
    defaultMonthHeaderFormat,
  } from '$lib/occuplan/state.svelte.js';
  import { DateTime } from 'luxon';

  let {
    url,
    header = '',
    footer = '',
    debug = false,
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
      {debug}
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
      {debug}
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
    display: flex;
    justify-content: center;
    min-width: 210px;
    max-width: 110rem;
    width: 100%;
  }
</style>
