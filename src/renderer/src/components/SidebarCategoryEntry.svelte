<script lang="ts">
  import type { Writable } from 'svelte/store'
  import type { ICategoryToLabelMap } from '../constants/categories'
  import { selectedMods } from '../stores/library'
  export let categoryName: string = ''
  export let categoryEntries: ICategoryToLabelMap
  export let label: string | undefined = undefined
  export let store: Writable<string>
  export let isVisible: boolean = false

  $: categoryEntriesList = Object.keys(categoryEntries)
  $: {
    $store && selectedMods.set([])
  }
</script>

<div class="entry " class:invisible={!isVisible}>
  <h5 class="uppercase font-semibold">{label || categoryName}</h5>

  {#if categoryName}
    <div class="flex flex-col gap-1">
      <!--    <label class="flex gap-2 items-center ">
        <input type="radio" bind:group={$store} value={''} />
        NO FILTER
      </label> -->

      {#each categoryEntriesList as entry}
        <label class="flex gap-2 items-center ">
          <input type="radio" bind:group={$store} value={entry} />
          {categoryEntries[entry]}
        </label>
      {/each}
    </div>
  {/if}
</div>

<style>
  .entry {
    grid-column: 1;
    grid-row: 1;
  }
</style>
