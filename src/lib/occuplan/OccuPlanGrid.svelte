<script lang="ts">
  import { DateTime, type MonthNumbers, type WeekdayNumbers } from 'luxon';
  import * as Sqrl from 'squirrelly';
  import {
    defaultMonthHeaderFormat,
    defaultMonthLabels,
    defaultWeekdayLabels,
    OCCUPATION_STATE,
    OccupationState,
    occupationTypeFormatting,
    type OccupationType,
    type OccuplanTranslations,
  } from './state.svelte.js';
  import { getContext, setContext } from 'svelte';
  import Button from '$lib/basic/Button.svelte';
  import { browser } from '$app/environment';
  import Spinner from '$lib/basic/Spinner.svelte';

  let {
    url,
    header = '',
    footer = '',
    nextPage = '>',
    prevPage = '<',
    weekdayLabels = defaultWeekdayLabels,
    monthLabels = defaultMonthLabels,
    monthHeaderFormat = defaultMonthHeaderFormat,
    numberOfMonth = 12,
    firstMonth = DateTime.utc().month,
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
    firstMonth: MonthNumbers;
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

  let formatFun = $derived(Sqrl.compile(monthHeaderFormat, { useWith: true }));
  const monthHeader = (monthNum: MonthNumbers, year: number): string => {
    const monthLabel = monthLabels[monthNum];
    return formatFun({ month: monthLabel, year }, Sqrl.defaultConfig);
  };

  let prevYear = $derived(DateTime.local(year).minus({ years: 1 }).year);
  let nextYear = $derived(DateTime.local(year).plus({ years: 1 }).year);

  let months: DateTime[] = $derived.by(() => {
    const result = [];
    let fMonth = DateTime.utc(year, firstMonth, 1);
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

  let monthGridTemplateColumns = `[rowLegend] 1fr [d1] 1fr [d2] 1fr [d3] 1fr [d4] 1fr [d5] 1fr [d6] 1fr [d7] 1fr`;

  let monthGridTemplateRows = (m: DateTime): string => {
    let res = `[columnLegend] 1fr [w${m.weekNumber}] 1fr`;
    let n = m.plus({ weeks: 1 });
    for (let w = 1; w <= 5; w++) {
      res += ` [w${n.weekNumber}] 1fr`;
      n = n.plus({ weeks: 1 });
    }
    return res;
  };

  const weeks = (m: DateTime): DateTime[] => {
    let n = m.plus({ weeks: 1 });
    let res: DateTime[] = [m, n];
    for (let i = 1; i <= 4; i++) {
      n = n.plus({ weeks: 1 });
      res.push(n);
    }
    return res;
  };

  const days = (m: DateTime): DateTime[] => {
    //find first
    let firstDay = m.startOf('week');

    //find last
    let lastDayOfMonth = m.endOf('month');
    let lastDay = lastDayOfMonth.endOf('week');

    let n = firstDay.plus({ days: 1 });
    let res: DateTime[] = [firstDay];

    while (n <= lastDay) {
      res.push(n);
      n = n.plus({ days: 1 });
    }

    return res;
  };

  const hiddenWeekNum = (m: DateTime, w: DateTime): boolean => {
    let lastDayOfMonth = m.endOf('month');
    let firstDayOfWeek = w.startOf('week');
    return lastDayOfMonth < firstDayOfWeek;
  };

  let foundOccupationTypes: OccupationType[] = $derived(
    occupationState?.occupations.reduce((res, occupation) => {
      if (!res.includes(occupation.type)) {
        res.push(occupation.type);
      }
      return res;
    }, [] as OccupationType[]),
  );
</script>

{#if !occupationState || occupationState.loading}
  <Spinner />
{/if}

<section class="occuplan-wrapper">
  <header class="occupation-plan-header">
    <div class="left-header-controls">
      {#if prevYear >= minYear}
        <Button text={`${prevPage}`} clicked={prevYearClicked} />
      {/if}
    </div>
    <div class="header-label"><h3>{@html header}</h3></div>
    <div class="right-header-controls">
      {#if nextYear <= maxYear}
        <Button text={`${nextPage}`} clicked={nextYearClicked} />
      {/if}
    </div>
  </header>
  <main>
    {#each months as m (`${m.year}-${m.month}`)}
      <div class="month">
        <header class="month-header">{monthHeader(m.month as MonthNumbers, m.year)}</header>
        <div
          style="
            grid-template-columns: {monthGridTemplateColumns};
            grid-template-rows: {monthGridTemplateRows(m)};
          "
          class="days"
        >
          <div class="weekday-header" style="grid-area: columnLegend / d1 / columnLegend / d1;">
            {weekdayLabels[1]}
          </div>
          <div class="weekday-header" style="grid-area: columnLegend / d2 / columnLegend / d2;">
            {weekdayLabels[2]}
          </div>
          <div class="weekday-header" style="grid-area: columnLegend / d3 / columnLegend / d3;">
            {weekdayLabels[3]}
          </div>
          <div class="weekday-header" style="grid-area: columnLegend / d4 / columnLegend / d4;">
            {weekdayLabels[4]}
          </div>
          <div class="weekday-header" style="grid-area: columnLegend / d5 / columnLegend / d5;">
            {weekdayLabels[5]}
          </div>
          <div class="weekday-header" style="grid-area: columnLegend / d6 / columnLegend / d6;">
            {weekdayLabels[6]}
          </div>
          <div class="weekday-header" style="grid-area: columnLegend / d7 / columnLegend / d7;">
            {weekdayLabels[7]}
          </div>

          {#each days(m) as d (`${d.year}-${d.month}-${d.day}`)}
            <div
              class:weekend={[6, 7].includes(d.weekday)}
              class:other-month={m.month !== d.month}
              class="day"
              style="
                grid-area: w{d.weekNumber} / d{d.weekday} / w{d.weekNumber} / d{d.weekday};
                {occupationState?.occupationStyle(
                { day: d.day, month: d.month as MonthNumbers, year: d.year },
                false,
              )}
                "
            >
              {d.day}
            </div>
          {/each}

          {#each weeks(m) as w (`${w.year}-${w.month}-${w.weekNumber}`)}
            <div
              class:hidden={hiddenWeekNum(m, w)}
              class="week-number"
              style="grid-area: w{w.weekNumber} / rowLegend / w{w.weekNumber} / rowLegend;"
            >
              {w.weekNumber}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </main>
  <footer>
    <div class="legend">
      {#each foundOccupationTypes as t}
        {@const format = occupationTypeFormatting(t)}
        <span>{typeLabels[t]}</span>
        <div
          id="occupation-type-{t}-legend"
          class="legend-entry-marker"
          style="background-color: {format.bgColor};"
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

  .legend-entry-marker {
    outline: var(--occuplan-grid-border);
  }

  .month-header {
    text-align: center;
  }

  .hidden {
    display: none;
  }

  .occupation-plan-header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }

  .header-label {
    text-transform: capitalize;
    font-weight: bold;
    font-variant: small-caps;
  }

  .week-number {
    text-align: left;
    font-style: italic;
    font-weight: lighter;
    background-color: var(--occuplan-bg-color-weeknum);
    color: var(--occuplan-font-color-weeknum);
  }

  .weekday-header {
    text-align: center;
    background-color: var(--occuplan-bg-color-days-header);
    color: var(--occuplan-font-color-days-header);
    grid-area: columnLegend / d1 / columnLegend / d1;
  }

  .day {
    text-align: center;
  }

  .weekend {
    font-weight: bold;
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

  main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: 1rem;
    width: 100%;
  }

  .month {
    display: flex;
    flex-direction: column;
  }

  .days {
    display: grid;
  }

  footer {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
  }

  .legend {
    display: grid;
    grid-template-columns: [label] 1fr [marker] 1rem;
    column-gap: 1rem;
    text-transform: capitalize;
    font-variant: small-caps;
  }
</style>
