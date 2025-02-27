<script lang="ts">
  import Spinner from '$lib/basic/Spinner.svelte';
  import Button from '$lib/basic/Button.svelte';
  import TextInput from '$lib/basic/TextInput.svelte';
  import Notes from '$lib/basic/Notes.svelte';
  import type { ContactFormContent, I18nFacade } from '$lib/types.js';

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
    translateFunc,
  }: ContactFormContent & I18nFacade = $props();

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

  let disabled = $derived(errored || successfullySent);
</script>

<div class="wrapper">
  {#if explainer}
    <div class="explainer">{@html translateFunc ? translateFunc(explainer) : ''}</div>
  {/if}
  <form onsubmit={submitMessage}>
    <input type="hidden" value={userID} />
    <label class:disabled>
      {@html translateFunc ? translateFunc(nameLabel) : 'Name'}:
      <TextInput type="text" marginForMessage={false} bind:value={name} enabled={!disabled} />
    </label>
    <label class:disabled>
      {@html translateFunc ? translateFunc(emailLabel) : 'Email'}:
      <TextInput type="email" marginForMessage={false} bind:value={email} enabled={!disabled} />
    </label>
    <label class="row-label"
      ><div class:disabled>
        {@html translateFunc
          ? translateFunc(questionLabel)
          : 'Your Message'}{#if showMaxCharsMessage}<span class="max-chars-message"
            >&nbsp;({currentCharsCount}/{maxCharsAllowed})</span
          >{/if}:
      </div>

      <Notes {disabled} changed={questionChanged} />
    </label>
    {#if successfullySent}
      <div class="success">
        {translateFunc ? translateFunc(successfullySentText) : 'Successfully Sent Email'}
      </div>
    {/if}
    {#if errored}
      <div class="error">
        {translateFunc ? translateFunc(sentErroredText) : 'Error Occurred Sending Email'}
      </div>
    {/if}
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
  }

  .wrapper {
    background-color: var(--main-bg-color);
    color: var(--main-font-color);

    width: 100%;
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
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    gap: 0.5rem;
  }

  label {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  .row-label {
    flex-direction: column;
    gap: 0.2rem;
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
