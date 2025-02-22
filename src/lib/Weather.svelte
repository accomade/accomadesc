<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import type { I18nFacade, WeatherContent } from '$lib/types.js';
  import { randomID } from '$lib/names/gen.ts';

  let { header1, header2, location, translateFunc, currentLang }: WeatherContent & I18nFacade =
    $props();

  const callback = () => {
    //TODO maybe do something here
    // probably build something custom, not using weatherwidget.io
    //console.log("weather script loaded")
    initialLoadDone = true;
  };

  let initialLoadDone = $state(false);
  onMount(() => {
    load(callback);
  });

  const id = `weatherwidget-io-js-${randomID()}`;

  const load = (callback: VoidFunction) => {
    if (browser) {
      const existing = document.getElementById(id);
      if (!existing) {
        const tag = document.createElement('script');
        tag.src = 'https://weatherwidget.io/js/widget.min.js';
        tag.id = id;
        tag.defer = true;
        tag.async = true;
        tag.onload = callback;
        document.body.appendChild(tag);
      } else {
        callback();
      }
    }
  };

  let translatedHeader1 = $state('');
  let translatedHeader2 = $state('');

  $effect(() => {
    if (initialLoadDone) {
      console.log('Translation changed, reloading');
      translatedHeader1 = translateFunc ? translateFunc(header1) : '';
      translatedHeader2 = translateFunc ? translateFunc(header2) : '';
      document.getElementById(id)?.remove();
      load(callback);
    }
  });
</script>

<div class="weather-wrapper">
  <a
    class="weatherwidget-io"
    href="https://forecast7.com/{currentLang ?? 'en'}/{location}"
    data-label_1={translatedHeader1}
    data-label_2={translatedHeader2}
    data-theme="pure"
  >
    {translatedHeader1}
    {translatedHeader2}
  </a>
</div>
