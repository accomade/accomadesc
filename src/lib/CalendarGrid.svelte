<script lang="ts">
  import type { CalendarGridContent, I18nFacade } from '$lib/types.js';
  import OccuPlanGrid from '$lib/occuplan/OccuPlanGrid.svelte';
  import { DateTime } from 'luxon';

  let {
    url,
    debug = false,
    calendarTranslation,
    minYear = DateTime.utc().year,
    maxYear = DateTime.utc().plus({ year: 2 }).year,
    translateFunc,
  }: CalendarGridContent & I18nFacade & { debug?: boolean } = $props();
</script>

<div class="cal-wrapper">
  <OccuPlanGrid
    {url}
    {debug}
    minDate={DateTime.utc().set({ day: 1, month: 1, year: minYear })}
    maxDate={DateTime.utc().set({ day: 31, month: 12, year: maxYear })}
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
