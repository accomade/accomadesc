<script lang="ts">
  import OccuPlanWrapper from '$lib/occuplan/OccuPlanWrapper.svelte';
  import type { CalendarContent, I18nFacade } from '$lib/types.js';
  import { DateTime } from 'luxon';

  let {
    url,
    debug = false,
    calendarTranslation,
    toggleGridOffset,
    gridMonthNumbers,
    gridFirstMonth,
    gridMaxWidth,
    toggleRowsOffset,
    rowsMonthNumbers,
    rowsFirstMonth,
    rowsMaxWidth,
    minYear = DateTime.utc().year,
    maxYear = DateTime.utc().plus({ year: 2 }).year,
    translateFunc,
  }: CalendarContent & I18nFacade & { debug?: boolean } = $props();
</script>

<div class="cal-wrapper">
  <OccuPlanWrapper
    minDate={DateTime.utc().set({ day: 1, month: 1, year: minYear })}
    maxDate={DateTime.utc().set({ day: 31, month: 12, year: maxYear })}
    {url}
    {debug}
    {toggleGridOffset}
    gridNumberOfMonths={gridMonthNumbers}
    {gridFirstMonth}
    {gridMaxWidth}
    {toggleRowsOffset}
    rowsNumberOfMonths={rowsMonthNumbers}
    {rowsFirstMonth}
    {rowsMaxWidth}
    header={translateFunc ? translateFunc('calendarHeader') : ''}
    {...calendarTranslation}
  />
</div>

<style>
  .cal-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
  }
</style>
