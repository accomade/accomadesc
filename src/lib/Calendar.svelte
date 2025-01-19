<script lang="ts">
  import OccuPlanWrapper from '$lib/occuplan/OccuPlanWrapper.svelte';
  import type { CalendarContent, I18nFacade } from '$lib/types.js';

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
    translateFunc,
  }: CalendarContent & I18nFacade & { debug?: boolean } = $props();
</script>

<div class="cal-wrapper">
  <OccuPlanWrapper
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
