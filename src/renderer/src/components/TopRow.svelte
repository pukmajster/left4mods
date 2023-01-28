<script lang="ts">
  import { SlideToggle } from '@skeletonlabs/skeleton'
  import classnames from 'classnames'
  import { bridgedApi } from '../api/api'
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
    addToList,
    batchAddModsToCollection,
    batchDisableModsInCurrentPreset,
    batchEnableModsInCurrentPreset,
    batchRemoveModsFromCollection,
    darkMode,
    hiddenMods,
    ignoreAllVguiIconConflicts,
    removeFromList,
    selectedCollectionName
  } from '../stores/profile'
  import ToggleViewButton from './ToggleViewButton.svelte'
  import VscriptAlert from './VscriptAlert.svelte'

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
  }

  function handleSelectedButtonClick() {
    if ($selectedMods.length > 0) {
      unselectAll()
    } else selectAll()
  }

  function _batchOpenModsInBrowser() {
    for (let modId of $selectedMods)
      window.api.openLinkInBrowser(
        `https://steamcommunity.com/sharedfiles/filedetails/?id=${modId}`
      )
    clearSelection()
  }

  function _batchUnsubscribeMods() {
    for (let modId of $selectedMods) bridgedApi.unsubscribeFromMod(modId)
    clearSelection()
  }

  function _batchHideMods() {
    for (let modId of $selectedMods) addToList(hiddenMods, modId)
    clearSelection()
  }

  function _batchUnhideMods() {
    for (let modId of $selectedMods) removeFromList(hiddenMods, modId)
    clearSelection()
  }
</script>

<div
  class={`root backdrop-blur-md sticky top-0 -bg-surface-50-900-token  p-4  w-full flex justify-between gap-4 flex-col lg:gap-2 ${classnames(
    $darkMode ? 'bg-surface-900/90' : 'bg-surface-50/70'
  )}`}
>
  <div class={`flex justify-between gap-4 flex-col-reverse lg:flex-row lg:gap-2 `}>
    <div class=" flex  gap-4 z-10  flex-col flex-1">
      {#if !$showConflictingView}
        <div class=" flex-col md:flex-row  items-start flex-1 flex justify-start gap-2">
          <select style="max-width: 100px;" bind:value={$perPageCount}>
            <option value={'30'}>30</option>
            <option value={'50'}>50</option>
            <option value={'100'}>100</option>
            <option value={'300'}>300</option>
            <option value={'500'}>500</option>
            <option value={'9999'}>All</option>
          </select>

          <select style="max-width: 210px;  w-full" bind:value={$sortingType}>
            <option value="name_asc">Name (Ascending)</option>
            <option value="name_desc">Name (Descending)</option>
            <option value="time_newest">Time Modified (Latest)</option>
            <option value="time_oldest">Time Modified (Oldest)</option>
            <option value="size_biggest">Size (Largest)</option>
            <option value="size_smallest">Size (Smallest)</option>
          </select>

          <select style="max-width: 130px;" bind:value={$typeToShow}>
            <option value="any">Any</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
            <option value="hidden">Hidden</option>
            <option value="uninstalled">Uninstalled</option>
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
                >Enable selected</button
              >
              <button on:click={_batchDisableSelectedMods} class="btn btn-sm btn-filled-primary"
                >Disable selected</button
              >

              <button on:click={_batchUnsubscribeMods} class="btn btn-sm btn-filled-primary"
                >Unsubscribe</button
              >
              <!-- <select bind:value={batchCollectionName}>
            {#each $collections as collection}
              <option value={collection.id}>{collection.id}</option>
            {/each}
          </select> -->

              {#if $selectedCollectionName == ''}
                <button on:click={_batchAddModsToCollection} class="btn btn-sm btn-filled-primary"
                  >Add to collection</button
                >
              {/if}

              {#if $selectedCollectionName != ''}
                <button
                  on:click={_batchRemoveModsFromCollection}
                  class="btn btn-sm btn-filled-primary">Remove from collection</button
                >
              {/if}

              <button on:click={_batchOpenModsInBrowser} class="btn btn-sm btn-filled-primary"
                >Open in browser</button
              >

              {#if $typeToShow == 'hidden'}
                <button on:click={_batchUnhideMods} class="btn btn-sm btn-filled-primary"
                  >Unhide</button
                >
              {:else}
                <button on:click={_batchHideMods} class="btn btn-sm btn-filled-primary">Hide</button
                >
              {/if}
            {/if}
          </div>
        </div>
      {/if}

      {#if $showConflictingView}
        <SlideToggle bind:checked={$ignoreAllVguiIconConflicts}>Ignore VGUI Conflicts</SlideToggle>
      {/if}
    </div>

    <div class="flex justify-start lg:justify-end">
      <div><ToggleViewButton /></div>
    </div>
  </div>

  <VscriptAlert />
</div>

<style lang="postcss">
  select {
  }

  .root {
    z-index: 2;
  }
</style>
