<script>
  /**
   * @typedef {Object} Props
   * @property {string} [size]
   */

  /** @type {Props} */
  let { size = '1rem' } = $props();
  //let color="black"
</script>

<div style="width: {size}; height: {size};">
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="30" cy="30" r="26" stroke="var(--icon-not-color, 'red')" stroke-width="8" />
    <line
      x1="12.8669"
      y1="13.2106"
      x2="48.8669"
      y2="50.2106"
      stroke="var(--icon-not-color, 'red')"
      stroke-width="8"
    />
  </svg>
</div>
