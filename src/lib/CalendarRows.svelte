<script lang="ts">
  import type { CalendarRowsContent, I18nFacade } from '$lib/types.js';
  import OccuPlanRows from '$lib/occuplan/OccuPlanRows.svelte';

  let { url, calendarTranslation, translateFunc }: CalendarRowsContent & I18nFacade = $props();
</script>

<div class="cal-wrapper">
  <OccuPlanRows
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
