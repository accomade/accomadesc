<script lang="ts">
  import PhotoComponent from './Photo.svelte';
  import type { I18nFacade, Photo, PhotoGalleryContent, GridPhoto } from './types.js';
  import { browser } from '$app/environment';
  import { randomID } from './names/gen.js';

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
  let gridPhotos: GridPhoto[] = $state([]);

  $effect(() => {
    if (photos) {
      gridPhotos = photos.map((p: Photo): GridPhoto => {
        return {
          photo: p,
          zoomed: false,
          id: randomID(),
        };
      });
    }
  });

  let width = $state(1000);
  let numberOfCols = $derived(
    Math.floor(width / (gridPhotoWidth && Number.isInteger(gridPhotoWidth) ? gridPhotoWidth : 300)),
  );

  const zoom = (z: GridPhoto, i: number) => {
    let unzoom = false;
    if (z.zoomed) {
      unzoom = true;
    }

    gridPhotos.forEach((p: GridPhoto) => (p.zoomed = false));
    gridPhotos.splice(i, 1);

    if (!unzoom) {
      z.zoomed = true;
    }
    gridPhotos = [z, ...gridPhotos];

    setTimeout(() => {
      galleryContainer?.scrollIntoView();
    }, 100);
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
  {#each gridPhotos as p, i (p.id)}
    <div
      class:complete-row={p.zoomed}
      aria-label="resize"
      role="button"
      tabindex="-1"
      onclick={() => zoom(p, i)}
      onkeyup={() => zoom(p, i)}
      class="photo-container"
    >
      <PhotoComponent
        {...p.photo.content}
        frame={true}
        ratio={p.zoomed ? ratio : '1'}
        {translateFunc}
      />
    </div>
  {/each}
</div>

<style>
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
  }

  .grid-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
</style>
