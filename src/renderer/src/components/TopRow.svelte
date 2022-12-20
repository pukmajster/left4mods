<script lang="ts">
  import { pickCollection } from '../functions/modals'
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
    batchRemoveModsFromCollection,
    selectedCollectionName
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
    pickCollection((collectionName) => {
      if (!collectionName) return
      batchAddModsToCollection($selectedMods, collectionName)
      clearSelection()
    })
  }

  function _batchRemoveModsFromCollection() {
    if (!$selectedCollectionName) return
    batchRemoveModsFromCollection($selectedMods, $selectedCollectionName)
    clearSelection()
  }

  function clearSelection() {
    selectedMods.set([])
    batchCollectionName = ''
  }

  let batchCollectionName = ''

  function handleSelectedButtonClick() {
    if ($selectedMods.length > 0) {
      unselectAll()
    } else selectAll()
  }
</script>

<div class=" sticky top-0 bg-surface-50-900-token z-10 w-full flex  p-4 gap-4 ">
  {#if !$showConflictingView}
    <div class="actions">
      <div class="flex flex-wrap flex-col justify-between gap-2 ">
        <div>
          <span class="btn btn-sm btn-filled-surface" on:click={handleSelectedButtonClick}
            >Selected: {$selectedMods.length}</span
          >
          <!-- <button on:click={unselectAll} class="btn btn-sm btn-filled-surface">unselect all</button>
        <button on:click={selectAll} class="btn btn-sm btn-filled-surface">select visible</button> -->
        </div>

        {#if $selectedMods.length > 0}
          <div class="flex flex-wrap  gap-1 ">
            <button on:click={_batchEnableSelectedMods} class="btn btn-sm btn-filled-accent"
              >enable selected</button
            >
            <button on:click={_batchDisableSelectedMods} class="btn btn-sm btn-filled-accent"
              >disable selected</button
            >
            <!-- <select bind:value={batchCollectionName}>
              {#each $collections as collection}
                <option value={collection.id}>{collection.id}</option>
              {/each}
            </select> -->

            {#if $selectedCollectionName == ''}
              <button on:click={_batchAddModsToCollection} class="btn btn-sm btn-filled-accent"
                >add selected to collection</button
              >
            {/if}

            {#if $selectedCollectionName != ''}
              <button on:click={_batchRemoveModsFromCollection} class="btn btn-sm btn-filled-accent"
                >remove selected from collection</button
              >
            {/if}
          </div>
        {/if}
      </div>
    </div>

    <div class="items-start flex-1 flex justify-end  gap-2">
      <select style="max-width: 100px;" bind:value={$perPageCount}>
        <option value={'30'}>30</option>
        <option value={'50'}>50</option>
        <option value={'100'}>100</option>
        <option value={'300'}>300</option>
        <option value={'999'}>All</option>
      </select>

      <select style="max-width: 210px;  w-full" bind:value={$sortingType}>
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
