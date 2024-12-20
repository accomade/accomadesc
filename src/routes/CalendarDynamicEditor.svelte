<script lang="ts">
  import TextInput from '$lib/basic/TextInput.svelte';
  import { firstMonthValid, type FirstMonth } from '$lib/occuplan/state.svelte.ts';

  let {
    toggleGridOffset = $bindable(640),
    gridMonthNumbers = $bindable(6),
    gridFirstMonth = $bindable(0),
    gridMaxWidth = $bindable('1200px'),
    toggleRowsOffset = $bindable(640),
    rowsMonthNumbers = $bindable(12),
    rowsFirstMonth = $bindable(0),
    rowsMaxWidth = $bindable('1200px'),
  }: {
    toggleGridOffset?: number;
    gridMonthNumbers?: number;
    gridFirstMonth?: FirstMonth;
    gridMaxWidth?: string;
    toggleRowsOffset?: number;
    rowsMonthNumbers?: number;
    rowsFirstMonth?: FirstMonth;
    rowsMaxWidth?: string;
  } = $props();

  const gridFirstMonthChanged = (valid: boolean, _: string, value: string | number) => {
    if (valid) {
      gridFirstMonth = value as FirstMonth;
    }
  };
  const rowsFirstMonthChanged = (valid: boolean, _: string, value: string | number) => {
    if (valid) {
      rowsFirstMonth = value as FirstMonth;
    }
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
      Grid Max Width:
      <TextInput type="text" bind:value={gridMaxWidth} />
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
    <label>
      Rows Max Width:
      <TextInput type="text" bind:value={rowsMaxWidth} />
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
