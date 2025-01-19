<script lang="ts">
  import type { CalendarGridContent, I18nFacade } from '$lib/types.js';
  import OccuPlanGrid from '$lib/occuplan/OccuPlanGrid.svelte';

  let {
    url,
    debug = false,
    calendarTranslation,
    translateFunc,
  }: CalendarGridContent & I18nFacade & { debug?: boolean } = $props();
</script>

<div class="cal-wrapper">
  <OccuPlanGrid
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
