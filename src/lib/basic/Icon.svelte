<script lang="ts">
  import { getIcon } from '$lib/basic/icons.js';
  const {
    color = 'var(--icon-color)',
    iconName,
    width,
    height,
    filter,
  }: {
    color?: string;
    iconName: string;
    width?: string;
    height?: string;
    filter?: string;
  } = $props();

  const icon = $derived.by(() => {
    console.log('Color changed:', color);
    return getIcon(iconName, color);
  });
</script>

<div
  class="icon-wrapper"
  style="
    width: {width}; 
    height: {height};
    {filter ? `filter: ${filter};` : ''}
    "
>
  {@html icon}
</div>
