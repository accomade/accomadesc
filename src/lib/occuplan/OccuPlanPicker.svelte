<script lang="ts">
  import { DateTime, type MonthNumbers } from 'luxon';
  import * as Sqrl from 'squirrelly';
  import {
    defaultMonthHeaderFormat,
    defaultMonthLabels,
    defaultWeekdayLabels,
    OCCUPATION_STATE,
    OccupationState,
    getOccupationState,
    realFirstMonth,
    type OccuplanTranslations,
  } from '$lib/occuplan/state.svelte.js';
  import { getContext, setContext, untrack } from 'svelte';
  import Button from '$lib/basic/Button.svelte';
  import { browser } from '$app/environment';
  import Spinner from '$lib/basic/Spinner.svelte';
  import { normalizeDate } from '$lib/helpers/normalizeDate.js';

  let {
    url,
    debug = false,
    arrival = undefined,
    leave = undefined,
    nextPage = '>',
    prevPage = '<',
    weekdayLabels = defaultWeekdayLabels,
    monthLabels = defaultMonthLabels,
    monthHeaderFormat = defaultMonthHeaderFormat,
    numberOfMonth = 2,
    maxDate = DateTime.utc().plus({ years: 2 }),
    arrivalLabel = 'From',
    leaveLabel = 'To',
    numberOfNights = 'Nights',
    datePickerDateFormat = 'yyyy-MM-dd',
    showArrival = true,
    showLeave = true,
    typeLabels = {
      one: 'BOOKING',
      two: 'RESERVATION',
      three: 'PERSONAL',
    },
    aborted = () => {
      return;
    },
    dateSelected = () => {
      return;
    },
  }: OccuplanTranslations & {
    url: string;
    debug?: boolean;
    arrival?: DateTime;
    leave?: DateTime;
    showArrival?: boolean;
    showLeave?: boolean;
    numberOfMonth?: number;
    maxDate?: DateTime;
    aborted?: () => void;
    dateSelected?: (arrival: DateTime, leave: DateTime) => void;
  } = $props();

  const oStateID = `i-${url}-${OCCUPATION_STATE}`;
  let occupationState: OccupationState = $state(getContext(oStateID));
  $effect(() => {
    if (!occupationState && browser) {
      occupationState = getOccupationState(url, debug);
      setContext(oStateID, occupationState);
    }
  });

  let formatFun = $derived(Sqrl.compile(monthHeaderFormat, { useWith: true }));
  const monthHeader = (monthNum: MonthNumbers, year: number): string => {
    const monthLabel = monthLabels[monthNum];
    return formatFun({ month: monthLabel, year }, Sqrl.defaultConfig);
  };

  let maxWidth = $derived(`${numberOfMonth * 18}rem`);
  let minDate = $derived(occupationState ? occupationState.firstFree(maxDate) : normalizeDate());

  let page: number = $state(0);
  let rfMonth: DateTime = $derived(
    realFirstMonth(
      (arrival?.month ? arrival.month : minDate.month) as MonthNumbers,
      numberOfMonth,
      page,
    ),
  );
  let currentMaxDate = $derived(rfMonth.plus({ month: numberOfMonth }));

  let months: DateTime[] = $derived.by(() => {
    const result = [];

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

  let requestStart: DateTime | undefined = $state(arrival);
  let requestEnd: DateTime | undefined = $state(leave);
  let earliestStart: DateTime | undefined = $derived(
    occupationState ? occupationState.earliestRequestStart(requestEnd) : undefined,
  );
  let latestEnd: DateTime | undefined = $derived(
    occupationState ? occupationState.latestRequestEnd(maxDate, requestStart) : undefined,
  );
  const requestClicked = (d: DateTime) => {
    if (requestStart) {
      if (requestEnd?.toISO() == d.toISO()) {
        requestEnd = undefined;
        requestedDays = [];
      } else if (requestStart.toISO() == d.toISO()) {
        requestStart = undefined;
        requestEnd = undefined;
        requestedDays = [];
      } else if (d < requestStart) {
        requestStart = d;
      } else {
        requestEnd = d;
      }
    } else {
      requestStart = d;
      requestEnd = undefined;
    }
  };

  let requestedDays: string[] = $state([]);
  $effect(() => {
    if (requestStart && requestEnd) {
      let d = normalizeDate(requestStart);

      untrack(() => (requestedDays = [d.toISO() as string]));
      while (d < requestEnd) {
        d = d.plus({ day: 1 });
        untrack(() => requestedDays.push(d.toISO() as string));
      }
    }
  });

  const requestHovering = (d: DateTime) => {};

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
    let firstDay = normalizeDate(m.startOf('week'));

    //find last
    let lastDayOfMonth = normalizeDate(m.endOf('month'));
    let lastDay = normalizeDate(lastDayOfMonth.endOf('week'));

    let n = firstDay.plus({ days: 1 });
    let res: DateTime[] = [firstDay];

    while (n < lastDay) {
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
</script>

{#if !occupationState || occupationState.loading}
  <Spinner />
{/if}

<div class="wrapper">
  <section class="occuplan-wrapper" style="max-width: {maxWidth}; width: 100%;">
    <header class="occupation-plan-header">
      <div class="header-controls">
        {#if rfMonth >= minDate}
          <Button text={prevPage} clicked={prevClicked} preventDefault={true} />
        {/if}
      </div>
      <div class="header-text">
        {#if requestStart}
          <span class="header-label">{arrivalLabel}:</span>
          <span>{requestStart.toFormat(datePickerDateFormat)}</span>
        {/if}
        {#if requestEnd}
          <span class="header-label">{leaveLabel}:</span>
          <span>{requestEnd.toFormat(datePickerDateFormat)}</span>
        {/if}
        {#if requestStart && requestEnd}
          <span class="header-label">({numberOfNights}: {requestedDays.length - 1})</span>
        {/if}
      </div>
      <div class="header-controls">
        {#if currentMaxDate <= maxDate}
          <Button text={nextPage} clicked={nextClicked} preventDefault={true} />
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
                  maxDate,
                )}
                "
              >
                {#if !occupationState?.dayOccupied(d)}
                  {#if showArrival && occupationState?.endingOccupation(d) && !occupationState.startingOccupation(d)}
                    {#if (earliestStart && earliestStart > d) || (latestEnd && latestEnd < d)}
                      {d.day}
                    {:else}
                      <button
                        class:start={requestStart?.toISO() == d.toISO()}
                        class="request-button"
                        class:request={requestedDays.indexOf(d.toISO() as string) != -1}
                        onclick={(e: Event) => {
                          e.preventDefault();
                          requestClicked(d);
                        }}>{d.day}</button
                      >
                    {/if}
                  {:else if (earliestStart && earliestStart > d) || (latestEnd && latestEnd < d)}
                    {d.day}
                  {:else}
                    <button
                      class:start={requestStart?.toISO() == d.toISO()}
                      class:end={requestEnd?.toISO() == d.toISO()}
                      class:request={requestedDays.includes(d.toISO() as string)}
                      class="request-button"
                      onmouseover={() => requestHovering(d)}
                      onfocus={() => requestHovering(d)}
                      onclick={(e: Event) => {
                        e.preventDefault();
                        requestClicked(d);
                      }}>{d.day}</button
                    >
                  {/if}
                {:else if showLeave && occupationState?.startingOccupation(d) && !occupationState.endingOccupation(d) && requestStart}
                  {#if (earliestStart && earliestStart > d) || (latestEnd && latestEnd < d)}
                    {d.day}
                  {:else}
                    <button
                      class:end={requestEnd?.toISO() == d.toISO()}
                      class:request={requestedDays.includes(d.toISO() as string)}
                      class="request-button"
                      onclick={(e: Event) => {
                        e.preventDefault();
                        requestClicked(d);
                      }}>{d.day}</button
                    >
                  {/if}
                {:else}
                  {d.day}
                {/if}
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
        <span>{typeLabels['one']}</span>
        <div
          class="legend-entry-marker"
          style="background-color: var(--occupation-type-1-bg-color);"
        >
          &nbsp;
        </div>

        <span>{typeLabels['three']}</span>
        <div
          class="legend-entry-marker"
          style="background-color: rgb(from var(--occupation-type-3-bg-color) r g b / 0.2);"
        >
          &nbsp;
        </div>

        <span>{typeLabels['two']}</span>
        <div
          class="legend-entry-marker"
          style="background-color: var(--occupation-type-2-bg-color);"
        >
          &nbsp;
        </div>
      </div>
      <div class="footer-controls">
        <Button
          clicked={(e: Event) => {
            e.preventDefault();
            if (requestStart && requestEnd) dateSelected(requestStart, requestEnd);
          }}
          enabled={!!requestStart && !!requestEnd}
          iconName="save"
          size={2.2}
          stopPropagation={true}
        />
        <Button
          clicked={(e: Event) => {
            e.preventDefault();
            aborted();
          }}
          iconName="abort"
          size={2.2}
          stopPropagation={true}
        />
      </div>
    </footer>
  </section>
</div>

<style>
  .wrapper {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .legend-entry-marker {
    outline: var(--occuplan-grid-border);
    height: 1.1rem;
    width: 1.1rem;
  }

  .footer-controls {
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
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

  .week-number {
    display: flex;
    justify-content: center;
    align-items: center;

    font-style: italic;
    font-weight: lighter;
    background-color: var(--occuplan-bg-color-weeknum);
    color: var(--occuplan-font-color-weeknum);
  }

  .weekday-header {
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--occuplan-bg-color-days-header);
    color: var(--occuplan-font-color-days-header);
    grid-area: columnLegend / d1 / columnLegend / d1;
  }

  .day {
    text-align: center;
    position: relative;
    font-size: 1.15rem;
    padding: 0.2rem;
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
    row-gap: 0.2rem;
    grid-template-columns: [label] 1fr [marker] 1rem;
    column-gap: 1rem;
    text-transform: capitalize;
    font-variant: small-caps;
  }
  .header-controls {
    width: 2rem;
  }

  .header-text {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    font-size: 1.05rem;
    font-weight: bold;
  }

  .header-label {
    font-size: 0.9rem;
    font-weight: normal;
  }

  .request-button {
    line-height: 1.35rem;
    font-size: 1.35rem;
    cursor: pointer;
    box-sizing: border-box;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgb(from var(--occupation-type-3-bg-color) r g b / 0.1);
    color: var(--occupation-type-3-bg-color);
    border: 1px solid rgb(from var(--occupation-type-3-font-color) r g b / 0.1);
  }
  .request-button:hover {
    background-color: var(--occupation-type-3-font-color);
    color: var(--occupation-type-3-bg-color);
    border: 1px solid var(--occupation-type-3-bg-color);
  }

  .request-button.start {
    border: 0.2rem solid var(--accept-font-color);
  }
  .request-button.end {
    border: 0.2rem solid var(--alert-font-color);
  }

  .request-button.request {
    background-color: var(--occupation-type-2-bg-color);
    color: var(--occupation-type-font-bg-color);
  }
</style>
