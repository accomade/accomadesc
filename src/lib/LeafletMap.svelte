<script lang="ts">
  import type { MapOptions, Map } from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet/dist/images/marker-shadow.png';
  import 'leaflet/dist/images/marker-icon.png';

  import { onMount, onDestroy } from 'svelte';
  import type { LeafletMapContent } from './types/blocks.ts';

  let { lat, long, zoom, address = 'Achterstr. 4, 17459 Koserow' }: LeafletMapContent = $props();

  let theMap: Map | undefined = $state();
  let mapElement: HTMLElement | undefined = $state();

  let gMapsNavURL = $derived(
    `https://www.google.com/maps/dir//${encodeURIComponent(address)}/@${lat},${long},${zoom - 6}z/`,
  );

  onMount(async () => {
    const options: MapOptions = {
      center: [lat, long],
      zoom: zoom,
      preferCanvas: true,
    };
    const leafletModule = await import('leaflet');
    const L = leafletModule.default;

    if (mapElement) {
      theMap = L.map(mapElement, options);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(theMap);
      L.marker([lat, long]).addTo(theMap);
    }
  });

  $effect(() => {
    if (theMap) {
      theMap.setView([lat, long]);
      theMap.setZoom(zoom);
    }
  });

  onDestroy(() => {
    theMap?.remove();
    theMap = undefined;
  });
</script>

<div class="wrapper">
  <div class="map" bind:this={mapElement}></div>

  <div class="nav-floater">
    <a href={gMapsNavURL} rel="noreferrer noopener" target="_blank">{address}</a>
  </div>
</div>

<style>
  .wrapper {
    width: 100%;
    position: relative;
  }
  .nav-floater {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 998;
    padding: 1rem;
    color: var(--picture-link-font-color);
    background-color: var(--picture-link-bg-color);
  }
  a {
    color: var(--picture-link-font-color);
  }
  .map {
    width: 100%;
    min-height: 60vh;
  }
</style>

