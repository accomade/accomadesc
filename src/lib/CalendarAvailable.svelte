<script lang="ts">
  import OccuPlanAvailableInfo from './occuplan/OccuPlanAvailableInfo.svelte';
  import { DateTime } from 'luxon';
  import type { CalendarAvailableContent, I18nFacade } from './types.js';
  import { type AvailableSpans } from './occuplan/state.svelte.ts';

  let {
    url,
    search = [3, 7, 14],
    maxFutureDate = DateTime.now().plus({ years: 2 }).toISO(),
    formatFunc,
    translateFunc,
  }: CalendarAvailableContent & I18nFacade = $props();

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

  <OccuPlanAvailableInfo {search} {url}>
    {#snippet children(av: AvailableSpans)}
      <ul>
        {#each search as s}
          <li>{formatAvailability(av[s], s)}</li>
        {/each}
      </ul>
    {/snippet}
  </OccuPlanAvailableInfo>
</div>

<style>
  .cal-wrapper {
    color: var(--main-font-color);
    background-color: var(--main-bg-color);
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: center;
    * {
      color: var(--main-font-color);
      background-color: var(--main-bg-color);
    }
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
