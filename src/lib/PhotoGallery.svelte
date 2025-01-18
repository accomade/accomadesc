<script lang="ts">
  import Button from '$lib/basic/Button.svelte';
  import PhotoComponent from '$lib/Photo.svelte';
  import type { I18nFacade, Photo, PhotoGalleryContent } from '$lib/types.js';
  import { browser } from '$app/environment';
  import { slide } from 'svelte/transition';

  let { photos, gridPhotoWidth = 300, translateFunc }: PhotoGalleryContent & I18nFacade = $props();

  let landscape = $state(true);
  if (browser) {
    landscape = window.innerWidth > window.innerHeight;
    window.onresize = () => {
      landscape = window.innerWidth > window.innerHeight;
    };
  }
  let ratio = $derived(landscape ? '16/9' : '9/16');
  let galleryContainer: HTMLDivElement | undefined = $state();

  let width = $state(1000);
  let numberOfCols = $derived(
    Math.floor(width / (gridPhotoWidth && Number.isInteger(gridPhotoWidth) ? gridPhotoWidth : 300)),
  );

  let zoomed: number | null = $state(0);
  let zoomedPhoto: Photo | null = $derived(zoomed != null ? photos[zoomed] : null);

  const zoom = (i: number) => {
    zoomed = i;
    setTimeout(() => {
      galleryContainer?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const unzoom = () => {
    zoomed = null;
    setTimeout(() => {
      galleryContainer?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const zoomNext = () => {
    if (zoomed != null) {
      if (zoomed == photos.length - 1) {
        zoomed = 0;
      } else {
        zoomed = zoomed + 1;
      }
    }
  };
  const zoomPrev = () => {
    if (zoomed != null) {
      if (zoomed == 0) {
        zoomed = photos.length - 1;
      } else {
        zoomed = zoomed - 1;
      }
    }
  };
</script>

<div
  bind:this={galleryContainer}
  style="
      grid-template-columns: [firstLine] repeat({numberOfCols}, 1fr) [lastLine];
    "
  class="grid-container"
  bind:clientWidth={width}
>
  {#if zoomed != null && zoomedPhoto != null}
    <div
      transition:slide
      aria-label="resize"
      role="button"
      tabindex="-1"
      onclick={() => unzoom()}
      onkeyup={() => unzoom()}
      class="photo-container complete-row"
    >
      <PhotoComponent {...zoomedPhoto.content} frame={true} {ratio} {translateFunc} />

      <div class="next-wrapper" style="">
        <Button
          text=">"
          size={3.3}
          fontSize="3rem"
          clicked={() => zoomNext()}
          stopPropagation={true}
        />
      </div>
      <div class="prev-wrapper">
        <Button
          text="<"
          size={3.3}
          fontSize="3rem"
          clicked={() => zoomPrev()}
          stopPropagation={true}
        />
      </div>
    </div>
  {/if}

  {#each photos as p, i (p.id)}
    <div
      aria-label="resize"
      role="button"
      tabindex="-1"
      onclick={() => zoom(i)}
      onkeyup={() => zoom(i)}
      class="photo-container"
    >
      <PhotoComponent {...p.content} frame={true} ratio="1" {translateFunc} />
    </div>
  {/each}
</div>

<style>
  .next-wrapper {
    position: absolute;
    right: 1rem;
    top: calc(50% - 1.65rem);

    --bg-button-prim-color: rgba(242, 242, 242, 0.3);
    --main-font-color: rgba(15, 14, 15, 0.6);
  }

  .prev-wrapper {
    position: absolute;
    left: 1rem;
    top: calc(50% - 1.65rem);

    --bg-button-prim-color: rgba(242, 242, 242, 0.3);
    --main-font-color: rgba(15, 14, 15, 0.6);
  }

  .complete-row {
    grid-column-start: firstLine;
    grid-column-end: lastLine;
  }

  .photo-container {
    padding: 0;
    border: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .grid-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
</style>
