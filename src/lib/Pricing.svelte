<script lang="ts">
  import { DateTime } from 'luxon';
  import type {
    PricingContent,
    PricingRange,
    I18nFacade,
    StaticPricingRange,
    PricingEntry,
    PricingColumn,
  } from './types.ts';
  import type { Dinero, DineroSnapshot } from 'dinero.js';

  let filteredRanges: PricingRange[] = $state([]);
  let {
    global,
    ranges = [],
    entries = [],
    staticRanges = [],
    columns = [],
    footnote = '',
    translateFunc,
    formatDateFunc,
    formatMoneyFunc,
    formatFunc,
    currentLang,
  }: PricingContent & I18nFacade = $props();

  if (!ranges && entries) {
    ranges = entries;
  }

  const colHeaderStyle: Record<PricingColumn, string> = {
    timeRange: 'width: 20%;',
    firstNight: 'width: 12%',
    eachNight: 'width: 12%',
    peopleNum: 'width: 9%',
    extraPerson: 'width: 35%',
    minNumNights: 'width: 12%',
  };

  const colCellStyle: Record<PricingColumn, string> = {
    timeRange: 'text-align:center;',
    firstNight: 'text-align:right;',
    eachNight: 'text-align:right;',
    peopleNum: 'text-align:center;',
    extraPerson: 'text-align:left;',
    minNumNights: 'text-align:right;',
  };

  const formatAdditionalPersonPrice = (
    price: Dinero<number> | DineroSnapshot<number>,
    termsRef: string | undefined,
  ): string => {
    if (formatFunc && translateFunc) {
      let terms = '';
      if (termsRef) terms = translateFunc(termsRef);
      return formatFunc('additionalPersonPrice', {
        price,
        terms,
      });
    }
    return '';
  };

  const formatRangeCol = (range: PricingRange): string => {
    let result = '';
    if (!formatFunc) return result;
    if (range.from && range.to) {
      result = formatFunc('rangeFromTo', { from: range.from, to: range.to });
    } else if (range.from) {
      result = formatFunc('rangeFrom', { from: range.from });
    } else if (range.to) {
      result = formatFunc('rangeTo', { to: range.to });
    }
    return result;
  };

  const formatStaticRangeCol = (range: StaticPricingRange): string => {
    let result = '';
    if (!formatFunc) return result;

    if (range.from && range.to) {
      result = formatFunc('staticRangeFromTo', { from: range.from, to: range.to });
    } else if (range.from) {
      result = formatFunc('staticRangeFrom', { from: range.from });
    } else if (range.to) {
      result = formatFunc('staticRangeTo', { to: range.to });
    }

    return result;
  };

  const formatFirstNightPriceCol = (entry: PricingEntry): string => {
    let result = '';
    if (!formatDateFunc || !translateFunc || !formatMoneyFunc || !formatFunc) return result;
    if (entry.firstNightPrice) {
      result = formatMoneyFunc(entry.firstNightPrice);
    } else {
      result = formatMoneyFunc(entry.perNightPrice);
    }

    return result;
  };

  const formatEachNightCol = (entry: PricingEntry): string => {
    let result = '';
    if (!formatMoneyFunc) return result;
    result = formatMoneyFunc(entry.perNightPrice);
    return result;
  };

  const formatExtraPersonCol = (entry: PricingEntry): string => {
    let result = '<div style="display:flex; column-gap: 2rem; padding-left:1rem;flex-wrap: wrap;">';

    if (entry.additionalPersonPrice1) {
      result += `<span>${formatAdditionalPersonPrice(entry.additionalPersonPrice1, entry.additionalPersonText1)}</span>`;
    }
    if (entry.additionalPersonPrice2) {
      result += `<span>${formatAdditionalPersonPrice(entry.additionalPersonPrice2, entry.additionalPersonText2)}</span>`;
    }
    if (entry.additionalPersonPrice3) {
      result += `<span>${formatAdditionalPersonPrice(entry.additionalPersonPrice3, entry.additionalPersonText3)}</span>`;
    }
    result += '</div>';

    return result;
  };

  const formatMinNightsCol = (entry: PricingEntry): string => {
    let result = '';
    if (!formatFunc) return result;
    result = formatFunc('minNumberOfNights', { num: entry.minNumberOfNights ?? 0 });
    return result;
  };

  const formatPeopleNum = (entry: PricingEntry): string => {
    let result = '';
    if (!formatFunc) return result;
    result = formatFunc('numberOfGuests', {
      base: entry.numberOfGuestsBase,
      max: entry.numberOfGuestsMax,
    });
    return result;
  };

  const colOutputRange = (range: PricingRange, col: PricingColumn): string => {
    let result = '';
    if (!formatDateFunc || !translateFunc || !formatMoneyFunc || !formatFunc) return result;

    const entry = range.entry;
    switch (col) {
      case 'timeRange':
        result = formatRangeCol(range);
        break;
      case 'firstNight':
        result = formatFirstNightPriceCol(entry);
        break;
      case 'eachNight':
        result = formatEachNightCol(entry);
        break;
      case 'extraPerson':
        result = formatExtraPersonCol(entry);
        break;
      case 'minNumNights':
        result = formatMinNightsCol(entry);
        break;
      case 'peopleNum':
        result = formatPeopleNum(entry);
        break;
    }
    return result;
  };

  const colOutputStaticRange = (range: StaticPricingRange, col: PricingColumn): string => {
    let result = '';
    if (!formatDateFunc || !translateFunc || !formatMoneyFunc || !formatFunc) return result;

    const entry = range.entry;
    switch (col) {
      case 'timeRange':
        result = formatStaticRangeCol(range);
        break;
      case 'firstNight':
        result = formatFirstNightPriceCol(entry);
        break;
      case 'eachNight':
        result = formatEachNightCol(entry);
        break;
      case 'extraPerson':
        result = formatExtraPersonCol(entry);
        break;
      case 'minNumNights':
        result = formatMinNightsCol(entry);
        break;
      case 'peopleNum':
        result = formatPeopleNum(entry);
        break;
    }
    return result;
  };

  let w: number = $state(801);
  $effect(() => {
    let now = DateTime.utc();
    filteredRanges = ranges.filter((e) => {
      if (!e.to) return true;

      const pTo = DateTime.fromISO(e.to);
      return pTo > now;
    });
  });
