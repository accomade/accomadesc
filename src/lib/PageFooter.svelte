<script lang="ts">
  import type { Nav, I18nFacade } from '$lib/types.js';
  import NavItem from '$lib/NavItem.svelte';

  let { nav, translateFunc, currentLang }: { nav: Nav } & I18nFacade = $props();
</script>

<footer>
  <div class="nav">
    {#each nav.footer as n}
      <div class="link-wrapper">
        <NavItem {n} {currentLang} {translateFunc} />
      </div>
    {/each}
  </div>
  <div class="content">
    {@html translateFunc ? translateFunc('footer_html') : ''}
  </div>
</footer>

<style>
  .nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    flex-grow: 3;
  }
  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: right;
  }

  .content :global(*) {
    background-color: var(--footer-bg-color);
    color: var(--footer-font-color);
  }

  .link-wrapper {
    text-decoration: underline;
    font-family: var(--nav-font-family, 'mono');
    font-variant: var(--nav-font-variant, 'normal');
    font-size: 1.4rem;
    font-weight: bold;

    display: flex;
    align-items: center;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    color: var(--footer-font-color);
    background-color: var(--footer-bg-color);
    margin-top: 1rem;
    width: 100%;

    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    min-height: 5rem;
    * {
      color: var(--nav-font-color);
    }
  }

  @media (max-width: 500px) {
    .nav {
      flex-direction: row;
      justify-content: left;
    }
  }
</style>
