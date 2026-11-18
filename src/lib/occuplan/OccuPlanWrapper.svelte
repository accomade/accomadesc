<script lang="ts">
  import OccuPlanGrid from '#lib/occuplan/OccuPlanGrid.svelte';
  import OccuPlanRows from '#lib/occuplan/OccuPlanRows.svelte';
  import {
    type OccuplanTranslations,
    type OccuplanMiscProps,
    defaultWeekendLabel,
    defaultMonthLabels,
    defaultWeekdayLabels,
    defaultMonthHeaderFormat,
    contextKey,
    OccupationState,
  } from '#lib/occuplan/state.svelte.js';
  import { type CalendarView, resolveCalendarView } from '#lib/occuplan/layout.js';
  import { DateTime } from 'luxon';
  import { getContext, setContext, untrack } from 'svelte';

  let {
    url,
    header = '',
    footer = '',
    debug = false,
    layout = 'auto',
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
    Use the explicit layout when set. `auto` switches by container width.
    Before the width is measured grid is rendered, so SSR and no-JS clients
    never show rows on a narrow screen.
  */
  let w: number = $state(0);
  let view: CalendarView = $derived(
    resolveCalendarView(layout, w, toggleGridOffset, toggleRowsOffset),
  );

  const stateID = contextKey(untrack(() => url));
  let ss: OccupationState = getContext(stateID);
  if (!ss) {
    ss = new OccupationState(() => {
      return { iCalURL: url, debug };
    });
    setContext(stateID, ss);
  }
</script>

<div class="calendar-wrapper" bind:clientWidth={w}>
  {#if view === 'rows'}
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
  {:else}
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
