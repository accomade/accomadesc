<script lang="ts">
  let {
    css = $bindable(),
  }: {
    css: string;
  } = $props();
</script>

<pre
  spellcheck="false"
  contenteditable
  bind:textContent={css}
  style="height: 100%; padding: 1rem; width: 100%; border: 1px solid red; border-radius: 1rem;">
  {css}
</pre>
