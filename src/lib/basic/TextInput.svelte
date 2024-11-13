<script lang="ts">
  import { randomID } from '../names/gen.js';

  let {
    placeholder = '',
    phonePattern = '^(\\+|00)(\\d|\\s){9,24}',
    name = 'input',
    minLength = 0,
    maxLength = 100,
    value = $bindable(''),
    step = 'any',
    minNumber = Number.MIN_SAFE_INTEGER,
    maxNumber = Number.MAX_SAFE_INTEGER,
    type = 'text',
    valid = $bindable(true),
    enabled = true,
    required = false,
    requestFocus = false,
    marginForMessage = true,
    alignSelf = 'normal',
    maxWidth = '20rem',
    minWidth = '3rem',
    messageInvalid = 'Invalid',
    messageValid = 'OK',
    showInitialMessage = false,
    showMessageOnInvalid = true,
    id = `text-field-${randomID()}`,
    translating = false,
    blurred = () => {},
    focussed = () => {},
    validityChanged = () => {},
    valueChanged = () => {},
    checkValidity = () => {
      return true;
    },
  }: {
    placeholder?: string;
    phonePattern?: string;
    name?: string;
    minLength?: number;
    maxLength?: number;
    value?: string | number;
    step?: string;
    minNumber?: number;
    maxNumber?: number;
    type?: string;
    valid?: boolean;
    enabled?: boolean;
    required?: boolean;
    requestFocus?: boolean;
    marginForMessage?: boolean;
    alignSelf?: string;
    maxWidth?: string;
    minWidth?: string;
    messageInvalid?: string;
    messageValid?: string;
    showInitialMessage?: boolean;
    showMessageOnInvalid?: boolean;
    id?: string;
    translating?: boolean;

    checkValidity?: (currentValue: string | number) => boolean;
    blurred?: (name: string, value: string | number) => void;
    focussed?: (name: string, value: string | number) => void;
    validityChanged?: (valid: boolean, name: string, value: string | number) => void;
    valueChanged?: (valid: boolean, name: string, value: string | number) => void;
  } = $props();

  $effect(() => {
    valid = checkValidity(value);
  });

  const handleBlur = () => {
    if (enabled) blurred(name, value);
  };

  const handleFocus = () => {
    if (enabled) focussed(name, value);
  };

  const handleChanged = () => {
    let v = checkValidity(value);
    //console.log(v, valid)
    if (v !== valid) {
      valid = v;
      validityChanged(valid, name, value);
    }
    valueChanged(valid, name, value);
  };

  const handleTelChanged = () => {
    if (input) {
      const v = input.checkValidity();
      if (v !== valid) {
        valid = v;
        validityChanged(valid, name, value);
      }
      valueChanged(valid, name, value);
    }
  };

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();
    let paste = event.clipboardData?.getData('text');
    if (input && paste) {
      //console.log(paste)
      input.value = paste;
      value = paste;
    }

    handleChanged();
  };

  const handleTelPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    let paste = event.clipboardData?.getData('text');
    if (input && paste) {
      input.value = paste;
      value = paste;
    }
    handleTelChanged();
  };

  let input: HTMLInputElement | undefined = $state();
  $effect(() => {
    if (input && requestFocus) {
      input.focus();
    }
  });
</script>

<div
  class="input-wrapper"
  style="max-width: {maxWidth}; min-width: {minWidth}; align-self: {alignSelf};"
  class:margin-for-message={marginForMessage}
