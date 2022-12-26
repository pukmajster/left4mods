<script lang="ts">
  import { CheckCircle, Circle } from 'lucide-svelte'
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

  function selectThisCategory(entry: string) {
    $store = entry
  }
</script>

<div class="entry" class:invisible={!isVisible}>
  <!-- <h5 class="uppercase font-semibold">{label || categoryName}</h5> -->

  {#if categoryName}
    <div class="flex flex-col rounded-md overflow-hidden">
      {#each categoryEntriesList as entry}
        {@const isSelected = $store == entry}

        <button
          class="category-entry flex gap-2 items-center py-1 bg-surface-800/30  pl-4 cursor-pointer hover:bg-surface-700/50"
          class:selected={isSelected}
          on:click={() => selectThisCategory(isSelected ? '' : entry)}
        >
          {#if isSelected}
            <CheckCircle size={14} />
          {:else}
            <Circle size={14} />
          {/if}
          {categoryEntries[entry]}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style lang="postcss">
  .entry {
    grid-column: 1;
    grid-row: 1;
  }

  .category-entry {
    padding: 0.3rem 0.6rem;
    transition: padding 0.2s ease-in-out;
  }

  .category-entry.selected {
    @apply bg-primary-500;
  }
</style>
