<script lang="ts">
  import type { Acco } from '$lib/types.js';

  const {
    acco,
  }: {
    acco: Acco;
  } = $props();

  let name = $state('');
  let email = $state('');
  let question = $state('');
</script>

<div class="wrapper"></div>

<style>
</style>
