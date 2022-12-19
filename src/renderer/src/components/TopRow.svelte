<script lang="ts">
  import {
    paginatedSortedFilteredMods,
    perPageCount,
    selectedMods,
    showConflictingView,
    sortingType,
    totalConflictingMods,
    typeToShow
  } from '../stores/library'
  import {
    batchAddModsToCollection,
    batchDisableModsInCurrentPreset,
    batchEnableModsInCurrentPreset,
    batchRemoveModsFromCollection,
    collections
  } from '../stores/profile'

  function unselectAll() {
    selectedMods.set([])
  }

  function selectAll() {
    selectedMods.set($paginatedSortedFilteredMods.map((mod) => mod.id))
  }

  function toggleView() {
    $showConflictingView = !$showConflictingView
  }

  function _batchEnableSelectedMods() {
    batchEnableModsInCurrentPreset($selectedMods)
    clearSelection()
  }

  function _batchDisableSelectedMods() {
    batchDisableModsInCurrentPreset($selectedMods)
    clearSelection()
  }

  function _batchAddModsToCollection() {
    batchAddModsToCollection($selectedMods, batchCollectionName)
    clearSelection()
  }

  function _batchRemoveModsToCollection() {
    batchRemoveModsFromCollection($selectedMods, batchCollectionName)
    clearSelection()
  }

  function clearSelection() {
    selectedMods.set([])
    batchCollectionName = ''
  }

  let batchCollectionName = ''
</script>

<div class=" sticky top-0 bg-surface-50-900-token z-50 w-full flex justify-between p-4">
  <div>
    <button on:click={toggleView}>
      {#if $showConflictingView}
        Show all
      {:else}
        Show {$totalConflictingMods} conflicting
      {/if}
    </button>
  </div>

  {#if !$showConflictingView}
    <div class="flex">
      <select bind:value={$perPageCount}>
        <option value={'30'}>30</option>
        <option value={'50'}>50</option>
        <option value={'100'}>100</option>
        <option value={'300'}>300</option>
        <option value={'999'}>All</option>
      </select>

      <select bind:value={$sortingType}>
        <option value="name_asc">Name (Ascending)</option>
        <option value="name_desc">Name (Descending)</option>
        <option value="time_newest">Time modified (latest)</option>
        <option value="time_oldest">Time modified (oldest)</option>
      </select>

      <select bind:value={$typeToShow}>
        <option value="any">Any</option>
        <option value="enabled">Enabled</option>
        <option value="disabled">Disabled</option>
      </select>
    </div>
  {/if}

  <div class="actions">
    <span>selected: {$selectedMods.length}</span>
    <div>
      <button on:click={unselectAll}>unselect all</button>
      <button on:click={selectAll}>select visible</button>
    </div>

    {#if $selectedMods.length > 0}
      <div>
        <button on:click={_batchEnableSelectedMods}>enable selected</button>
        <button on:click={_batchDisableSelectedMods}>disable selected</button>
        <div>
          <select bind:value={batchCollectionName}>
            {#each $collections as collection}
              <option value={collection.name}>{collection.name}</option>
            {/each}
          </select>
          <button on:click={_batchAddModsToCollection}>add selected to collection</button>
          <button on:click={_batchRemoveModsToCollection}>remove selected from collection</button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;

    padding: 1em;
  }
</style>
