<script lang="ts">
  import { AppRailTile } from '@skeletonlabs/skeleton'
  import { ArrowDownCircle } from 'lucide-svelte'
  import {
    selectedGrenades,
    selectedGuns,
    selectedInfected,
    selectedMelees,
    selectedMisc,
    selectedSurvivors,
    selectedUtils,
    visibleFilterPanel
  } from '../stores/library'
  import { darkMode } from '../stores/profile'

  export let categoryName: string
  export let label: string

  function clearCategorySelection() {
    selectedGuns.set('')
    selectedMelees.set('')
    selectedGrenades.set('')
    selectedUtils.set('')
    selectedSurvivors.set('')
    selectedInfected.set('')
    selectedMisc.set('')
  }

  visibleFilterPanel

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
  {#if categoryName == '-'}
    <ArrowDownCircle size={28} />
  {:else}
    <img
      class:lightMode={!$darkMode && $visibleFilterPanel != categoryName}
      width="32px"
      src={`images/icons/${categoryName}2.png`}
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
