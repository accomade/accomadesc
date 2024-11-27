<script lang="ts">

  import { DateTime, type DayNumbers, type MonthNumbers } from 'luxon';
  import type { Occupation, OccupationType } from '$lib/types/occupations.js';
  import type { I18n, MonthLabels } from '$lib/types/i18n.js';
  
  /** Helpers */
  interface DayHelper {
    day: number,
    month: MonthNumbers,
    year: number
  }
  interface DayHelperWithStyle extends DayHelper{
    style: string
  }

  /** Helpers end */


  /** I18n month labels */
  
  export const defaultMonthLabels:MonthLabels = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  }
  export const defaultWeekendLabel:string = "Weekend"

  export let i18n:I18n = {
    monthLabels: defaultMonthLabels,
    monthHeaderFormat: '{{monthName}} / {{year}}',
    typeNames: {
      defaultOccupationTypeName: 'Occupied'
    }
  }
 
  $: monthHeader = ( m:DateTime ) => {
    let monthLabel = defaultMonthLabels[m.month as MonthNumbers];
    if (i18n?.monthLabels) {
      const custMonthLabel = i18n.monthLabels[m.month as MonthNumbers];
      if(!!custMonthLabel) monthLabel = custMonthLabel;
    }
    return monthLabel
  }
  /** I18n end */

  /** Styling */
  export let mainBorder = '1px solid rgb(2, 48, 71)';
  export let gridBorder = '0.2px solid rgba(2, 48, 71, 0.2)';
  export let fontColorMain = 'rgb(2, 48, 71)';
  export let fontColorDayHeaders = 'rgb(2, 48, 71)';//'rgb(251, 133, 0)';
  export let fontColorMonths = 'rgb(2, 48, 71)';//'rgba(2, 48, 71, 0.5)';
  
  export let backgroundHueWeekend = 'rgb(2, 48, 71)';
  export let backgroundColorDayHeaders = 'rgb(142, 202, 230)'//'rgb(33, 158, 188)';
  export let backgroundColorMonths = 'rgb(142, 202, 230)';//'rgb(142, 202, 230)';
  export let backgroundColorMain = 'transparent';//'rgb(142, 202, 230)';
  export let backgroundColorInvalidDays = 'rgba(110,110,110,0.6)';

  export let buttonStyle = `
    background-color: ${backgroundColorMain};
    padding: 0.2rem;
    border: 1px solid ${fontColorMain};
    border-radius: 0.5rem;
    filter: drop-shadow(0 0 0.2rem ${fontColorMain});
  `
  /** Styling end */


  /** Header & Footer */
  export let headerContent = 'occupation plan';
  export let footerContent = `
    <a 
        style="color: ${fontColorMain}; filter: opacity(0.3);"
        href="https://github.com/accomade/occuplan" 
        target="_blank">
      Occuplan is OSS
    </a>`;
  /** Header & Footer end */
  

  /** Date calculations */
  export let year = DateTime.now().startOf("year").year
  export let maxYear = DateTime.local(year).plus({years: 2}).year
  export let minYear = year;

  export let firstMonth = DateTime.now().startOf("year").month

  // 1 => Monday; always Monday. Don't overcomplicate things
  //export let firstDayOfWeek = 1;
  export let numberOfMonth = 12;
  
  $: prevYear = DateTime.local(year).minus({years: 1}).year;
  $: nextYear = DateTime.local(year).plus({years: 1}).year;
  
  let months:DateTime[] = [];
  $: {
    
    
    let fMonth = DateTime.utc(year, firstMonth, 1)
    months = [fMonth];
    
    let nMonth = fMonth.plus({months: 1})
    for (let c = 1; c < numberOfMonth; c++) {
      months.push(nMonth);
      nMonth = nMonth.plus({months: 1})
    }
  }


  const nextYearClicked = () => {
    prevYear = year;
    year = nextYear;
    nextYear++;
  }

  const prevYearClicked = () => {
    nextYear = year;
    year = prevYear;
    prevYear--;
  }

  const monthDays = [...Array(31).keys()].map((i) => i+1);
  $:months = [...Array(numberOfMonth).keys()].map((n) => DateTime.local(year, firstMonth).plus({months: n}));
  
  let days:DayHelperWithStyle[];
  $: {
    days = [];
    for(const m of months) {
      for(let d:DayNumbers = 1; d <= 31; d++) {
        const day:DayHelper = {
          day: d,
          month: m.month as MonthNumbers,
          year: m.year,
        }
        let dayWithStyle = {
          ...day,
          style: occupationStyle(day, occupations)
        }
        days.push(dayWithStyle)
      }
    }
  }
  

  $:monthGridTemplateColumns = monthDays.reduce( (s, d) => {
      s += ` [d${d}] 1fr`;
      return s;
    }, '[rowLegend] 1fr');

  $:monthGridTemplateRows = months.reduce( (s, m) => {
    s += ` [m${m.month}y${m.year}] 1fr`;
    return s;
  }, '[columnLegend] 1fr');
  
  /** Date calculations end */


  /** Occupations */

  /** Occupation Types configuration */
  export let defaultOccupationType: OccupationType = {
    name: 'defaultOccupationTypeName',
    backgroundColor: 'rgb(33, 158, 188)',
    fontColor: 'rgb(2, 48, 71)',
  }

  let occupationTypes:OccupationType[] = [ defaultOccupationType ]
  
  const addType = (t:OccupationType) => {

    const found = occupationTypes.find( (et) => et.name === t.name)
    if(!found) {
      occupationTypes = [...occupationTypes, t]
    }
  }

  /** Occupation Types ... end */


  export let occupations:Occupation[] = [];
  
  const today = DateTime.now()
  const validDay = (d:DayHelper):boolean => {
    const m = DateTime.local(d.year, d.month, d.day)
    if (m < today) {
      return false
    }

    return d.day <= m.endOf("month").day
  }

  const occupied = ( d:DateTime,occupations:Occupation[] ):Occupation|undefined => {
    const startOfDay = d.startOf('day');
    const endOfDay = d.endOf('day')
    return occupations.find( (o) => o.arrival < startOfDay && o.leave > endOfDay)
  }

  const occupationStarts = ( d:DateTime,occupations:Occupation[] ):Occupation|undefined => {
    const startOfDay = d.startOf('day');
    const endOfDay = d.endOf('day')
    return occupations.find( (o) => o.arrival > startOfDay && o.arrival < endOfDay)
  }

  const occupationEnds = ( d:DateTime,occupations:Occupation[] ):Occupation|undefined => {
    const startOfDay = d.startOf('day');
    const endOfDay = d.endOf('day')
    return occupations.find( (o) => o.leave > startOfDay && o.leave < endOfDay)
  }

  const occupationStyle = (d:DayHelper, occupations:Occupation[]):string => {
    const valid = validDay(d)
    if(!valid) {
      return `
        background-color: ${backgroundColorInvalidDays};
        `
    }

    const day = DateTime.local(d.year, d.month, d.day)
    const o = occupied(day, occupations);
    const oStarts = occupationStarts(day, occupations);
    const oEnds = occupationEnds(day, occupations);
    const isWeekend = [6,7].includes(day.weekday)
    
    if(o) {
      let t = defaultOccupationType
      if(o.type) {
        t = o.type;
        addType(t)
      }
      
      if(isWeekend) {
        return `
          background: radial-gradient(${backgroundHueWeekend}, ${t.backgroundColor}, ${t.backgroundColor});
        `
      }
      
      return `
        background-color: ${t.backgroundColor};
      `
    
    }

    if(oEnds && oStarts) {
      let endType = defaultOccupationType
      if(oEnds.type) {
        endType = oEnds.type;
        addType(endType)
      }
      let startType = defaultOccupationType
      if(oStarts.type) {
        startType = oStarts.type;
        addType(startType)
      }

      if(isWeekend) {
        return `
          background: radial-gradient(${backgroundHueWeekend}, ${backgroundColorMain}, ${backgroundColorMain}), linear-gradient(90deg, ${endType.backgroundColor}, ${startType.backgroundColor});
          `
      }      

      return `
        background: linear-gradient(90deg, ${endType.backgroundColor}, ${startType.backgroundColor});
        `
    }
    
    if(oStarts) {
      
      let t = defaultOccupationType
      if(oStarts.type) {
        t = oStarts.type;
        addType(t)
      }

      if(isWeekend) {
        return `
        background: radial-gradient(${backgroundHueWeekend}, ${backgroundColorMain}, ${backgroundColorMain}), linear-gradient(90deg, ${backgroundColorMain}, ${t.backgroundColor});
        `  
      }

      return `
        background: linear-gradient(90deg, ${backgroundColorMain}, ${t.backgroundColor});
        `
    }

    if(oEnds) {
      
      let t = defaultOccupationType
      if(oEnds.type) {
        t = oEnds.type;
        addType(t)
      }

      if(isWeekend) {
        return `
        background: radial-gradient(${backgroundHueWeekend}, ${backgroundColorMain}, ${backgroundColorMain}), linear-gradient(90deg, ${t.backgroundColor}, ${backgroundColorMain});
        `  
      }

      return `
        background: linear-gradient(90deg, ${t.backgroundColor}, ${backgroundColorMain});
        `
    }

    if(isWeekend) {
      return `
        background: radial-gradient(${backgroundHueWeekend}, ${backgroundColorMain}, ${backgroundColorMain});
      `
    }
    
    return `
        background-color: ${backgroundColorMain};
      `
    
  }
  /** Occupations end*/

