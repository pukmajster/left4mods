<script lang="ts">
  import type { IMod } from 'shared'
  import { enabledMods, groupedEnabledMods, modIdToOverview, selectedMods } from '../stores/library'
  import { toggleModInCurrentPresetSafe } from '../stores/profile'

  import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
  import { CheckCircle2 } from 'lucide-svelte'
  export let mod: IMod

  let showHoverbox = false

  function handleClick(e: MouseEvent) {
    if (!e.ctrlKey) {
      if (!userIsSelecting) {
        toggleModEnable()
        return
      }
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

  $: selected = $selectedMods.includes(mod.id)
  $: enabled = $enabledMods.includes(mod.id)
  $: otherModsSelectedButNotThisOne = $selectedMods.some((id) => id != mod.id)
  $: userIsSelecting = $selectedMods.length > 0

  $: isGroupEnabled = $groupedEnabledMods.some((group) =>
    group.some((conflictingMod) => conflictingMod.id == mod.id)
  )

  function toggleModEnable() {
    toggleModInCurrentPresetSafe(mod.id)
  }

  function overview() {
    modIdToOverview.set(mod.id)
    const settings: DrawerSettings = { id: 'mod-overview', position: 'right', width: '400px' }
    drawerStore.open(settings)
  }
</script>

<div
  class="mod"
  class:selected
  class:unselected={otherModsSelectedButNotThisOne && !selected}
  class:enabled
  class:conflicting={isGroupEnabled}
  on:click={handleClick}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:contextmenu={overview}
>
  <img
    alt="mod"
    src={`file:///home/kry/.local/share/Steam/steamapps/common/Left%204%20Dead%202/left4dead2/addons/workshop/${mod.id}.jpg`}
  />

  <div class="mod-status-bar  absolute  " />

  {#if showHoverbox && !userIsSelecting}
    <div class="hoverbox backdrop-blur-lg bg-surface-900/70">
      <h6 class="title">{mod.addontitle}</h6>

      <div class="categories">
        {#each mod.categories ?? [] as category}
          <p class="category">{category}</p>
        {/each}
      </div>
    </div>
  {/if}

  {#if selected}<div
      class="selected-overlay absolute inset-0 bg w-full h-full right-0 justify-center items-center flex  "
    >
      <div class="backdrop-blur-lg rounded-full">
        <CheckCircle2 size={64} />
      </div>
    </div>{/if}
</div>

<style lang="postcss">
  .mod {
    --mod-enabled-color: rgb(27, 158, 27);
    --mod-conflicting-color: #ff5151f9;

    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 5px;
    overflow: hidden;

    transition: transform 0.12s ease-in-out;
    cursor: pointer;
    /* background-color: #262847; */
  }

  .mod:hover {
    /* transform: scale(1.06); */
  }

  .title {
    margin-bottom: 4px;
  }

  img {
    aspect-ratio: 5/3;
  }

  .mod.unselected {
    opacity: 0.5;
    transform: scale(0.8);
  }

  .mod.selected {
    outline: 2px solid #6abcffc0;
    border-radius: 2px;
    opacity: 0.9;

    box-shadow: 0 0 16px 3px #ffffff23;
  }

  .mod-status-bar {
    height: 6px;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .mod.enabled .mod-status-bar {
    background: var(--mod-enabled-color);
    box-shadow: 0 0 16px 6px #3bdf3e55;
  }

  .mod.enabled.conflicting .mod-status-bar {
    border-bottom: 6px solid var(--mod-conflicting-color);
    box-shadow: 0 0 16px 6px #ff515169;
  }

  .hoverbox {
    pointer-events: none;
    position: absolute;
    left: 0;
    bottom: 0;
    /* top: 100%; */
    right: 0px;
    padding: 0.45em;
    padding-top: 0.3em;
  }

  .categories {
    position: relative;
    left: 0;
    top: 100%;
    right: 0;

    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .category {
    padding: 0 6px;
    background-color: rgba(180, 180, 183, 0.141);
    border-radius: 2px;
  }

  .author,
  .version,
  .categories p {
    font-size: 9px;
  }
</style>
