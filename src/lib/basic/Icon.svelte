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
</script>

<div
  class="icon-wrapper"
  style="
    width: {width}; 
    height: {height};
    {filter ? `filter: ${filter};` : ''}
    "
>
  {@html getIcon(iconName, color)}
</div>
