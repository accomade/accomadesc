<script lang="ts">
  import type { CalendarGridContent, I18nFacade } from '$lib/types.js';
  import OccuPlanGrid from '$lib/occuplan/OccuPlanGrid.svelte';
  import { DateTime } from 'luxon';

  let {
    url,
    debug = false,
    calendarTranslation,
    maxPastYears = 0,
    maxFutureYears = 2,
    translateFunc,
  }: CalendarGridContent & I18nFacade & { debug?: boolean } = $props();

  let minDate = $derived(DateTime.utc().minus({ year: maxPastYears }));
  let maxDate = $derived(DateTime.utc().plus({ year: maxFutureYears }));
</script>

<div class="cal-wrapper">
  <OccuPlanGrid
    {url}
    {debug}
    {minDate}
    {maxDate}
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
