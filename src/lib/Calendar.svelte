<script lang="ts">
  import OccuPlanWrapper from './occuplan/OccuPlanWrapper.svelte';
  import type { CalendarContent, I18nFacade } from './types.js';

  let {
    url,
    calendarTranslation,
    toggleGridOffset,
    gridMonthNumbers,
    gridFirstMonth,
    toggleRowsOffset,
    rowsMonthNumbers,
    rowsFirstMonth,
    translateFunc,
  }: CalendarContent & I18nFacade = $props();
</script>

<div class="cal-wrapper">
  <OccuPlanWrapper
    {url}
    {toggleGridOffset}
    {gridMonthNumbers}
    {gridFirstMonth}
    {toggleRowsOffset}
    {rowsMonthNumbers}
    {rowsFirstMonth}
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
