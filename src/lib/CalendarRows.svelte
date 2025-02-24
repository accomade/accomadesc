<script lang="ts">
  import type { CalendarRowsContent, I18nFacade } from '$lib/types.js';
  import OccuPlanRows from '$lib/occuplan/OccuPlanRows.svelte';
  import { DateTime } from 'luxon';

  let {
    url,
    debug,
    calendarTranslation,
    maxPastYears = 0,
    maxFutureYears = 2,
    translateFunc,
  }: CalendarRowsContent & I18nFacade & { debug?: boolean } = $props();
</script>

<div class="cal-wrapper">
  <OccuPlanRows
    {url}
    {debug}
    minDate={DateTime.utc().set({ day: 1, month: 1 }).minus({ years: maxPastYears })}
    maxDate={DateTime.utc().set({ day: 31, month: 12 }).plus({ years: maxFutureYears })}
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
