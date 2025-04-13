<script>
  import { Button } from '$lib/index.js';
  let x = $state(0);
</script>

<h1>X: {x}</h1>
<Button text="Inc" clicked={() => x++} />

<style>
</style>
