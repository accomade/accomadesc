<script lang="ts">
  import { DateTime, type DayNumbers, type MonthNumbers } from 'luxon';
  import { getContext, setContext } from 'svelte';
  import {
    defaultMonthHeaderFormat,
    defaultMonthLabels,
    defaultWeekdayLabels,
    defaultWeekendLabel,
    OCCUPATION_STATE,
    OccupationState,
    occupationTypeFormatting,
    occupationTypeFormattingByOccupation,
    type OccupationType,
    type OccuplanTranslations,
  } from './state.svelte.ts';
  import Button from '$lib/basic/Button.svelte';

  /** Helpers */
  interface DayHelper {
    day: number;
    month: MonthNumbers;
    year: number;
  }
  interface DayHelperWithStyle extends DayHelper {
    style: string;
  }
  /** Helpers end */

  let {
    url,
    header = '',
    footer = '',
    weekendLabel = defaultWeekendLabel,
    monthLabels = defaultMonthLabels,
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
  let occupationState: OccupationState = getContext(oStateID);
  if (!occupationState) {
    occupationState = new OccupationState(url);
    setContext(oStateID, occupationState);
  }

  const monthHeader = (monthNum: MonthNumbers): string => {
    return monthLabels[monthNum];
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

  const monthDays = [...Array(31).keys()].map((i) => i + 1);

  let days: DayHelperWithStyle[] = $derived.by(() => {
    let days = [];
    for (const m of months) {
      for (let d: DayNumbers = 1; d <= 31; d++) {
        const day: DayHelper = {
          day: d,
          month: m.month as MonthNumbers,
          year: m.year,
        };
        let dayWithStyle = {
          ...day,
          style: occupationStyle(day),
        };
        days.push(dayWithStyle);
      }
    }
    return days;
  });

  let monthGridTemplateColumns = $derived(
    monthDays.reduce((s, d) => {
      s += ` [d${d}] 1fr`;
      return s;
    }, '[rowLegend] 1fr'),
  );

  let monthGridTemplateRows = $derived(
    months.reduce((s, m) => {
      s += ` [m${m.month}y${m.year}] 1fr`;
      return s;
    }, '[columnLegend] 1fr'),
  );

  const today = DateTime.now();
  const validDay = (d: DayHelper): boolean => {
    const m = DateTime.local(d.year, d.month, d.day);
    if (m < today) {
      return false;
    }

    return d.day <= m.endOf('month').day;
  };

  const occupationStyle = (d: DayHelper): string => {
    const valid = validDay(d);
    if (!valid) {
      return 'background-color: var(--occuplan-bg-color-invalid-days);';
    }

    const day = DateTime.local(d.year, d.month, d.day);

    const o = occupationState.fullOccupation(day);
    const oStarts = occupationState.startingOccupation(day);
    const oEnds = occupationState.endingOccupation(day);
    const isWeekend = [6, 7].includes(day.weekday);

    if (o) {
      const f = occupationTypeFormattingByOccupation(o);
      if (isWeekend) {
        return `
          background: radial-gradient(var(--occuplan-bg-color-weekend), ${f.bgColor}, ${f.bgColor});
        `;
      }

      return `
        background-color: ${f.bgColor};
      `;
    }

    if (oEnds && oStarts) {
      const sf = occupationTypeFormattingByOccupation(oStarts);
      const ef = occupationTypeFormattingByOccupation(oEnds);

      if (isWeekend) {
        return `
          background: radial-gradient(var(--occuplan-bg-color-weekend), var(--occuplan-bg-color-main), var(--occuplan-bg-color-main)), linear-gradient(90deg, ${ef.bgColor}, ${sf.bgColor});
          `;
      }

      return `
        background: linear-gradient(90deg, ${ef.bgColor}, ${sf.bgColor});
        `;
    }

    if (oStarts) {
      const sf = occupationTypeFormattingByOccupation(oStarts);

      if (isWeekend) {
        return `
        background: radial-gradient( var(--occuplan-bg-color-weekend), var(--occuplan-bg-color-main), var(--occuplan-bg-color-main)), linear-gradient(90deg, var(--occuplan-bg-color-main), ${sf.bgColor});
        `;
      }

      return `
        background: linear-gradient(90deg, var(--occuplan-bg-color-main), ${sf.bgColor});
        `;
    }

    if (oEnds) {
      const ef = occupationTypeFormattingByOccupation(oEnds);

      if (isWeekend) {
        return `
        background: radial-gradient( var(--occuplan-bg-color-weekend), var(--occuplan-bg-color-main), var(--occuplan-bg-color-main)), linear-gradient(90deg, ${ef.bgColor}, var(--occuplan-bg-color-main));
        `;
      }

      return `
        background: linear-gradient(90deg, ${ef.bgColor}, var(--occuplan-bg-color-main));
        `;
    }

    if (isWeekend) {
      return `
        background: radial-gradient(var(--occuplan-bg-color-weekend), var(occuplan-bg-color-main), var(occupln-bg-color-main));
      `;
    }

    return `
        background-color: var(--occuplan-bg-color-main);
      `;
  };

  let foundOccupationTypes: OccupationType[] = $derived(
    occupationState.occupations.reduce((res, occupation) => {
      if (!res.includes(occupation.type)) {
        res.push(occupation.type);
      }
      return res;
    }, [] as OccupationType[]),
  );
</script>

<section class="occuplan-wrapper">
  <header class="occupation-plan-header">
    <div class="left-header-controls">
      {#if prevYear >= minYear}
        <Button text={`${prevYear}`} clicked={prevYearClicked} />
        >
      {:else}
        <span>&nbsp;</span>
      {/if}
    </div>
    <div class="header-label">{@html header}&nbsp;({year})</div>
    <div class="right-header-controls">
      {#if nextYear <= maxYear}
        <Button text={`${nextYear}`} clicked={nextYearClicked} />
      {:else}
        <span>&nbsp;</span>
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
      style="
      grid-area: columnLegend / rowLegend / columnLegend / rowLegend;
      background-color: var(--occuplan-bg-color-main);
      "
    >
      &nbsp;
    </div>

    {#each monthDays as d}
      <div class="monthday-header" style="grid-area: columnLegend / d{d} / columnLegend / d{d};">
        {d}
      </div>
    {/each}

    {#each months as m (`${m.year}-${m.month}`)}
      <div
        class="month-label"
        style="grid-area: m{m.month}y{m.year} / rowLegend / m{m.month}y{m.year} / rowLegend;"
      >
        {monthLabels[m.month as MonthNumbers]};
      </div>
    {/each}

    {#each days as d (`${d.year}-${d.month}-${d.day}`)}
      <div
        class="day"
        style="
            outline: var(--occuplan-grid-border);
            grid-area: m{d.month}y{d.year}  / d{d.day} / m{d.month}y{d.year} / d{d.day};
            {occupationStyle(d)}
            "
      >
        &nbsp;
      </div>
    {/each}
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
    max-width: 44rem;
  }

  .month-label {
    display: flex;
    align-items: center;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    outline: var(--occuplan-grid-border);
    color: var(--occuplan-font-color-months);
    background-color: var(--occuplan-bg-color-month);
  }

  .monthday-header {
    text-align: center;
    aspect-ratio: 1;
    display: inline-grid;
    align-content: center;
    outline: var(--occuplan-grid-border);
    background-color: var(--occuplan-bg-color-days-header);
    color: var(--occuplan-font-color-days-header);
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
