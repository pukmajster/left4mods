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
    selectedGuns.set([])
    selectedMelees.set([])
    selectedGrenades.set([])
    selectedUtils.set([])
    selectedSurvivors.set([])
    selectedInfected.set([])
    selectedMisc.set([])
  }
</script>

<div
  on:click={setVisiblePanel}
  class="button flex justify-center items-center mb-2 "
  class:selected={$visibleFilterPanel == categoryName}
>
  <img src="l4d-icons/coach.png" />
</div>

<style>
  .button {
    cursor: pointer;
  }

  .button.selected {
    cursor: pointer;
    border-radius: 2px;
    border: 3px solid white;
  }

  img {
    aspect-ratio: 1/1;
  }
</style>
