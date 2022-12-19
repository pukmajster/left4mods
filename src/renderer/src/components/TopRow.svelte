<script lang="ts">
  import {
    paginatedSortedFilteredMods,
    perPageCount,
    selectedMods,
    showConflictingView,
    sortingType,
    typeToShow
  } from '../stores/library'
  import {
    batchAddModsToCollection,
    batchDisableModsInCurrentPreset,
    batchEnableModsInCurrentPreset,
    batchRemoveModsFromCollection
  } from '../stores/profile'

  function unselectAll() {
    selectedMods.set([])
  }

  function selectAll() {
    selectedMods.set($paginatedSortedFilteredMods.map((mod) => mod.id))
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

<div class=" sticky top-0 bg-surface-50-900-token z-10 w-full flex justify-between p-4 gap-4 ">
  <div class="actions">
    <div class="flex flex-wrap flex-col justify-between gap-2 ">
      <div>
        <span class="btn btn-sm btn-filled-surface">Selected: {$selectedMods.length}</span>
        <button on:click={unselectAll} class="btn btn-sm btn-filled-surface">unselect all</button>
        <button on:click={selectAll} class="btn btn-sm btn-filled-surface">select visible</button>
      </div>

      {#if $selectedMods.length > 0}
        <div class="grid-cols-2 gir-rows-2 grid  gap-1 ">
          <button on:click={_batchEnableSelectedMods} class="btn btn-sm btn-filled-accent"
            >enable selected</button
          >
          <button on:click={_batchDisableSelectedMods} class="btn btn-sm btn-filled-accent"
            >disable selected</button
          >
          <!-- <select bind:value={batchCollectionName}>
              {#each $collections as collection}
                <option value={collection.name}>{collection.name}</option>
              {/each}
            </select> -->

          <button on:click={_batchAddModsToCollection} class="btn btn-sm btn-filled-accent"
            >add selected to collection</button
          >
          <button on:click={_batchRemoveModsToCollection} class="btn btn-sm btn-filled-accent"
            >remove selected from collection</button
          >
        </div>
      {/if}
    </div>
  </div>

  {#if !$showConflictingView}
    <div class="items-start flex-1 flex  justify-end gap-2">
      <select style="max-width: 100px;" bind:value={$perPageCount}>
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

      <select style="max-width: 130px;" bind:value={$typeToShow}>
        <option value="any">Any</option>
        <option value="enabled">Enabled</option>
        <option value="disabled">Disabled</option>
      </select>
    </div>
  {/if}
</div>

<style lang="postcss">
  select {
    max-width: 200px;
  }
</style>
