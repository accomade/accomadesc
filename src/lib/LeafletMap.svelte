<script lang="ts">
  import type { MapOptions, Map } from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  // Bundlers break leaflet's automatic marker-image path detection (it scans
  // for a leaflet script/link tag), so markers 404 as relative
  // `marker-icon.png` (P23 on the published site). Pin the bundled URLs.
  // Build the icon with `L.icon` rather than `Icon.Default.mergeOptions`:
  // the default icon prepends its auto-detected `imagePath` to `iconUrl`,
  // which doubles these already-resolved URLs in dev:
  //   /node_modules/.../images//node_modules/.../images/marker-icon-2x.png
  import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
  import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
  import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

  import { onMount, onDestroy } from 'svelte';
  import type { LeafletMapContent } from '#lib/types.js';

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
    const markerIcon = L.icon({
      iconUrl: markerIconUrl,
      iconRetinaUrl: markerIconRetinaUrl,
      shadowUrl: markerShadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });

    if (mapElement) {
      theMap = L.map(mapElement, options);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(theMap);
      L.marker([lat, long], { icon: markerIcon }).addTo(theMap);
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
  div.wrapper {
    width: 100%;
    position: relative;
    background-color: var(--main-bg-color);
  }
  div.nav-floater {
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
  div.map {
    width: 100%;
    min-height: 60vh;
  }
</style>
