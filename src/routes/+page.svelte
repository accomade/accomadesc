<script>
  import { Button } from '$lib/index.js';
  import { css } from './css.ts';
  let x = $state(0);
</script>

<div class="wrapper" style={css}>
  <h1>X: {x}</h1>

  <Button text="Inc" clicked={() => x++} />
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