>
  {#if enabled && (showInitialMessage || (showMessageOnInvalid && !valid))}
    <div class="message-wrapper">
      <span class="message" class:valid
        >{#if valid}{@html messageValid}{:else}{@html messageInvalid}{/if}</span
      >
    </div>
  {/if}
  {#if type == 'text'}
    <input
      {id}
      bind:this={input}
      minlength={minLength}
      maxlength={maxLength}
      style="max-width: {maxWidth}; min-width: {minWidth};"
      class:invalid={enabled && !valid}
      class:disabled={!enabled}
      class:translating
      {placeholder}
      type="text"
      {name}
      disabled={!enabled}
      {required}
      bind:value
      onblur={handleBlur}
      onfocus={handleFocus}
      onchange={handleChanged}
      oninput={handleChanged}
      onpaste={handlePaste}
    />
  {:else if type == 'email'}
    <input
      {id}
      bind:this={input}
      style="max-width: {maxWidth}; min-width: {minWidth};"
      class:invalid={enabled && !valid}
      class:disabled={!enabled}
      minlength={minLength}
      maxlength={maxLength}
      {placeholder}
      type="email"
      {name}
      disabled={!enabled}
      {required}
      bind:value
      onblur={handleBlur}
      onfocus={handleFocus}
      onchange={handleChanged}
      oninput={handleChanged}
      onpaste={handlePaste}
    />
  {:else if type == 'tel'}
    <input
      {id}
      bind:this={input}
      style="max-width: {maxWidth}; min-width: {minWidth};"
      class:invalid={enabled && !valid}
      class:disabled={!enabled}
      {placeholder}
      minlength={minLength}
      maxlength={maxLength}
      type="tel"
      pattern={phonePattern}
      {name}
      disabled={!enabled}
      {required}
      bind:value
      onblur={handleBlur}
      onfocus={handleFocus}
      onchange={handleTelChanged}
      oninput={handleTelChanged}
      onpaste={handleTelPaste}
    />
  {:else if type == 'number'}
    <input
      {id}
      bind:this={input}
      style="max-width: {maxWidth}; min-width: {minWidth};"
      class:invalid={enabled && !valid}
      class:disabled={!enabled}
      {placeholder}
      minlength={minLength}
      maxlength={maxLength}
      type="number"
      min={minNumber}
      max={maxNumber}
      {step}
      {name}
      disabled={!enabled}
      {required}
      bind:value
      onblur={handleBlur}
      onfocus={handleFocus}
      onchange={handleChanged}
      oninput={handleChanged}
      onpaste={handlePaste}
    />
  {:else if type == 'password'}
    <input
      {id}
      bind:this={input}
      style="max-width: {maxWidth}; min-width: {minWidth};"
      class:invalid={enabled && !valid}
      class:disabled={!enabled}
      {placeholder}
      minlength={minLength}
      maxlength={maxLength}
      type="password"
      {name}
      disabled={!enabled}
      {required}
      bind:value
      onblur={handleBlur}
      onfocus={handleFocus}
      onchange={handleChanged}
      oninput={handleChanged}
      onpaste={handlePaste}
    />
  {/if}
</div>

<style>
  .translating {
    filter: drop-shadow(0 0 1rem #baa5c3);
    border-color: #3d704d;
    box-shadow: 0 0 0.5rem #baa5c3;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    align-self: flex-start;
  }

  .margin-for-message {
    margin-top: 1rem;
  }

  input {
    position: relative;
    max-width: 20rem;
    font-size: 1.1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    height: 2rem;
    border: 0.15rem solid var(--border-color);

    border-radius: 0.6rem;
  }

  input:focus {
    outline: none;
    border: 0.15rem solid var(--focussed-border-color);
    filter: drop-shadow(0 0 0.75rem var(--focussed-border-color));
  }

  input.invalid {
    border: 0.15rem solid var(--reject-color);
  }

  input:invalid {
    border: 0.15rem solid var(--reject-color);
  }

  input.disabled {
    filter: opacity(0.7);
  }

  input::placeholder {
    font-weight: lighter;
    font-style: normal;
    font-size: 0.8rem;
    position: absolute;
  }

  .message-wrapper {
    height: 1rem;
    top: -1rem;
    position: absolute;
  }

  .message {
    color: var(--font-alert-color);
    font-style: italic;

    font-size: 0.9rem;
    white-space: nowrap;
  }

  .message.valid {
    color: var(--accept-color);
  }
</style>
