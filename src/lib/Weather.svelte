<script lang="ts">
  import { run } from 'svelte/legacy';

  import { currentLang } from '$lib/stores/lang';
  import { dictEntry } from '$lib/conf/translations';

  import { onMount } from 'svelte';
  import { load } from '$lib/weather';

  interface Props {
    header1: string;
    header2: string;
    location: string;
  }

  let { header1, header2, location }: Props = $props();
  
  const callback = () => {
    //TODO maybe do something here
    // probably build something custom, not using weatherwidget.io, yes maptiler might be good option
    //
    //console.log("weather script loaded")
    initialLoadDone = true;
  }

  let initialLoadDone = $state(false);
  onMount( () => {
    load(callback, window)
  })

  run(() => {
    if(initialLoadDone && $currentLang) {
      document.getElementById('weatherwidget-io-js')?.remove();
      load(callback, window);
    }
  });
</script>

<div class="weather-wrapper">

  <a 
    class="weatherwidget-io" 
    href="https://forecast7.com/{$currentLang}/{location}"
    data-label_1="{dictEntry($currentLang, header1)}"
    data-label_2="{dictEntry($currentLang, header2)}"
    data-theme="pure" >
    {dictEntry($currentLang, header1)} {dictEntry($currentLang, header2)}
  </a>
  
</div>
