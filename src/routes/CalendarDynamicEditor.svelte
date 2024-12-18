<script lang="ts">
  import TextInput from '$lib/basic/TextInput.svelte';
  import type { FirstMonth } from '$lib/occuplan/state.svelte.ts';

  let {
    toggleGridOffset = $bindable(640),
    gridMonthNumbers = $bindable(6),
    gridFirstMonth = $bindable(0),
    toggleRowsOffset = $bindable(640),
    rowsMonthNumbers = $bindable(12),
    rowsFirstMonth = $bindable(0),
  }: {
    toggleGridOffset?: number;
    gridMonthNumbers?: number;
    gridFirstMonth?: FirstMonth;
    toggleRowsOffset?: number;
    rowsMonthNumbers?: number;
    rowsFirstMonth?: FirstMonth;
  } = $props();

  const gridFirstMonthChanged = (valid: boolean, _: string, value: string | number) => {
    console.log(valid, value);
    if (valid) {
      gridFirstMonth = value as FirstMonth;
    }
  };
  const rowsFirstMonthChanged = (valid: boolean, _: string, value: string | number) => {
    if (valid) {
      rowsFirstMonth = value as FirstMonth;
    }
  };

  const firstMonthValid = (value: string | number): boolean => {
    if (typeof value === 'number') {
      const intValue = value as number;
      return intValue >= 0 && intValue <= 12;
    } else if (value.length > 1) {
      //check + sign
      if (value[0] == '+') {
        const toParse = value.slice(1);
        try {
          const intValue = parseInt(toParse);
          if (intValue >= 0 && intValue <= 12) {
            return true;
          }
        } catch (e) {
          console.log('casting error', e);
        }
        //check - sign
      } else if (value[0] == '-') {
        const toParse = value.slice(1);
        try {
          const intValue = parseInt(toParse);
          if (intValue >= 0 && intValue <= 12) {
            return true;
          }
        } catch (e) {
          console.log('casting error', e);
        }
      }
    }

    try {
      const intValue = parseInt(value);
      if (intValue >= 0 && intValue <= 12) {
        return true;
      }
    } catch (e) {
      console.log('casting error', e);
    }

    return false;
  };
</script>

<div class="component-control">
  <div class="input-wrapper">
    <label>
      Offset Toggle Grid:
      <TextInput marginForMessage={false} type="number" bind:value={toggleGridOffset} />
    </label>
    <label>
      Number of Months in Grid:
      <TextInput marginForMessage={false} type="number" bind:value={gridMonthNumbers} />
    </label>
    <label>
      First Month in Grid:<br />
      <span style="font-size: 0.8rem;">
        (0 = current; +1, +2, ... future month;<br /> -1, -2, ... past month; 1, 2, ... fixed month)</span
      >
      <TextInput
        marginForMessage={false}
        type="text"
        value={gridFirstMonth}
        valueChanged={gridFirstMonthChanged}
        checkValidity={firstMonthValid}
      />
    </label>

    <label>
      Offset Toggle Rows:
      <TextInput marginForMessage={false} type="number" bind:value={toggleRowsOffset} />
    </label>
    <label>
      Number of Months in Rows:
      <TextInput marginForMessage={false} type="number" bind:value={rowsMonthNumbers} />
    </label>
    <label>
      First Month in Rows:<br />
      <span style="font-size: 0.8rem;">
        (0 = current; +1, +2, ... future month;<br /> -1, -2, ... past month; 1, 2, ... fixed month)</span
      >
      <TextInput
        marginForMessage={false}
        type="text"
        value={rowsFirstMonth}
        valueChanged={rowsFirstMonthChanged}
        checkValidity={firstMonthValid}
      />
    </label>
  </div>
</div>

<style>
  .component-control {
    display: flex;
    padding: 1rem;
    flex: 1;
    gap: 1rem;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  label {
    justify-content: space-between;
    display: flex;
  }
</style>
