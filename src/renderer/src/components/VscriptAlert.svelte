<script lang="ts">
  import { Alert } from '@skeletonlabs/skeleton'
  import { AlertTriangle } from 'lucide-svelte'
  import type { IMod } from 'shared'
  import {
    activeCategoriesToFilterBy,
    enabledMods,
    searchTerm,
    showConflictingView,
    typeToShow,
    visibleFilterPanel
  } from '../stores/library'
  import { modManifest } from '../stores/manifest'
  import { selectedCollectionName } from '../stores/profile'

  // ------------------------------------
  //  VScript warning
  // ------------------------------------

  let presetContainsVScriptMods = false

  $: $enabledMods && $modManifest && checkForVScriptMods()

  function checkForVScriptMods() {
    let modsToCheck: IMod[] = []
    for (let id of $enabledMods) {
      modsToCheck.push($modManifest.mods[id])
    }

    presetContainsVScriptMods = modsToCheck.some((mod) => mod?.categories.includes('vscript'))
  }

  function showVscriptCategory() {
    visibleFilterPanel.set('misc')
    activeCategoriesToFilterBy.set(['vscript'])
    selectedCollectionName.set('')
    searchTerm.set('')
    typeToShow.set('any')
  }
</script>

<div>
  <Alert
    background="bg-warning-500"
    border="border-warning-400"
    visible={presetContainsVScriptMods && !$showConflictingView}
  >
    <svelte:fragment slot="lead"><AlertTriangle size={32} /></svelte:fragment>
    <svelte:fragment slot="title">VScript mods enabled!</svelte:fragment>
    <span>These mods might cause consistency issues when playing online.</span>
    <svelte:fragment slot="trail">
      <button on:click={showVscriptCategory} class="btn-filled btn btn-sm">View VScript mods</button
      >
    </svelte:fragment>
  </Alert>
</div>

<style>
</style>
