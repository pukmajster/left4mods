<script lang="ts">
  import type { IMod } from 'shared'
  import { enabledMods, groupedEnabledMods, modIdToOverview, selectedMods } from '../stores/library'
  import { gameDir, grayscaleDisabledMods, toggleModInCurrentPresetSafe } from '../stores/profile'

  import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
  import { CheckCircle2, Slash } from 'lucide-svelte'
  import { combinedCategoryToLabelMap } from '../constants/categories'
  import thumbnailFallback from '../constants/thumbnailFallback'
  export let mod: IMod

  let showHoverbox = false

  // Shoutout to https://stackoverflow.com/a/69025425
  $: thumbnail = `file://${$gameDir}/left4dead2/addons/${mod?.fromworkshop ? 'workshop/' : ''}${
    mod.id
  }.jpg`
  const handleMissingThumbnail = (ev) => (ev.target.src = thumbnailFallback)

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

<button
  class="mod"
  class:selected
  class:unselected={otherModsSelectedButNotThisOne && !selected}
  class:enabled
  class:conflicting={isGroupEnabled}
  class:grayscale={!enabled && $grayscaleDisabledMods}
  on:click={handleClick}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:contextmenu={overview}
>
  <img alt="mod" src={thumbnail} on:error={handleMissingThumbnail} />

  <div class="mod-status-bar-overlay absolute inset-0 h-full  overflow-hidden">
    <div class="mod-status-bar  absolute bottom-0 left-0 right-0  " />
    <div class="mod-status-text font-bold absolute bottom-0 left-0 right-0 hidden justify-center">
      {#if isGroupEnabled}
        <p class="flex-1 flex justify-center bg-warning-500/95 p-2 rounded-t-lg  ">
          <span class="flex items-center gap-2"> <Slash size={21} /> Conflicting</span>
        </p>
      {:else if enabled}
        <p class="flex justify-center flex-1 bg-tertiary-600/95 p-2 rounded-t-lg ">
          <span class="flex items-center gap-2"><CheckCircle2 size={21} /> Enabled</span>
        </p>
      {/if}
    </div>
  </div>

  {#if showHoverbox && !userIsSelecting}
    <div class="hoverbox p-3 backdrop-blur-lg bg-surface-900/70">
      <h6 class="title">{mod.addontitle}</h6>

      <div class="categories">
        {#each mod.categories ?? [] as category}
          {#if combinedCategoryToLabelMap[category] !== undefined}
            <p class="category">{combinedCategoryToLabelMap[category]}</p>
          {/if}
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
    </div>
  {/if}
</button>

<style lang="postcss">
  .mod {
    --mod-enabled-color: rgb(27, 158, 27);
    --mod-conflicting-color: #ff5151f9;

    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 5px;

    transition: transform 0.12s ease-in-out;
    cursor: pointer;
  }

  .mod:hover {
    @aapply shadow-2xl shadow-tertiary-500/70 bg-tertiary-500/100;
    /* transform: scale(1.06); */
  }

  .title {
    margin-bottom: 4px;
  }

  img {
    aspect-ratio: 5/3;
    width: 100%;
  }

  .mod.unselected {
    opacity: 0.5;
    transform: scale(0.8);
  }

  .mod.selected {
    outline: 1px solid #6abcffc0;
    @apply outline-primary-500;
    border-radius: 2px;
    opacity: 0.9;

    box-shadow: 0 0 16px 3px #ffffff23;
  }

  .mod-status-bar {
    height: 0px;
  }

  .mod.enabled .mod-status-bar {
    //background: var(--mod-enabled-color);
    box-shadow: 0 0 16px 4px #3bdf3e55;
    @apply shadow-tertiary-500/100 bg-tertiary-500/100;
  }

  .mod.enabled .mod-status-text {
    display: flex;
  }

  .mod.grayscale {
    filter: grayscale(90%);
  }

  .mod.enabled.conflicting .mod-status-bar {
    //border-bottom: 6px solid var(--mod-conflicting-color);
    box-shadow: 0 0 16px 4px #ff515169;
    @apply shadow-warning-400/100 bg-warning-400;
  }

  .hoverbox {
    pointer-events: none;
    position: absolute;
    text-align: left;
    left: 0;
    top: 100%;
    right: 0px;
    z-index: 1;
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
    padding: 4px 8px;
    background-color: rgba(180, 180, 183, 0.141);
    border-radius: 2px;
  }

  .categories p {
    font-size: 14px;
  }
</style>
