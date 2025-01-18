<script lang="ts">
  import type { CalendarGridContent, I18nFacade } from '$lib/types.js';
  import OccuPlanGrid from '$lib/occuplan/OccuPlanGrid.svelte';

  let { url, calendarTranslation, translateFunc }: CalendarGridContent & I18nFacade = $props();
</script>

<div class="cal-wrapper">
  <OccuPlanGrid
    {url}
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
