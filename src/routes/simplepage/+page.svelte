<script lang="ts">
  import type { Page as PageI } from '$lib/types.ts';

  import Button from '$lib/basic/Button.svelte';
  import '@fontsource/raleway/500.css';
  import '@fontsource/raleway/700.css';
  import { css as initialCss } from '../css.ts';
  import CssEditor from '../CssEditor.svelte';
  let css = $state(initialCss);
  let styleOpen = $state(false);

  import { installTwicPics } from '@twicpics/components/sveltekit';
  import '@twicpics/components/style.css';
  installTwicPics({
    domain: `https://accomade.twic.pics`,
  });

  import { I18n } from '../I18n.svelte.ts';
  const i18n = new I18n();

  import Page from '$lib/Page.svelte';

  const ACCOMADE_USER_ID = 'template1';
  const PUBLIC_SUPABASE_URL = 'https://ipajhcabityibeaqfzju.supabase.co';
  const logoLink = `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/users/${ACCOMADE_USER_ID}/logo.svg`;

  const p: PageI = {
    id: 'someid',
    path: '/simplepage',
  };
</script>

<div class="wrapper">
  <h3>
    Colors And Styles &nbsp;{#if styleOpen}<Button
        clicked={() => (styleOpen = !styleOpen)}
        text="Close"
      />{:else}<Button clicked={() => (styleOpen = !styleOpen)} text="Show" />{/if}
  </h3>
  {#if styleOpen}
    <div>
      <CssEditor bind:css />
    </div>
  {/if}
</div>

<div style={css}>
  <Page {...p} {...i18n} />
</div>
