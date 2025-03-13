<script lang="ts">
  import { randomID } from '$lib/names/gen.js';

  let {
    id = randomID(),
    disabled,
    changed,
  }: {
    id?: string;
    disabled: boolean;
    changed: (value: string) => void;
  } = $props();

  let divElement: HTMLDivElement;

  const contentChanged = (e: Event) => {
    const target = e.currentTarget as HTMLDivElement;
    changed(target.getHTML());
  };

  $effect(() => {
    if (disabled) {
      divElement.innerText = '';
    }
  });
</script>

<div
  bind:this={divElement}
  class:disabled
  id="input-{id}"
  contenteditable={disabled ? null : 'plaintext-only'}
  class="question-input"
  oninput={contentChanged}
></div>

<style>
  div.question-input {
    position: relative;

    min-width: 400px;
    width: 100%;
    max-width: 800px;
    min-height: 5rem;
    height: 100%;

    border: none;
    /*border: var(--main-border);*/
    /*border-radius: 1rem;*/

    background-color: var(--notes-bg-color);
    color: var(--notes-font-color);

    padding-left: 1.3rem;
    padding-right: 1.3rem;
    padding-top: 0.5rem;

    line-height: 24px;

    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' height='24' width='24'><line x1='0' y1='4' x2='16' y2='4' stroke='rgba(15,15,15,0.5)' stroke-width='0.1' /></svg>");
    background-repeat: repeat;
  }

  div.question-input.disabled {
    border: none;
    /*var(--disabled-border);*/
    font: var(--notes-disabled-font-color);
    background-color: var(--notes-disabled-bg-color);
  }

  div.question-input::after {
    content: '';
    position: absolute;
    border: var(--notes-vert-line);
    right: 1rem;
    top: 0;
    bottom: 0;
  }
  div.question-input::before {
    content: '';
    position: absolute;
    border: var(--notes-vert-line);
    left: 1rem;
    top: 0;
    bottom: 0;
  }
</style>
