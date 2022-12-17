<script lang="ts">
  import type { IMod } from 'shared'
  import { selectedMods } from '../stores/library'

  export let mod: IMod

  function handleCtrlClick(e: MouseEvent) {
    if (!e.ctrlKey) return

    selectedMods.update((mods) => {
      if (mods.includes(mod.id)) {
        return mods.filter((id) => id != mod.id)
      } else {
        return [...mods, mod.id]
      }
    })
  }

  // handleShiftMouseEnter
  function handleShiftMouseEnter(e: MouseEvent) {
    if (!e.shiftKey) return

    selectedMods.update((mods) => {
      if (mods.includes(mod.id)) {
        return mods.filter((id) => id != mod.id)
      } else {
        return [...mods, mod.id]
      }
    })
  }

  $: selected = $selectedMods.includes(mod.id)
</script>

<div class="mod" class:selected on:click={handleCtrlClick} on:mouseenter={handleShiftMouseEnter}>
  <img
    alt="mod"
    src={`file:///home/kry/.local/share/Steam/steamapps/common/Left%204%20Dead%202/left4dead2/addons/workshop/${mod.id}.jpg`}
  />

  <p class="title">{mod.addontitle}</p>
</div>

<style>
  .mod {
    display: flex;
    flex-direction: column;

    margin-bottom: 5px;

    transition: transform 0.12s ease-in-out;
    padding: 6px;
  }

  .mod:hover {
    background-color: #262847;
    transform: scale(1.06);
  }

  .title {
    margin-top: 5px;
  }

  img {
    aspect-ratio: 5/3;
  }

  .mod.selected {
    background-color: #cfcfcf;
    color: black;
  }
</style>
