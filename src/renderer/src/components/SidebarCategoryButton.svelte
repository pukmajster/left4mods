<script lang="ts">
  import { AppRailTile } from '@skeletonlabs/skeleton'
  import { ArrowDownCircle, FileQuestion } from 'lucide-svelte'
  import { activeCategoriesToFilterBy, visibleFilterPanel } from '../stores/library'
  import { darkMode } from '../stores/profile'

  export let categoryName: string
  export let label: string
  export let image: string

  function clearCategorySelection() {
    activeCategoriesToFilterBy.set([])
  }

  $: capitalizedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
</script>

<!-- <div
  on:click={setVisiblePanel}
  class="button flex justify-center items-center p-1"
  class:selected={$visibleFilterPanel == categoryName}
>
  <img src={`icons/${categoryName}2.png`} />
</div>
 -->
<AppRailTile on:click={clearCategorySelection} {label} title={label} value={categoryName}>
  {#if categoryName == 'all'}
    <ArrowDownCircle size={28} />
  {:else if categoryName == '?'}
    <FileQuestion size={28} />
  {:else}
    <img
      class:lightMode={!$darkMode && $visibleFilterPanel != categoryName}
      width="32px"
      src={image}
      alt={capitalizedCategoryName}
    />
  {/if}
</AppRailTile>

<style global>
  button {
    text-transform: capitalize;
  }

  img.lightMode {
    filter: invert(100%);
  }
</style>
