<script lang="ts">
  import { DateTime, type DayNumbers, type MonthNumbers } from 'luxon';
  import {
    defaultMonthLabels,
    defaultWeekendLabel,
    OccupationState,
    getOccupationState,
    occupationTypeFormatting,
    type OccupationType,
    type OccuplanTranslations,
    OCCUPATION_STATE,
    type DayHelper,
    type FirstMonth,
    realFirstMonth,
  } from '$lib/occuplan/state.svelte.js';
  import Button from '$lib/basic/Button.svelte';
  import { browser } from '$app/environment';
  import { getContext, setContext } from 'svelte';
  import Spinner from '$lib/basic/Spinner.svelte';

  let {
    url,
    debug = false,
    header = '',
    footer = '',
    weekendLabel = defaultWeekendLabel,
    monthLabels = defaultMonthLabels,
    numberOfMonth = 12,
    firstMonth = 1,
    maxWidth = '1200px',
    maxDate = DateTime.utc().plus({ years: 2 }),
    minDate = DateTime.utc(),
    typeLabels = {
      one: 'BOOKING',
      two: 'RESERVATION',
      three: 'PERSONAL',
    },
  }: OccuplanTranslations & {
    url: string;
    debug?: boolean;
    numberOfMonth?: number;
    firstMonth?: FirstMonth;
    minDate?: DateTime;
    maxDate?: DateTime;
    maxWidth?: string;
  } = $props();

  const oStateID = `i-${url}-${OCCUPATION_STATE}`;
  let occupationState: OccupationState = $state(getContext(oStateID));
  $effect(() => {
    if (!occupationState && browser) {
      occupationState = getOccupationState(url, debug);
      setContext(oStateID, occupationState);
    }
  });

  let page: number = $state(0);
  let rfMonth: number | DateTime = $derived(realFirstMonth(firstMonth, numberOfMonth, page));

  let currentMaxDate = $derived(rfMonth.plus({ month: numberOfMonth }));

  let months: DateTime[] = $derived.by(() => {
    const result = [];
    if (rfMonth.month == 1) {
      //result.push(rfMonth);
    }

    let fMonth: DateTime = DateTime.utc(rfMonth.year, rfMonth.month, 1);
    result.push(fMonth);

    let nMonth = fMonth.plus({ months: 1 });
    for (let c = 1; c < numberOfMonth; c++) {
      result.push(nMonth);
      nMonth = nMonth.plus({ months: 1 });
    }
    return result;
  });

  const nextClicked = () => {
    page += 1;
  };

  const prevClicked = () => {
    page -= 1;
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
      if (m.month == 1 && s != '[columnLegend] 1fr [firstYearRow] 1fr') {
        s += ` [y${m.year}Row] 1fr`;
      }

      s += ` [m${m.month}y${m.year}] 1fr`;
      return s;
    }, '[columnLegend] 1fr [firstYearRow] 1fr'),
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
</script>

{#if !occupationState || occupationState.loading}
  <Spinner />
{/if}

<section class="occuplan-wrapper" style="max-width: {maxWidth};">
  <header class="occupation-plan-header">
    <div class="header-controls">
      {#if rfMonth >= minDate}
        <Button text="<" clicked={prevClicked} />
      {/if}
    </div>
    <div class="header-label"><h3>{@html header}</h3></div>
    <div class="header-controls">
      {#if currentMaxDate <= maxDate}
        <Button text=">" clicked={nextClicked} />
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
        background-color: var(--occuplan-main-bg-color);"
    >
      &nbsp;
    </div>

    {#each monthDays as d}
      <div class="monthday-header" style="grid-area: columnLegend / d{d} / columnLegend / d{d};">
        <span>{d}</span>
      </div>
    {/each}

    <div class="year-label" style="grid-area: firstYearRow / d1 / firstYearRow / d31;">
      <span>{rfMonth.year}</span>
    </div>
    {#each months as m, i (`${m.year}-${m.month}`)}
      {#if m.month == 1 && i != 0}
        <div class="year-label" style="grid-area: y{m.year}Row / d1 / y{m.year}Row / d31;">
          <span>{m.year}</span>
        </div>
      {/if}
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
            {occupationState.occupationStyle(d, true, maxDate)}
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
            background: radial-gradient(var(--occuplan-weekend-bg-color), var(--occuplan-main-bg-color), var(--occuplan-main-bg-color));
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
    overflow-x: auto;
  }

  .month-label {
    aspect-ratio: 3 / 2;
    display: flex;
    align-items: center;
    border-bottom: var(--occuplan-grid-border);
    border-top: var(--occuplan-grid-border);
    color: var(--occuplan-months-font-color);
    background-color: var(--occuplan-months-bg-color);
    container-type: size;
    container-name: month-label;
    padding-left: 0.3rem;
    height: 100%;
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
    background-color: var(--occuplan-days-header-bg-color);
    color: var(--occuplan-days-header-font-color);
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
    width: 2rem;
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
    color: var(--occuplan-main-font-color);
    background-color: var(--occuplan-main-bg-color);
  }

  footer {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
  }

  .year-label {
    display: flex;
    justify-content: center;
    align-items: center;
    container-type: size;
    container-name: year-label;
    text-decoration: underline;
    height: 100%;
  }

  @container year-label (min-width: 0) {
    .year-label span {
      font-size: 65cqh;
    }
  }
</style>
