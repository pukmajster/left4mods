<script lang="ts">
  import type { IMod } from 'shared'
  import { enabledMods, selectedMods } from '../stores/library'
  import { activePreset, presets } from '../stores/profile'

  export let mod: IMod

  function handleClick(e: MouseEvent) {
    if (!e.ctrlKey) {
      toggleModEnable()
      return
    }

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

  function openModInBrowser() {
    window.api.openLinkInBrowser(`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.id}`)
  }

  $: selected = $selectedMods.includes(mod.id)
  $: enabled = $enabledMods.includes(mod.id)

  function toggleModEnable() {
    console.log('toggling mod')

    presets.update((value) => {
      let tempPresets = [...value]
      console.log(tempPresets)

      if (!enabled)
        tempPresets.find((preset) => preset.name == $activePreset).enabledMods.push(mod.id)
      else {
        let tempEnabledMods = tempPresets
          .find((preset) => preset.name == $activePreset)
          .enabledMods.filter((id) => id != mod.id)

        tempPresets.find((preset) => preset.name == $activePreset).enabledMods = tempEnabledMods
      }

      console.log('new', tempPresets)
      return tempPresets
    })
  }
</script>

<div
  class="mod"
  class:selected
  class:enabled
  on:click={handleClick}
  on:mouseenter={handleShiftMouseEnter}
  on:contextmenu={openModInBrowser}
>
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

  .mod.enabled {
    color: green;
  }
</style>
