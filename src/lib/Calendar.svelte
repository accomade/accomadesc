<script lang="ts">
  import { OccuPlanWrapper } from 'occuplan';
  import { dictEntry, i18n } from '$lib/conf/translations';
  import Spinner from '$lib/components/Spinner.svelte';

  import { currentLang } from '$lib/stores/lang';
  let calendar = $derived(i18n.translations[$currentLang].calendar);
    
  interface Props {
    calUrl: string;
  }

  let { calUrl }: Props = $props();
  let calLoading = $state(true);

</script>

<div class="cal-wrapper">
  {#if calLoading}
    <Spinner />
  {/if}
  <OccuPlanWrapper 
    on:result={ () => calLoading = false }
    { calUrl } 
    headerContent={dictEntry($currentLang, "calendarHeader")}
    translations={calendar}
    />
</div>

<style>
  .cal-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
  }
</style>