</script>

<section 
    style="
      border: {mainBorder};
      color: {fontColorMain};
      background-color: {backgroundColorMain};
    "
    class="occuplan-wrapper">
  <header class="occupation-plan-header">
    <div class="left-header-controls">
      {#if prevYear >= minYear}
        <button style={buttonStyle} on:click|preventDefault|stopPropagation={prevYearClicked}>{prevYear}</button>
      {:else}
        <span>&nbsp;</span>
      {/if}
    </div>
    <div class="header-label">{@html headerContent}&nbsp;({year})</div>
    <div class="right-header-controls">
      {#if nextYear <= maxYear}
        <button style={buttonStyle} on:click|preventDefault|stopPropagation={nextYearClicked}>{nextYear}</button>
      {:else}
        <span>&nbsp;</span>
      {/if}
    </div>
  </header>
  <main style="
    grid-template-columns: {monthGridTemplateColumns};
    grid-template-rows: {monthGridTemplateRows};
    ">
    <div style="
      grid-area: columnLegend / rowLegend / columnLegend / rowLegend;
      background-color: {backgroundColorMain};
      ">&nbsp;</div>

    {#each monthDays as d}
      <div class="monthday-header" style="
        outline: {gridBorder};
        background-color: {backgroundColorDayHeaders};
        color: {fontColorDayHeaders};
        grid-area: columnLegend / d{d} / columnLegend / d{d};">{d}</div>
    {/each}

    {#each months as m ( `${m.year}-${m.month}` )}
      <div 
          class="month-label" 
          style="
            outline: {gridBorder};
            color: {fontColorMonths};
            background-color: {backgroundColorMonths};
            grid-area: m{m.month}y{m.year} / rowLegend / m{m.month}y{m.year} / rowLegend;">
        {monthHeader(m)}
      </div>
    {/each}

    {#each days as d ( `${d.year}-${d.month}-${d.day}` )}
      <div 
          class="day"
          style="
            outline: {gridBorder};
            grid-area: m{d.month}y{d.year}  / d{d.day} / m{d.month}y{d.year} / d{d.day};
            {occupationStyle(d, occupations)}
            "
        >
        &nbsp;
      </div>
    {/each}
  </main>
  <footer>
    <div class="legend">
      <span>{i18n.weekendLabel ? i18n.weekendLabel : defaultWeekendLabel}</span>
      <div 
          id="weekend-legend"
          class="legend-entry-marker"
          style="
            outline: {gridBorder};
            background: radial-gradient({backgroundHueWeekend}, {backgroundColorMain}, {backgroundColorMain});
            ">
        &nbsp;
      </div>
      {#each occupationTypes as t}
        <span>{ i18n.typeNames ? i18n.typeNames[t.name] : t.name}</span>
        <div 
            id="occupation-type-{t.name}-legend"
            class="legend-entry-marker"
            style="
              background-color: {t.backgroundColor};
              outline: {gridBorder};
              ">
          &nbsp;
        </div>
      {/each}
    </div> 
    <div class="footer-content">
      {@html footerContent}
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
  }

  .monthday-header {
    text-align: center;
    aspect-ratio: 1;
    display: inline-grid;
    align-content: center;
  
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
