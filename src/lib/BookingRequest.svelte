<script lang="ts">
  import type { BookingRequestContent, I18nFacade } from '$lib/types.js';
  import { getContext } from 'svelte';
  import Button from './basic/Button.svelte';
  import Notes from './basic/Notes.svelte';
  import Spinner from './basic/Spinner.svelte';
  import TextInput from './basic/TextInput.svelte';
  import { OCCUPATION_STATE, OccupationState } from './occuplan/state.svelte.ts';
  import OccuPlanPicker from './occuplan/OccuPlanPicker.svelte';
  import { fade } from 'svelte/transition';

  const {
    accomadeBaseUrl = 'https://popnapdkcdnabruxkjti.supabase.co/storage/v1/object/public/ical/',
    acco,
    messageLabel,
    userID,
    nameLabel,
    emailLabel,
    dateEntryLabel = 'Enter Vacation Dates',
    explainer,
    successfullySentText,
    sentErroredText,
    submitText,
    invalidText,
    maxCharsAllowed = 300,
    translateFunc,
  }: BookingRequestContent & I18nFacade = $props();

  let name = $state('');
  let email = $state('');
  let message = $state('');
  let arrival = $state('');
  let leave = $state('');
  let disabled = $state(false);
  let enterDatesEngaged = $state(true);

  let currentCharsCount = $derived(message.length);
  let showMaxCharsMessage = $derived(currentCharsCount > maxCharsAllowed - 50);
  let canSubmit: boolean = $derived(
    name.length > 0 && email.length > 0 && message.length > 0 && message.length <= maxCharsAllowed,
  );

  let errored = $state(false);
  let successfullySent = $state(false);
  let sending = $state(false);

  //https://popnapdkcdnabruxkjti.supabase.co/storage/v1/object/public/ical/81e66599-ac3c-4ad6-b261-fceeb784f9e9/050edcb4-680e-4542-96df-3ae4a2af89a5
  const url = `${accomadeBaseUrl}/${userID}/${acco.path}`;
  const oStateID = `i-${url}-${OCCUPATION_STATE}`;
  let occupationState: OccupationState = $state(getContext(oStateID));
  let invalid = $derived(occupationState ? occupationState.validRequest(from, to) : false);
  const messageChanged = (value: string) => {
    message = value;
  };

  const createRequest = () => {};
</script>

<div class="wrapper">
  {#if explainer}
    <div class="explainer">{@html translateFunc ? translateFunc(explainer) : ''}</div>
  {/if}
  <form onsubmit={createRequest}>
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
          ? translateFunc(messageLabel)
          : 'Your Message'}{#if showMaxCharsMessage}<span class="max-chars-message"
            >&nbsp;({currentCharsCount}/{maxCharsAllowed})</span
          >{/if}:
      </div>
      <Notes {disabled} changed={messageChanged} />
    </label>
    <label class:disabled>
      {dateEntryLabel}:
      <TextInput type="text" enabled={false} value="{arrival} {leave}" />
      {#if enterDatesEngaged}
        <div transition:fade style="min-width: 32rem">
          <OccuPlanPicker {url} />
        </div>
      {/if}
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
    {#if invalid}
      <div class="error">
        {translateFunc ? translateFunc(invalidText) : 'Dates Are Not Available'}
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
    color: var(--font-disabled-color);
  }
</style>
