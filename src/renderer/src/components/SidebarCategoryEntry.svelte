<script lang="ts">
  import type { Writable } from 'svelte/store'
  export let categoryName: string
  export let categoryEntries: string[]
  export let store: Writable<string>
  export let isVisible: boolean = false
</script>

<div class="entry " class:invisible={!isVisible}>
  <h5 class="uppercase font-semibold">{categoryName}</h5>

  <div class="flex flex-col gap-1">
    <label class="flex gap-2 items-center ">
      <input type="radio" bind:group={$store} value={''} />
      NO FILTER
    </label>

    {#each categoryEntries as entry}
      <label class="flex gap-2 items-center ">
        <input type="radio" bind:group={$store} value={entry} />
        {entry}
      </label>
    {/each}
  </div>
</div>

<style>
  .entry {
    grid-column: 1;
    grid-row: 1;
  }
</style>
