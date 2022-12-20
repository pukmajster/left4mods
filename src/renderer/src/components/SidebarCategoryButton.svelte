<script lang="ts">
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

  export let categoryName: string

  function setVisiblePanel() {
    clearCategorySelection()
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
</script>

<div
  on:click={setVisiblePanel}
  class="button flex justify-center items-center p-1"
  class:selected={$visibleFilterPanel == categoryName}
>
  <img src={`icons/${categoryName}2.png`} />
</div>

<style>
  .button {
    cursor: pointer;
    aspect-ratio: 1/1;
    border-radius: 4px;
  }

  .button:hover {
    @apply bg-slate-800;
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
  }
</style>
