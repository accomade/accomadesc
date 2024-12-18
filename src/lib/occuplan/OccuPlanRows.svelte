<script lang="ts">
  import { DateTime, type DayNumbers, type MonthNumbers } from 'luxon';
  import {
    defaultMonthLabels,
    defaultWeekendLabel,
    OccupationState,
    occupationTypeFormatting,
    type OccupationType,
    type OccuplanTranslations,
    OCCUPATION_STATE,
    type DayHelper,
    type FirstMonth,
    realFirstMonth,
  } from './state.svelte.ts';
  import Button from '$lib/basic/Button.svelte';
  import { browser } from '$app/environment';
  import { getContext, setContext } from 'svelte';
  import Spinner from '$lib/basic/Spinner.svelte';

  let {
    url,
    header = '',
    footer = '',
    weekendLabel = defaultWeekendLabel,
    monthLabels = defaultMonthLabels,
    numberOfMonth = 12,
    firstMonth = 1,
    year = DateTime.utc().year,
    maxYear = DateTime.utc().plus({ years: 2 }).year,
    minYear = year,
    typeLabels = {
      one: 'BOOKING',
      two: 'RESERVATION',
      three: 'PERSONAL',
    },
  }: OccuplanTranslations & {
    url: string;
    numberOfMonth: number;
    firstMonth: FirstMonth;
    year: number;
    minYear: number;
    maxYear: number;
  } = $props();

  const oStateID = `i-${url}-${OCCUPATION_STATE}`;
  let occupationState: OccupationState = $state(getContext(oStateID));
  $effect(() => {
    if (!occupationState && browser) {
      occupationState = new OccupationState(url);
      setContext(oStateID, occupationState);
    }
  });

  let rfMonth: number | DateTime = $derived(realFirstMonth(firstMonth));

  let prevYear = $derived(DateTime.local(year).minus({ years: 1 }).year);
  let nextYear = $derived(DateTime.local(year).plus({ years: 1 }).year);

  let months: DateTime[] = $derived.by(() => {
    const result = [];
    let fMonth: DateTime;

    if (typeof rfMonth == 'number') {
      fMonth = DateTime.utc(year, rfMonth, 1);
    } else {
      fMonth = DateTime.utc(rfMonth.year, rfMonth.month, 1);
    }

    result.push(fMonth);

    let nMonth = fMonth.plus({ months: 1 });
    for (let c = 1; c < numberOfMonth; c++) {
      result.push(nMonth);
      nMonth = nMonth.plus({ months: 1 });
    }
    return result;
  });

  const nextYearClicked = () => {
    year = nextYear;
  };

  const prevYearClicked = () => {
    year = prevYear;
  };

  const monthDays = [...Array(31).keys()].map((i) => i + 1);
  let days: DayHelper[] = $derived.by(() => {
    const ldays: DayHelper[] = [];
    if (!browser) return ldays;
    if (!occupationState || occupationState.loading) return ldays;
    for (const m of months) {
      for (let d: DayNumbers = 1; d <= 31; d++) {
        const day: DayHelper = {
          day: d,
          month: m.month as MonthNumbers,
          year: m.year,
        };
        ldays.push(day);
      }
    }
    console.log('rerun');
    return ldays;
  });

  let monthGridTemplateColumns = $derived(
    monthDays.reduce((s, d) => {
      s += ` [d${d}] 1fr`;
      return s;
    }, '[rowLegend] 1.5fr'),
  );

  let monthGridTemplateRows = $derived(
    months.reduce((s, m) => {
      s += ` [m${m.month}y${m.year}] 1fr`;
      return s;
    }, '[columnLegend] 1fr'),
  );

  let foundOccupationTypes: OccupationType[] = $derived(
    occupationState
      ? occupationState.occupations.reduce((res, occupation) => {
          if (!res.includes(occupation.type)) {
            res.push(occupation.type);
          }
          return res;
        }, [] as OccupationType[])
      : [],
  );

  let width = $state(0);
</script>

