<script lang="ts">
  import { OccuPlanWrapper } from 'occuplan';
  import Spinner from './basic/Spinner.svelte';
  import type { CalendarContent, I18nFacade } from './types.ts';

  let { calUrl, calendarTranslation, translateFunc }: CalendarContent & I18nFacade = $props();
  let calLoading = $state(true);
</script>

<div class="cal-wrapper">
  {#if calLoading}
    <Spinner />
  {/if}
  <OccuPlanWrapper
    on:result={() => (calLoading = false)}
    {calUrl}
    headerContent={translateFunc ? translateFunc('calendarHeader') : ''}
    translations={calendarTranslation}
  />
</div>

<style>
  .cal-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
  }
</style>

