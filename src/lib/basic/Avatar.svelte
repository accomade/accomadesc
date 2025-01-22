<script lang="ts">
  import { onMount } from 'svelte';

  let {
    email = 'guest@example.com',
    size = 4,
    imageUrl = $bindable(''),
  }: {
    email: string;
    size?: number;
    imageUrl?: string;
  } = $props();

  const hashEmail = async (email: string): Promise<string> => {
    const trimmed = email.trim();
    const lowerCased = trimmed.toLowerCase();
    const encoder = new TextEncoder();
    const data = encoder.encode(lowerCased);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashed = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hashed;
  };

  onMount(async () => {
    if (!imageUrl && window) {
      const hashedEmail = await hashEmail(email);
      const fontSize = parseFloat(
        window.getComputedStyle(document.body).getPropertyValue('font-size'),
      );
      const s = fontSize * size;
      imageUrl = `https://gravatar.com/avatar/${hashedEmail}?s=${s}&d=robohash`;
    }
  });
</script>

<div style="width: {size}rem; height: {size}rem" class="avatar-container">
  <img
    style="width: calc({size}rem - 4px); height: calc({size}rem - 4px)"
    src={imageUrl}
    alt="Gravatar"
  />
</div>

<style>
  .avatar-container {
    border: var(--avatar-border);
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    flex-grow: 0;
  }
</style>
