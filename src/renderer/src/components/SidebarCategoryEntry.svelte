<script lang="ts">
  import { CheckCircle, Circle } from 'lucide-svelte'
  import type { ICategoryToLabelMap } from '../constants/categories'
  import { activeCategoriesToFilterBy } from '../stores/library'
  export let categoryName: string = ''
  export let categoryEntries: ICategoryToLabelMap
  export let label: string | undefined = undefined
  export let isVisible: boolean = false
  export let description: string | undefined = undefined

  $: categoryEntriesList = Object.keys(categoryEntries)

  function selectThisCategory(e: MouseEvent, entry: string) {
    if ($activeCategoriesToFilterBy.includes(entry)) {
      $activeCategoriesToFilterBy = $activeCategoriesToFilterBy.filter(
        (category) => category !== entry
      )
    } else {
      activeCategoriesToFilterBy.update((categories) =>
        e.shiftKey ? [...categories, entry] : [entry]
      )
    }
  }
</script>

<div class="entry" class:invisible={!isVisible}>
  {#if label || categoryName}
    <h5 class="uppercase font-semibold">{label || categoryName}</h5>
  {/if}

  {#if description}
    <h6 class="font-semibold">{description}</h6>
  {/if}

  {#if categoryName}
    <div class="flex flex-col rounded-md overflow-hidden">
      {#each categoryEntriesList as entry}
        {@const isSelected = $activeCategoriesToFilterBy.includes(entry)}

        <button
          class="category-entry flex gap-2 items-center py-1 bg-surface-700/50  pl-4 cursor-pointer hover:bg-surface-500"
          class:selected={isSelected}
          on:click={(e) => selectThisCategory(e, entry)}
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
    padding: 0.25rem 0.6rem;
  }

  .category-entry.selected {
    @apply bg-primary-500;
  }
</style>
