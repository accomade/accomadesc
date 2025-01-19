<script lang="ts">
  import type { CalendarRowsContent, I18nFacade } from '$lib/types.js';
  import OccuPlanRows from '$lib/occuplan/OccuPlanRows.svelte';

  let {
    url,
    debug,
    calendarTranslation,
    translateFunc,
  }: CalendarRowsContent & I18nFacade & { debug?: boolean } = $props();
</script>

<div class="cal-wrapper">
  <OccuPlanRows
    {url}
    {debug}
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
