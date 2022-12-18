<script lang="ts">
  import type { IMod } from 'shared'
  import { enabledMods, groupedEnabledMods, selectedMods } from '../stores/library'
  import { activePreset, presets } from '../stores/profile'

  export let mod: IMod

  let showHoverbox = false

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
  function handleMouseEnter(e: MouseEvent) {
    showHoverbox = true

    if (!e.shiftKey) return
    if (!e.ctrlKey) return

    selectedMods.update((mods) => {
      if (mods.includes(mod.id)) {
        return mods.filter((id) => id != mod.id)
      } else {
        return [...mods, mod.id]
      }
    })
  }

  // handleMouseLeave
  function handleMouseLeave() {
    showHoverbox = false
  }

  function openModInBrowser() {
    window.api.openLinkInBrowser(`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.id}`)
  }

  $: selected = $selectedMods.includes(mod.id)
  $: enabled = $enabledMods.includes(mod.id)

  $: isGroupEnabled = $groupedEnabledMods.some((group) =>
    group.some((conflictingMod) => conflictingMod.id == mod.id)
  )

  function toggleModEnable() {
    presets.update((value) => {
      let tempPresets = [...value]

      if (!enabled)
        tempPresets.find((preset) => preset.name == $activePreset).enabledMods.push(mod.id)
      else {
        let tempEnabledMods = tempPresets
          .find((preset) => preset.name == $activePreset)
          .enabledMods.filter((id) => id != mod.id)

        tempPresets.find((preset) => preset.name == $activePreset).enabledMods = tempEnabledMods
      }

      return tempPresets
    })
  }
</script>

<div
  class="mod"
  class:selected
  class:enabled
  class:conflicting={isGroupEnabled}
  on:click={handleClick}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:contextmenu={openModInBrowser}
>
  <img
    alt="mod"
    src={`file:///home/kry/.local/share/Steam/steamapps/common/Left%204%20Dead%202/left4dead2/addons/workshop/${mod.id}.jpg`}
  />

  {#if showHoverbox}
    <div class="hoverbox">
      <p class="title">{mod.addontitle}</p>
      {#if mod.addonauthor}<p class="author">By: {mod.addonauthor}</p>{/if}

      <div class="categories">
        {#each mod.categories as category}
          <p class="category">{category}</p>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .mod {
    --mod-enabled-color: rgb(25, 165, 25);
    --mod-conflicting-color: #ff5151f9;

    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 5px;

    transition: transform 0.12s ease-in-out;
    cursor: pointer;
    border-bottom: 6px solid transparent;
    /* background-color: #262847; */
  }

  .mod:hover {
    /* transform: scale(1.06); */
  }

  .title {
    font-size: 14px;
    margin-bottom: 4px;
  }

  img {
    aspect-ratio: 5/3;
  }

  .mod.selected {
    outline: 8px solid #e7d5d5;
    transform: scale(0.8);
    border-radius: 2px;
  }

  .mod.enabled {
    color: var(--mod-enabled-color);
    border-bottom: 6px solid var(--mod-enabled-color);
  }

  .mod.enabled.conflicting {
    color: var(--mod-conflicting-color);
    border-bottom: 6px solid var(--mod-conflicting-color);
  }

  .hoverbox {
    pointer-events: none;
    position: absolute;
    left: 0;
    /*bottom: 0;*/
    top: 100%;
    right: 0px;
    padding: 0.45em;
    padding-top: 0.3em;

    backdrop-filter: blur(20px);
    background-color: #262847c7;
    background-color: #0b0c1be2;

    z-index: 9999;
  }

  .categories {
    position: relative;
    left: 0;
    top: 100%;
    right: 0;
    padding-top: 0.3em;

    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    z-index: 9999;
  }

  .category {
    padding: 5px 6px;
    background-color: rgba(180, 180, 183, 0.141);
    border-radius: 2px;
  }

  .author,
  .version,
  .categories p {
    font-size: 9px;
  }
</style>
