<script lang="ts">
  import type { Writable } from 'svelte/store'
  export let categoryName: string
  export let categoryEntries: string[]
  export let store: Writable<string[]>
  export let isVisible: boolean = false
</script>

{#if isVisible}
  <div class="flex flex-col gap-1">
    {#each categoryEntries as entry}
      <label class="flex gap-2 items-center ">
        <input type="checkbox" bind:group={$store} value={entry} />
        {entry}
      </label>
    {/each}
  </div>
{/if}

<style>
</style>
