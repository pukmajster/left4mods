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
  class="button flex justify-center items-center "
  class:selected={$visibleFilterPanel == categoryName}
>
  <img src={`icons/${categoryName}2.png`} />
</div>

<style>
  .button {
    cursor: pointer;
    aspect-ratio: 1/1;
  }

  .button.selected {
    cursor: pointer;
    border-radius: 4px;
    border: 3px solid transparent;
    background-color: rgb(0, 0, 0);
    transform: scale(1.2);
    filter: invert(100%);
  }

  img {
    aspect-ratio: 1/1;
  }
</style>
