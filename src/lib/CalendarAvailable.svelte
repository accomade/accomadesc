<script lang="ts">
  import { OccuPlanAvailableInfo } from 'occuplan'
  import { DateTime } from 'luxon'
  import { dictEntry } from '$lib/conf/translations';
  import Spinner from '$lib/components/Spinner.svelte';
  import { formatAvailability } from '$lib/conf/formats';

  import { currentLang } from '$lib/stores/lang';
    
  interface Props {
    calUrl: string;
    search?: any;
    maxFutureDate?: any;
  }

  let { calUrl, search = [3,7,14], maxFutureDate = DateTime.now().plus({years: 2}) }: Props = $props();
  let calLoading = $state(true);

  let fromFun = $derived(( from:DateTime|null, forDays:number):string => {
    return formatAvailability($currentLang, from, forDays, maxFutureDate)
  })
</script>

<div class="cal-wrapper">
  <h3>{dictEntry($currentLang, "availability")}</h3>
  <OccuPlanAvailableInfo
      
      { search }
      on:result={ () => calLoading = false }
      { calUrl }
      >

      {#snippet children({ available: av })}
        <ul>
          {#each search as s} 
          <li>{ fromFun( av[s], s) }</li>
          {/each}
        </ul>

          {/snippet}
    </OccuPlanAvailableInfo>
  {#if calLoading}
  <Spinner size="5rem"/>
  {/if}
</div>

<style>
  .cal-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  h3 {
    margin: 0
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    list-style: none;
    font-size: 1.2rem;
  }
</style>