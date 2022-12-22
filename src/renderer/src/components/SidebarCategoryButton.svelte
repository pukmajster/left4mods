<script lang="ts">
  import { AppRailTile } from '@skeletonlabs/skeleton'
  import {
    selectedGrenades,
    selectedGuns,
    selectedInfected,
    selectedMelees,
    selectedMisc,
    selectedMods,
    selectedSurvivors,
    selectedUtils,
    visibleFilterPanel
  } from '../stores/library'

  export let categoryName: string

  function setVisiblePanel() {
    clearCategorySelection()
    selectedMods.set([])
    visibleFilterPanel.set(categoryName)
  }

  function clearCategorySelection() {
    selectedGuns.set('')
    selectedMelees.set('')
    selectedGrenades.set('')
    selectedUtils.set('')
    selectedSurvivors.set('')
    selectedInfected.set('')
    selectedMisc.set('')
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
<AppRailTile label={capitalizedCategoryName} title={categoryName} value={categoryName}>
  <img width="32px" src={`icons/${categoryName}2.png`} />
</AppRailTile>

<style>
  button {
    text-transform: capitalize;
  }

  /*   .button {
    cursor: pointer;
    aspect-ratio: 1/1;
    border-radius: 4px;

    transition: background-color 0.1s ease-in-out;
  }

  .button:hover {
    @apply bg-surface-900;
  }

  .button.selected {
    cursor: pointer;

    border: 2px solid transparent;
    background-color: rgb(255, 255, 255);
  }

  img {
    aspect-ratio: 1/1;
  }

  .button.selected img {
    filter: invert(100%);
    transform: scale(1.2);
  } */
</style>