{#if !occupationState || occupationState.loading}
  <Spinner />
{/if}

<section class="occuplan-wrapper" bind:clientWidth={width}>
  <header class="occupation-plan-header">
    <div class="header-controls">
      {#if prevYear >= minYear}
        <Button text={`${prevYear}`} clicked={prevYearClicked} />
      {/if}
    </div>
    <div class="header-label"><h3>{@html header}&nbsp;({year})</h3></div>
    <div class="header-controls">
      {#if nextYear <= maxYear}
        <Button text={`${nextYear}`} clicked={nextYearClicked} />
      {/if}
    </div>
  </header>
  <main
    style="
    grid-template-columns: {monthGridTemplateColumns};
    grid-template-rows: {monthGridTemplateRows};
    "
  >
    <div
      class="corner"
      style="
        grid-area: columnLegend / rowLegend / columnLegend / rowLegend;
        background-color: var(--occuplan-bg-color-main);"
    >
      &nbsp;
    </div>

    {#each monthDays as d}
      <div class="monthday-header" style="grid-area: columnLegend / d{d} / columnLegend / d{d};">
        <span>{d}</span>
      </div>
    {/each}

    {#each months as m (`${m.year}-${m.month}`)}
      <div
        class="month-label"
        style="grid-area: m{m.month}y{m.year} / rowLegend / m{m.month}y{m.year} / rowLegend;"
      >
        <span>{monthLabels[m.month as MonthNumbers]}</span>
      </div>
    {/each}

    {#if occupationState}
      {#each days as d (`${d.year}-${d.month}-${d.day}`)}
        <div
          class="day"
          style="
            outline: var(--occuplan-grid-border);
            grid-area: m{d.month}y{d.year}  / d{d.day} / m{d.month}y{d.year} / d{d.day};
            {occupationState.occupationStyle(d, true)}
            "
        >
          &nbsp;
        </div>
      {/each}
    {/if}
  </main>
  <footer>
    <div class="legend">
      <span>{weekendLabel}</span>
      <div
        id="weekend-legend"
        class="legend-entry-marker"
        style="
            outline: var(--occuplan-grid-border);
            background: radial-gradient(var(--occuplan-bg-color-weekend), var(--occuplan-bg-color-main), var(--occuplan-bg-color-main));
            "
      >
        &nbsp;
      </div>
      {#each foundOccupationTypes as t}
        {@const format = occupationTypeFormatting(t)}
        <span>{typeLabels[t]}</span>
        <div
          id="occupation-type-{t}-legend"
          class="legend-entry-marker"
          style="background-color: {format.bgColor}; outline: var(--occuplan-grid-border);"
        >
          &nbsp;
        </div>
      {/each}
    </div>
    <div class="footer-content">
      {@html footer}
    </div>
  </footer>
</section>

<style>
  .footer-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .legend {
    display: grid;
    grid-template-columns: [label] 1fr [marker] 1rem;
    column-gap: 1rem;
    text-transform: capitalize;
    font-variant: small-caps;
  }

  .legend-entry-marker {
    width: 1rem;
    height: 1rem;
  }

  main {
    display: grid;
    width: 100%;
    max-width: 110rem;
    overflow-x: auto;
  }

  .month-label {
    aspect-ratio: 3 / 2;
    display: flex;
    align-items: center;
    border-bottom: var(--occuplan-grid-border);
    border-top: var(--occuplan-grid-border);
    color: var(--occuplan-font-color-months);
    background-color: var(--occuplan-bg-color-months);
    container-type: size;
    container-name: month-label;
    padding-left: 0.3rem;
  }

  @container month-label (min-height: 0) {
    .month-label span {
      font-size: 55cqh;
    }
  }

  .monthday-header {
    text-align: center;
    aspect-ratio: 1;
    display: inline-grid;
    align-content: center;
    outline: var(--occuplan-grid-border);
    background-color: var(--occuplan-bg-color-days-header);
    color: var(--occuplan-font-color-days-header);
    container-type: size;
    container-name: month-header;
  }

  @container month-header (min-width: 0) {
    .monthday-header span {
      font-size: 55cqh;
    }
  }

  .occupation-plan-header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .header-label {
    text-transform: capitalize;
    font-variant: small-caps;
    font-weight: bold;

    h3 {
      padding-top: 0;
      padding-bottom: 0.2rem;
    }
  }

  .header-controls {
    width: 5rem;
  }

  .occuplan-wrapper {
    height: 100%;
    width: calc(100% - 0.5rem);
    padding: 0.5rem;
    margin: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;

    border: var(--occuplan-main-border);
    color: var(--occuplan-font-color-main);
    background-color: var(--occuplan-bg-color-main);
  }

  footer {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
  }
</style>
