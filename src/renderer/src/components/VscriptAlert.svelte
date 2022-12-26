<script lang="ts">
  import { Alert } from '@skeletonlabs/skeleton'
  import { AlertTriangle } from 'lucide-svelte'
  import type { IMod } from 'shared'
  import { enabledMods, searchTerm, selectedMisc, visibleFilterPanel } from '../stores/library'
  import { modManifest } from '../stores/manifest'
  import { selectedCollectionName } from '../stores/profile'

  // ------------------------------------
  //  VScript warning
  // ------------------------------------

  let presetContainsVScriptMods = false

  $: {
    let modsToCheck: IMod[] = []
    for (let id in $enabledMods) {
      modsToCheck.push($modManifest[id])
    }

    presetContainsVScriptMods = modsToCheck.some((mod) => mod?.categories.includes('vscript'))
  }

  function showVscriptCategory() {
    visibleFilterPanel.set('misc')
    selectedMisc.set('vscript')
    selectedCollectionName.set('')
    searchTerm.set('')
  }
</script>

<Alert
  background="bg-yellow-500/50"
  border="border-warning-400"
  visible={presetContainsVScriptMods}
>
  <svelte:fragment slot="lead"><AlertTriangle size={32} /></svelte:fragment>
  <svelte:fragment slot="title">VScript mods enabled!</svelte:fragment>
  <span>You won't be able to play online as long as these are enabled.</span>
  <svelte:fragment slot="trail">
    <button on:click={showVscriptCategory} class="btn-filled btn btn-sm">View VScript mods</button>
  </svelte:fragment>
</Alert>
