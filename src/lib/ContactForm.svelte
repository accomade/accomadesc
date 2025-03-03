<script lang="ts">
  import Spinner from '$lib/basic/Spinner.svelte';
  import Button from '$lib/basic/Button.svelte';
  import TextInput from '$lib/basic/TextInput.svelte';
  import Notes from '$lib/basic/Notes.svelte';
  import type { ContactFormContent, I18nFacade } from '$lib/types.js';
  import { randomID } from './names/gen.js';

  const {
    userID,
    endpoint,
    explainer,
    emailLabel,
    nameLabel,
    questionLabel,
    submitText,
    successfullySentText,
    sentErroredText,
    maxCharsAllowed = 300,
    preview = false,
    translateFunc,
  }: ContactFormContent & I18nFacade = $props();

  const id = randomID();

  let name = $state('');
  let email = $state('');
  let question = $state('');
  let successfullySent = $state(false);
  let sending = $state(false);
  let errored = $state(false);

  const questionChanged = (value: string) => {
    question = value;
  };

  let currentCharsCount = $derived(question.length);
  let showMaxCharsMessage = $derived(currentCharsCount > maxCharsAllowed - 50);
  let canSubmit: boolean = $derived(
    !preview &&
      name.length > 0 &&
      email.length > 0 &&
      question.length > 0 &&
      question.length <= maxCharsAllowed,
  );

  const submitMessage = async (e: Event) => {
    sending = true;
    e.preventDefault();

    try {
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
        errored = true;
        console.log('Error sending mail', response.status, response.statusText);
      } else {
        successfullySent = true;
      }
    } catch (e) {
      console.log('An error occurred:', e);
      errored = true;
    }
    sending = false;

    setTimeout(() => {
      errored = false;
      successfullySent = false;
    }, 15000);
  };

  let disabled = $derived(preview || errored || successfullySent);
</script>

<div class="wrapper">
  {#if explainer}
    <div class="explainer">{@html translateFunc ? translateFunc(explainer) : ''}</div>
  {/if}

  <form onsubmit={submitMessage}>
    <input type="hidden" value={userID} />
    <label for={`${id}-name`}>
      <span class:disabled>{@html translateFunc ? translateFunc(nameLabel) : 'Name'}:</span>
    </label>
    <div class="input-wrapper">
      <TextInput
        id={`${id}-name`}
        type="text"
        marginForMessage={false}
        bind:value={name}
        enabled={!disabled}
      />
    </div>
    <label for={`${id}-email`}>
      <span class:disabled>{@html translateFunc ? translateFunc(emailLabel) : 'Email'}:</span>
    </label>

    <div class="input-wrapper">
      <TextInput
        id={`${id}-email`}
        type="email"
        marginForMessage={false}
        bind:value={email}
        enabled={!disabled}
      />
    </div>

    <label class="notes-input"
      ><div class:disabled>
        {@html translateFunc
          ? translateFunc(questionLabel)
          : 'Your Message'}{#if showMaxCharsMessage}<span class="max-chars-message"
            >&nbsp;({currentCharsCount}/{maxCharsAllowed})</span
          >{/if}:
      </div>
      <Notes id={`${id}-notes`} {disabled} changed={questionChanged} />
    </label>

    <div class="message-wrapper">
      {#if preview}<div>[PREVIEW]</div>{/if}
      {#if successfullySent || preview}
        <div class="success">
          {translateFunc ? translateFunc(successfullySentText) : 'Successfully Sent Email'}
        </div>
      {/if}
      {#if errored || preview}
        <div class="error">
          {translateFunc ? translateFunc(sentErroredText) : 'Error Occurred Sending Email'}
        </div>
      {/if}
    </div>
    <div class="button-wrapper">
      <Button
        enabled={canSubmit && !disabled}
        text={translateFunc ? translateFunc(submitText) : 'Submit'}
        type="submit"
      />
    </div>
  </form>
  {#if sending}
    <Spinner />
  {/if}
</div>

<style>
  .explainer {
    margin-bottom: 1rem;
    grid-column: span 2;
  }

  .wrapper {
    background-color: var(--main-bg-color);
    color: var(--main-font-color);

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 1rem;
    margin: 1rem;
    :global(*) {
      color: var(--main-font-color);
    }
  }

  form {
    display: grid;
    grid-template-columns: [start] 1fr [gap-start] 0.5fr [gap-end] 3fr [end];
    row-gap: 0.5rem;

    label {
      align-content: center;
      grid-column-start: start;
      grid-column-end: gap-start;
    }

    .message-wrapper {
      margin-top: 1rem;
      grid-column-start: start;
      grid-column-end: end;
      display: flex;
      justify-content: space-between;
    }
    .button-wrapper {
      grid-column-start: start;
      grid-column-end: end;
      display: flex;
      justify-content: flex-start;
    }
    .input-wrapper {
      grid-column-start: gap-end;
      grid-column-end: end;
    }

    .notes-input {
      margin-top: 2rem;
      grid-column-start: start;
      grid-column-end: end;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  .max-chars-message {
    font-weight: bolder;
    color: var(--alert-font-color);
  }

  .success {
    color: var(--accept-font-color);
    font-weight: bolder;
  }

  .error {
    color: var(--alert-font-color);
    font-weight: bolder;
  }

  .disabled {
    color: var(--disabled-font-color);
  }
</style>
