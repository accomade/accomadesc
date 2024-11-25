<script lang="ts">
  import Button from './basic/Button.svelte';
  import TextInput from './basic/TextInput.svelte';
  import type { ContactFormContent, I18nFacade } from './types.js';

  const {
    userID,
    endpoint,
    explainer,
    emailLabel,
    nameLabel,
    questionLabel,
    submitText,
    maxCharsAllowed = 300,
    translateFunc,
  }: ContactFormContent & I18nFacade = $props();

  let name = $state('');
  let email = $state('');
  let question = $state('');

  let currentCharsCount = $derived(question.length);
  let showMaxCharsMessage = $derived(currentCharsCount > 150);
  let canSubmit: boolean = $derived(
    name.length > 0 &&
      email.length > 0 &&
      question.length > 0 &&
      question.length <= maxCharsAllowed,
  );

  const questionChanged = (e: Event) => {
    const target = e.currentTarget as HTMLDivElement;
    question = target.getHTML();
  };

  const submitMessage = async (e: Event) => {
    e.preventDefault();
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userID,
        email: email,
        name: name,
        question: question,
      }),
    });
    if (response.status != 201) {
      console.log('Error sending mail', response.status, response.statusText);
    }
  };
</script>

<div class="wrapper">
  {#if explainer}
    <div class="explainer">{@html translateFunc ? translateFunc(explainer) : ''}</div>
  {/if}
  <form onsubmit={submitMessage}>
    <input type="hidden" value={userID} />
    <label>
      {@html translateFunc ? translateFunc(nameLabel) : 'Name'}:
      <TextInput type="text" marginForMessage={false} bind:value={name} />
    </label>
    <label>
      {@html translateFunc ? translateFunc(emailLabel) : 'Email'}:
      <TextInput type="email" name="email" marginForMessage={false} bind:value={email} />
    </label>
    <label for="question-input"
      ><div>
        {@html translateFunc
          ? translateFunc(questionLabel)
          : 'Your Message'}{#if showMaxCharsMessage}<span class="max-chars-message"
            >&nbsp;({currentCharsCount}/{maxCharsAllowed})</span
          >{/if}:
      </div>
    </label>
    <div contenteditable="plaintext-only" class="question-input" oninput={questionChanged}></div>
    <div class="button-wrapper">
      <Button
        enabled={canSubmit}
        text={translateFunc ? translateFunc(submitText) : 'Submit'}
        type="submit"
      />
    </div>
  </form>
</div>

<style>
  .wrapper {
    background-color: var(--main-bg-color);
    color: var(--main-font-color);

    width: 100%;
    display: flex;

    padding: 1rem;
    margin: 1rem;
    :global(*) {
      color: var(--main-font-color);
    }
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  .question-input {
    position: relative;

    min-width: 400px;
    width: 100%;
    max-width: 800px;
    min-height: 5rem;
    height: 100%;

    border: var(--main-border);
    border-radius: 1rem;

    background-color: var(--longinput-bg-color);

    padding-left: 1.3rem;
    padding-right: 1.3rem;
    padding-top: 0.5rem;
  }

  .question-input::after {
    content: '';
    position: absolute;
    border: var(--dashed-border);
    right: 1rem;
    top: 0;
    bottom: 0;
  }
  .question-input::before {
    content: '';
    position: absolute;
    border: var(--dashed-border);
    left: 1rem;
    top: 0;
    bottom: 0;
  }

  .max-chars-message {
    font-weight: bolder;
    color: var(--alert-font-color);
  }
</style>
