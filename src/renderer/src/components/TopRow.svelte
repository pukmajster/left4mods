<script lang="ts">
  import classnames from 'classnames'
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
    darkMode,
    selectedCollectionName
  } from '../stores/profile'
  import ToggleViewButton from './ToggleViewButton.svelte'

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

<div
  class={`root backdrop-blur-md sticky top-0 -bg-surface-50-900-token  p-4 pb-4 w-full flex justify-between gap-4 flex-col-reverse lg:flex-row lg:gap-2 ${classnames(
    $darkMode ? 'bg-surface-900/90' : 'bg-surface-50/70'
  )}`}
>
  <div class=" flex  gap-4 z-10  flex-col flex-1">
    {#if !$showConflictingView}
      <div class=" flex-col md:flex-row  items-start flex-1 flex justify-start  gap-2">
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

      <div class="actions">
        <div class="flex flex-wrap   gap-2 ">
          <button class="btn btn-sm btn-filled-surface" on:click={handleSelectedButtonClick}
            >Selected: {$selectedMods.length}</button
          >
          <!-- <button on:click={unselectAll} class="btn btn-sm btn-filled-surface">unselect all</button>
      <button on:click={selectAll} class="btn btn-sm btn-filled-surface">select visible</button> -->

          {#if $selectedMods.length > 0}
            <button on:click={_batchEnableSelectedMods} class="btn btn-sm btn-filled-primary"
              >enable selected</button
            >
            <button on:click={_batchDisableSelectedMods} class="btn btn-sm btn-filled-primary"
              >disable selected</button
            >
            <!-- <select bind:value={batchCollectionName}>
            {#each $collections as collection}
              <option value={collection.id}>{collection.id}</option>
            {/each}
          </select> -->

            {#if $selectedCollectionName == ''}
              <button on:click={_batchAddModsToCollection} class="btn btn-sm btn-filled-primary"
                >add selected to collection</button
              >
            {/if}

            {#if $selectedCollectionName != ''}
              <button
                on:click={_batchRemoveModsFromCollection}
                class="btn btn-sm btn-filled-primary">remove selected from collection</button
              >
            {/if}
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <div class="flex justify-start lg:justify-end">
    <div><ToggleViewButton /></div>
  </div>
</div>

<style lang="postcss">
  select {
  }

  .root {
    z-index: 2;
  }
</style>
