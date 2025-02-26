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
  let minDate = $derived(DateTime.utc().minus({ year: maxPastYears }));
  let maxDate = $derived(DateTime.utc().plus({ year: maxFutureYears }));
</script>

<div class="cal-wrapper">
  <OccuPlanRows
    {url}
    {debug}
    {maxDate}
    {minDate}
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
