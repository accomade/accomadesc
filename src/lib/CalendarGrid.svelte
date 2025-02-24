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
</script>

<div class="cal-wrapper">
  <OccuPlanGrid
    {url}
    {debug}
    minDate={DateTime.utc().set({ day: 1, month: 1 }).minus({ year: maxPastYears })}
    maxDate={DateTime.utc().set({ day: 31, month: 12 }).plus({ year: maxFutureYears })}
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
