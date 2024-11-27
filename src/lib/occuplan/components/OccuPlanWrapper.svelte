<script lang="ts">
  import OccuPlanGrid from "./OccuPlanGrid.svelte";
  import OccuPlanRows from "./OccuPlanRows.svelte";
  import { createEventDispatcher } from 'svelte';
  const dispatchFetchResult = createEventDispatcher<{result: GetEventsResult}>()

  import { getEvents, type GetEventsResult } from '$lib/helpers/readICS';
  import { debounce } from '$lib/helpers/debounce';
  import type { Occupation } from "$lib/types/occupations";
  import type { I18n } from '$lib/types/i18n';
  
  /**
   * Translations
  */
  export let translations:I18n = {
    weekdayLabels: {
      1: 'Mo',
      2: 'Di',
      3: 'Mi',
      4: 'Do',
      5: 'Fr',
      6: 'Sa',
      7: 'So'
    },
    monthLabels: {
      1: 'Jan',
      2: 'Feb',
      3: 'Mär',
      4: 'Apr',
      5: 'Mai',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Okt',
      11: 'Nov',
      12: 'Dez',
    },
    monthHeaderFormat: '{{month}} / {{year}}',
    weekendLabel: 'Wochenende',
    typeNames: {
      defaultOccupationTypeName: 'Belegt',
    }
  }

  export let defaultOccupationType = {
    name: "defaultOccupationTypeName",//translations?.typeNames?.defaultOccupationTypeName ?? "Occupied",
    backgroundColor: 'rgb(33, 158, 188)',
    fontColor: 'rgb(2, 48, 71)',
  }
  /**
   * Styling
   */
  export let style = {
    mainBorder: '1px solid rgb(2, 48, 71)',
    gridBorder: '0.2px solid rgba(2, 48, 71, 0.2)',
    fontColorMain: 'rgb(2, 48, 71)',
    fontColorDays: 'rgb(2, 48, 71)',
    fontColorDayHeaders: 'rgb(2, 48, 71)',
    fontColorMonths: 'rgb(2, 48, 71)',
    fontColorWeekNum: 'rgba(2, 48, 71, 0.5)',
    backgroundHueWeekend: 'rgb(2, 48, 71)',
    backgroundColorDayHeaders: 'rgb(142, 202, 230)',
    backgroundColorWeeknum: 'transparent',
    backgroundColorMonths: 'rgb(142, 202, 230)',
    backgroundColorMain: 'transparent',
    backgroundColorInvalidDays: 'rgba(110,110,110,0.6)',
    buttonStyle: `
      background-color: transparent;
      padding: 0.2rem;
      border: 1px solid rgb(2, 48, 71);
      border-radius: 0.5rem;
      filter: drop-shadow(0 0 0.2rem rgb(2, 48, 71));
    `
  }

  /**
   * Header & Footer
   */

  export let headerContent = 'Belegung';
  export let footerContent = `
    <a 
        style="color: 'rgb(2, 48, 71)'; filter: opacity(0.3);"
        href="https://github.com/accomade/occuplan"
        rel="noreferrer"
        target="_blank">
      Occuplan is OSS
    </a>`;

  //https://accoma.de/ical/?user=81e66599-ac3c-4ad6-b261-fceeb784f9e9&acco=83cd06fd-858d-4e21-994f-325778812713
  //https://popnapdkcdnabruxkjti.supabase.co/storage/v1/object/public/ical/81e66599-ac3c-4ad6-b261-fceeb784f9e9/83cd06fd-858d-4e21-994f-325778812713
  export let calUrl:string;
  export let id = crypto.randomUUID()

  let occupations:Occupation[] = []
  const eventsIncomingCallback = ( o:Occupation ) => {
    occupations = [...occupations, o]
  }
  
  $: {
    if(!calUrl) {
      dispatchFetchResult('result', {
        code: 400,
        message: 'Empty calUrl',
        error: true
      });
    }

    if(!!calUrl) {
      debounce(id, async ():Promise<boolean> => {
        const eventsResult = await getEvents(
          calUrl, eventsIncomingCallback )
        
        dispatchFetchResult('result', eventsResult);
        return !eventsResult.error
      }, {initialDelay: 200, debounceDelay: 5000})
    }
  }

  /*
    use different component based on different media size.
  */
	let w:Number;
	
</script>

<div class="calendar-wrapper" bind:clientWidth={w}>
  {#if w && w.valueOf() > 640}
  <OccuPlanRows {headerContent} {footerContent} {occupations} {...style} i18n={translations} {defaultOccupationType}/>
  {:else}
  <OccuPlanGrid {headerContent} {footerContent} {occupations} {...style} i18n={translations} {defaultOccupationType}/>
  {/if}
</div>

<style>
  .calendar-wrapper {
    min-width: 210px;
    max-width: 820px;
    width: 100%;
  }
</style>
