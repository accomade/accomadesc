<script lang="ts">
  import { OccuPlanAvailableInfo } from 'occuplan';
  import { DateTime } from 'luxon';
  import Spinner from './basic/Spinner.svelte';
  import type { CalendarAvailableContent, I18nFacade } from './types.ts';

  let {
    calUrl,
    search = [3, 7, 14],
    maxFutureDate = DateTime.now().plus({ years: 2 }).toISO(),
    formatFunc,
    translateFunc,
  }: CalendarAvailableContent & I18nFacade = $props();
  let calLoading = $state(true);

  let availHeader = $derived(translateFunc ? translateFunc('availability') : '[AVAILABILITY]');

  const formatAvailability = (from: DateTime | null, forDays: number): string => {
    if (!formatFunc) return '';
    if (from == null) {
      return formatFunc('nothingAvailable', {
        forDays,
        maxFutureDate,
      });
    }
    return formatFunc('availableFromFor', {
      from,
      forDays,
    });
  };
</script>

<div class="cal-wrapper">
  <h3>{availHeader}</h3>

  <OccuPlanAvailableInfo
    {search}
    on:result={() => (calLoading = false)}
    {calUrl}
    let:available={av}
  >
    <ul>
      {#each search as s}
        <li>{formatAvailability(av[s], s)}</li>
      {/each}
    </ul>
  </OccuPlanAvailableInfo>
  {#if calLoading}
    <Spinner />
  {/if}
</div>

<style>
  .cal-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  h3 {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    list-style: none;
    font-size: 1.2rem;
  }
</style>

