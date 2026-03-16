<script lang="ts">
  let {
    rgbColor,
    colorChanged = () => {},
  }: {
    rgbColor: string;
    colorChanged: (rgbColor: string) => void;
  } = $props();

  const cChanged = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    rgbColor = e.currentTarget.value;
    console.log(rgbColor);
    colorChanged(rgbColor);
  };
</script>

<div class="wrapper">
  <input type="color" value={rgbColor} onchange={cChanged} />
  >
</div>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>
