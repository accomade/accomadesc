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
    numberOfMonth = 12,
    firstMonth = 1,
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

  /*
    url,
    header = '',
    footer = '',
    nextPage = '>',
    prevPage = '<',
    weekdayLabels = defaultWeekdayLabels,
    monthLabels = defaultMonthLabels,
    monthHeaderFormat = defaultMonthHeaderFormat,
    numberOfMonth = 12,
    firstMonth = DateTime.utc().month,
    year = DateTime.utc().year,
    maxYear = DateTime.utc().plus({ years: 2 }).year,
    minYear = year,
    typeLabels = {
      one: 'BOOKING',
      two: 'RESERVATION',
      three: 'PERSONAL',
    },

  */
  const oStateID = `i-${url}-${OCCUPATION_STATE}`;
  let occupationState: OccupationState = getContext(oStateID);
  if (!occupationState) {
    occupationState = new OccupationState(url);
    setContext(oStateID, occupationState);
  }

  /*
    use different component based on different media size.
  */
  let w: Number = $state(0);
</script>

<div class="calendar-wrapper" bind:clientWidth={w}>
  {#if w && w.valueOf() > 640}
    <OccuPlanRows
      {url}
      {header}
      {footer}
      {weekendLabel}
      {monthLabels}
      {numberOfMonth}
      {firstMonth}
      {year}
      {maxYear}
      {minYear}
      {typeLabels}
    />
  {:else}
    <OccuPlanGrid
      {url}
      {header}
      {footer}
      {nextPage}
      {prevPage}
      {weekdayLabels}
      {monthLabels}
      {monthHeaderFormat}
      {numberOfMonth}
      {firstMonth}
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