</script>

{#snippet wideTableHead()}
  <thead>
    <tr>
      {#each columns as h}
        <th scope="col" style={colHeaderStyle[h]}>
          {@html translateFunc ? translateFunc(h) : h}:
        </th>
      {/each}
    </tr>
  </thead>
{/snippet}

{#key currentLang}
  <figure bind:clientWidth={w} class="pricing-wrapper">
    {#if global}
      <table class="pricing-table-global">
        <thead>
          <tr>
            <th>{translateFunc ? translateFunc('globalPricing') : 'GLOBAL'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {#if global.firstNightPrice}
                <strong>
                  {@html translateFunc ? translateFunc('firstNight') : 'firstNight'}:
                </strong>
                {@html formatFirstNightPriceCol(global)}
              {/if}
              {#if global.perNightPrice}
                <strong>
                  {@html translateFunc ? translateFunc('eachNight') : 'eachNight'}:
                </strong>
                {@html formatEachNightCol(global)}
              {/if}
              {#if global.additionalPersonPrice1}
                <br />
                <hr />
                <strong>
                  {@html translateFunc ? translateFunc('extraPerson') : 'extraPerson'}:
                </strong>
                {@html formatExtraPersonCol(global)}
              {/if}
              {#if global.minNumberOfNights}
                <br />
                <hr />
                <strong>
                  {@html translateFunc ? translateFunc('minNumNights') : 'minNumNights'}:
                </strong>
                {@html formatMinNightsCol(global)}
              {/if}
            </td>
          </tr>
        </tbody>
      </table>
    {/if}
    {#if staticRanges.length > 0}
      {#if w > 799}
        <table class="pricing-table">
          {@render wideTableHead()}
          <tbody>
            {#each staticRanges as e}
              <tr>
                {#each columns as h}
                  <td style={colCellStyle[h]}>
                    {@html colOutputStaticRange(e, h)}
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      {:else if w > 400 && w < 800}
        <table class="pricing-table">
          {#each staticRanges as e}
            <thead>
              <tr>
                <th colspan="2" scope="col">
                  {@html colOutputStaticRange(e, 'timeRange')}
                </th>
              </tr>
            </thead>
            <tbody>
              {#each columns as h}
                {#if h !== 'timeRange'}
                  <tr>
                    <th scope="row">
                      {@html translateFunc ? translateFunc(h) : ''}:
                    </th>
                    <td>
                      {@html colOutputStaticRange(e, h)}
                    </td></tr
                  >
                {/if}
              {/each}
            </tbody>
          {/each}
        </table>
      {:else}
        <table class="pricing-table">
          {#each staticRanges as e}
            <thead>
              <tr>
                <th scope="col" class="main-header">
                  {@html colOutputStaticRange(e, 'timeRange')}
                </th>
              </tr>
            </thead>
            <tbody>
              {#each columns as h}
                {#if h !== 'timeRange'}
                  <tr>
                    <th scope="row">
                      {@html translateFunc ? translateFunc(h) : h}:
                    </th>
                  </tr>
                  <tr>
                    <td>
                      {@html colOutputStaticRange(e, h)}
                    </td>
                  </tr>
                {/if}
              {/each}
            </tbody>
          {/each}
        </table>
      {/if}
    {/if}
    {#if filteredRanges.length > 0}
      {#if w > 799}
        <table class="pricing-table">
          {@render wideTableHead()}
          <tbody>
            {#each filteredRanges as e}
              <tr>
                {#each columns as h}
                  <td style={colCellStyle[h]}>
                    {@html colOutputRange(e, h)}
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      {:else if w > 400 && w < 800}
        <table class="pricing-table">
          {#each filteredRanges as e}
            <thead>
              <tr>
                <th colspan="2" scope="col">
                  {@html colOutputRange(e, 'timeRange')}
                </th>
              </tr>
            </thead>
            <tbody>
              {#each columns as h}
                {#if h !== 'timeRange'}
                  <tr>
                    <th scope="row">
                      {@html translateFunc ? translateFunc(h) : ''}:
                    </th>
                    <td>
                      {@html colOutputRange(e, h)}
                    </td></tr
                  >
                {/if}
              {/each}
            </tbody>
          {/each}
        </table>
      {:else}
        <table class="pricing-table">
          {#each filteredRanges as e}
            <thead>
              <tr>
                <th scope="col" class="main-header">
                  {@html colOutputRange(e, 'timeRange')}
                </th>
              </tr>
            </thead>
            <tbody>
              {#each columns as h}
                {#if h !== 'timeRange'}
                  <tr>
                    <th scope="row">
                      {@html translateFunc ? translateFunc(h) : h}:
                    </th>
                  </tr>
                  <tr>
                    <td>
                      {@html colOutputRange(e, h)}
                    </td>
                  </tr>
                {/if}
              {/each}
            </tbody>
          {/each}
        </table>
      {/if}
    {/if}

    {#if footnote}
      <table>
        <tfoot>
          <tr>
            <td>
              {@html translateFunc ? translateFunc(footnote) : ''}
            </td>
          </tr>
        </tfoot>
      </table>
    {/if}
  </figure>
{/key}

<style>
  figure {
    width: 100%;
    margin: 0;
    border: var(--main-border);
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .pricing-table-global td {
    padding: 1.5rem;
  }

  th {
    text-overflow: ellipsis;
    overflow: clip;
    letter-spacing: 2px;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  td {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-right: 1rem;
    padding-left: 0.2rem;
  }

  @media (max-width: 400px) {
    td {
      text-align: center;
    }
  }

  thead {
    background-color: var(--table-header-bg-color);
    color: var(--table-header-font-color);
    :global(*) {
      background-color: var(--table-header-bg-color);
      color: var(--table-header-font-color);
    }
  }

  tfoot {
    background-color: var(--table-footer-bg-color);
    color: var(--table-footer-font-color);
    :global(*) {
      background-color: var(--table-footer-bg-color);
      color: var(--table-footer-font-color);
    }
  }

  tfoot td {
    padding: 1rem;
  }

  tbody tr:nth-child(odd) {
    background-color: var(--table-bg-color-odd, white);
    color: var(--table-font-color-odd, black);
    :global(*) {
      background-color: var(--table-bg-color-odd, white);
      color: var(--table-font-color-odd, black);
    }
  }

  tbody tr:nth-child(even) {
    background-color: var(--table-bg-color-even, black);
    color: var(--table-font-color-even, white);
    :global(*) {
      background-color: var(--table-bg-color-even, black);
      color: var(--table-font-color-even, white);
    }
  }

  .main-header {
    font-weight: bolder;
  }
</style>
