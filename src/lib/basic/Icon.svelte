<script lang="ts">
  import { getIcon } from '$lib/basic/icons.js';
  const {
    color = 'var(--icon-color)',
    iconName,
    width,
    height,
  }: {
    color?: string;
    iconName: string;
    width?: string;
    height?: string;
  } = $props();
</script>

<div
  class="icon-wrapper"
  style="
    width: {width}; 
    height: {height};"
>
  {@html getIcon(iconName, color)}
</div>
