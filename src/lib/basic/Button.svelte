<script lang="ts">
  import { getIcon } from '$lib/basic/icons.js';
  import { randomID } from '$lib/names/gen.js';

  const {
    text = null,
    iconName = '',
    id = randomID(),
    ariaLabel = text ? text : iconName,
    form = null,
    type = 'button',
    stopPropagation = false,
    pressed = false,
    fontSize = 'inherit',

    size = 2,
    iconColor = 'var(--icon-color)',
    danger = false,

    showBackdrop = true,
    enabled = $bindable(true),
    onUp = true,
    preventDefault = false,
    clicked: onclicked = () => {},
  }: {
    text?: string | null;
    iconName?: string;
    id?: string;
    ariaLabel?: string;
    form?: string | null;
    type?: 'button' | 'submit' | 'reset';
    stopPropagation?: boolean;
    pressed?: boolean;
    fontSize?: string;

    size?: number;
    iconColor?: string;
    danger?: boolean;

    showBackdrop?: boolean;
    enabled?: boolean;
    onUp?: boolean;
    preventDefault?: boolean;
    clicked?: (event: Event) => void;
  } = $props();

  let disabled = $derived(!enabled);

  const onClick = (event: Event) => {
    if (stopPropagation) {
      event.stopPropagation();
    }
    if (enabled) onclicked(event);
  };

  let focussed = $state(false);
  const focussing = (event: Event) => {
    if (stopPropagation) {
      event.stopPropagation();
    }
    focussed = true;
  };
  const unfocussing = (event: Event) => {
    if (stopPropagation) {
      event.stopPropagation();
    }
    focussed = false;
  };

  let borderWidth = $derived(size / 20);

  let borderColor = $derived.by(() => {
    if (focussed) {
      return 'var(--focussed-border-color)';
    } else if (!enabled) {
      return 'var(--disabled-border-color)';
    } else {
      return 'var(--main-border-color)';
    }
  });

  let shadowColor = $derived.by(() => {
    if (focussed) {
      return 'var(--focussed-border-color)';
    } else if (!enabled) {
      return 'var(--disabled-border-color)';
    } else {
      return 'var(--main-border-color)';
    }
  });

  let activated = $state(false);
  const activating = (event: Event) => {
    if (stopPropagation) {
      event.stopPropagation();
    }
    if (preventDefault) {
      event.preventDefault();
    }
    activated = true;
  };
  const deactivating = (event: Event) => {
    if (stopPropagation) {
      event.stopPropagation();
    }
    if (preventDefault) {
      event.preventDefault();
    }

    activated = false;
  };

  const keyup = (event: KeyboardEvent) => {
    if (onUp) {
      if (stopPropagation) {
        event.stopPropagation();
      }
      if (preventDefault) {
        event.preventDefault();
      }

      if (event.key == ' ' || event.key == 'Enter') {
        activated = false;
      }
    }
  };
  const keydown = (event: KeyboardEvent) => {
    if (!onUp) {
      if (stopPropagation) {
        event.stopPropagation();
      }
      if (preventDefault) {
        event.preventDefault();
      }
      if (event.key == ' ' || event.key == 'Return') {
        activated = true;
      }
    }
  };

  let innerShadowWidth = $derived(activated ? size / 16 : size / 8);
  let outerShadowWidth = $derived(activated ? size / 8 : size / 4);

  const borderRadius = $state(size / 1.8);

  let buttonWidth = $derived.by(() => {
    if (iconName && !text) {
      return `${size}rem`;
    }
    return 'inherit';
  });

  let iconHeight = $derived(size * 0.8);
  let iconWidth = $derived(size * 0.8);

  let textHeight = $derived(size * 0.75);

  let inset = $derived(pressed ? 'inset' : '');

  let realIconColor = $derived.by(() => {
    if (enabled) {
      return iconColor;
    } else {
      return 'var(--icon-disabled-color)';
    }
  });
</script>

{#if showBackdrop}
  <button
    {id}
    class:pressed
    aria-label={ariaLabel}
    style="
    height: {size}rem;
    width: {buttonWidth};
    border-radius: {borderRadius}rem;
    border: {borderWidth}rem solid {borderColor};
    box-shadow: 
        {inset}
        0 0 {outerShadowWidth}rem rgba(from {shadowColor} r g b / 0.5),
        0 0 {innerShadowWidth}rem rgba(from {shadowColor} r g b / 0.4)
        ;
    font-size: {fontSize};
    "
    class="button"
    class:disabled
    {disabled}
    {form}
    {type}
    class:danger
    onclick={onClick}
    onmousedowncapture={activating}
    onmouseupcapture={deactivating}
    onfocuscapture={focussing}
    onblurcapture={unfocussing}
    onkeydowncapture={keydown}
    onkeyupcapture={keyup}
  >
    {#if iconName}
      <div
        style="
          height: {iconHeight}rem; 
          width: {iconWidth}rem;
          margin-left: {text ? '0.4rem' : '0rem'}"
        class="button-icon"
      >
        {@html getIcon(iconName, realIconColor)}
      </div>
    {/if}
    {#if text}
      <div
        style="
            height: {textHeight}rem;
            line-height: {textHeight}rem;"
        class="button-text"
      >
        {text}
      </div>
    {/if}
  </button>
{:else}
  <button
    {id}
    aria-label={ariaLabel}
    style="
    height: {size}rem;
    width: {buttonWidth};
    border-radius: {borderRadius}rem;
    border: 0 solid rgba(0,0,0,0);
    box-shadow: 
        {inset}
        0 0 {outerShadowWidth}rem rgba(from {shadowColor} r g b / 0.5),
        0 0 {innerShadowWidth}rem rgba(from {shadowColor} r g b / 0.4)
        ;
    "
    class="button"
    class:pressed
    class:disabled
    {disabled}
    {form}
    {type}
    class:danger
    onclick={onClick}
    onmousedowncapture={activating}
    onmouseupcapture={deactivating}
    onfocuscapture={focussing}
    onblurcapture={unfocussing}
    onkeydowncapture={keydown}
    onkeyupcapture={keyup}
  >
    <div
      style="
        height: {size}rem; 
        width: {size}rem;"
      class="button-icon"
    >
      {@html getIcon(iconName, realIconColor)}
    </div>
  </button>
{/if}

<style>
  button.disabled {
    filter: grayscale(1) opacity(0.5);
  }

  button.pressed {
    filter: hue-rotate(120deg);
  }

  button.button {
    box-sizing: content-box;

    font-size: 100%;
    font-family: inherit;
    padding: 0;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    background-color: var(--button-bg-color);
    color: var(--button-font-color);

    cursor: pointer;
    overflow: hidden;

    margin: 0.2rem;

    -webkit-tap-highlight-color: transparent;
  }
  button.button:focus {
    outline-style: none;
    filter: var(--button-focus-filter);
  }

  button.button.danger {
    background-color: var(--button-danger-bg-color);
    color: var(--button-danger-font-color);
  }

  button.button:enabled:active {
    filter: blur(0.1rem);
  }

  button.button .button-icon {
    display: inline-block;
  }

  button.button .button-text {
    display: inline-block;
    font-weight: bold;
    user-select: none;
    vertical-align: middle;
    font-variant: small-caps;

    color: var(--button-font-color);

    margin-left: 0.4rem;
    margin-right: 0.4rem;
  }

  button.button.danger .button-text {
    color: var(--button-danger-font-color);
  }

  button.button:disabled {
    cursor: default;
  }
</style>
