<script lang="ts">
  import { getIcon } from './icons.js';

  const {
    text = null,
    iconName = '',
    ariaLabel = text ? text : iconName,
    form = null,
    type = 'button',
    stopPropagation = false,
    pressed = false,
    fontSize = 'inherit',

    size = 2,
    iconColor = 'black',
    danger = false,

    showBackdrop = true,
    enabled = $bindable(true),
    onUp = true,
    preventDefault = false,
    clicked: onclicked = () => {},
  }: {
    text?: string | null;
    iconName?: string;
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

  const disabled = $derived(!enabled);

  const onClick = (event: Event) => {
    if (stopPropagation) {
      event.stopPropagation();
    }
    if (enabled) onclicked(event);
  };

  let focussed = false;
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
      return 'var(--border-color)';
    }
  });

  let shadowColor = $derived.by(() => {
    if (focussed) {
      return 'var(--focussed-border-color-triplet)';
    } else if (!enabled) {
      return 'var(--disabled-border-color-triplet)';
    } else {
      return 'var(--border-color-triplet)';
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

      if (event.keyCode === 13 || event.keyCode === 32) {
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
      if (event.keyCode === 13 || event.keyCode === 32) {
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
      return 'var(--font-disabled-color)';
    }
  });
</script>

{#if showBackdrop}
  <button
    class:pressed
    aria-label={ariaLabel}
    style="
    height: {size}rem;
    width: {buttonWidth};
    border-radius: {borderRadius}rem;
    border: {borderWidth}rem solid {borderColor};
    box-shadow: 
        {inset}
        0 0 {outerShadowWidth}rem rgba({shadowColor}, 0.5),
        0 0 {innerShadowWidth}rem rgba({shadowColor}, 0.4)
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
    aria-label={ariaLabel}
    style="
    height: {size}rem;
    width: {buttonWidth};
    border-radius: {borderRadius}rem;
    border: 0 solid rgba(0,0,0,0);
    box-shadow: 
        {inset}
        0 0 {outerShadowWidth}rem rgba({shadowColor}, 0.5),
        0 0 {innerShadowWidth}rem rgba({shadowColor}, 0.4)
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
  .disabled {
    filter: grayscale(1) opacity(0.5);
  }

  .pressed {
    filter: hue-rotate(120deg);
  }

  .button {
    box-sizing: content-box;

    font-size: 100%;
    font-family: inherit;
    padding: 0;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    background-color: var(--bg-button-prim-color);
    color: var(--main-font-color);

    cursor: pointer;
    overflow: hidden;

    margin: 0.2rem;

    -webkit-tap-highlight-color: transparent;
  }
  .button:focus {
    outline-style: none;
  }

  .button.danger {
    background-color: var(--bg-negative-color);
    color: var(--bg-button-tert-color);
  }

  .button:enabled:active {
    filter: blur(0.1rem);
  }

  .button .button-icon {
    display: inline-block;
  }

  .button .button-text {
    display: inline-block;
    font-weight: bold;
    user-select: none;
    vertical-align: middle;
    font-variant: small-caps;

    color: var(--main-font-color);

    margin-left: 0.4rem;
    margin-right: 0.4rem;
  }

  .button.danger .button-text {
    color: var(--bg-button-tert-color);
  }

  .button:disabled {
    cursor: default;
  }
</style>
