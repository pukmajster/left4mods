<script lang="ts">
  import type { IMod, IModManifest } from 'shared'
  import {
    searchTerm,
    selectedGrenades,
    selectedGuns,
    selectedInfected,
    selectedMelees,
    selectedMisc,
    selectedSurvivors,
    selectedUtils,
    sortingType
  } from '../stores/library'
  import { modManifest } from '../temp'
  import { arraysShareValues } from '../utils'
  import ModCard from './ModCard.svelte'
  import Sidebar from './Sidebar.svelte'
  import TopRow from './TopRow.svelte'

  let mods: IModManifest = modManifest

  $: modsList = (function () {
    let tempStorage: IMod[] = []

    let allFilters = $selectedGuns
      .concat(
        $selectedMelees,
        $selectedGrenades,
        $selectedSurvivors,
        $selectedInfected,
        $selectedUtils,
        $selectedMisc
      )
      .filter((filter) => filter != '')

    Object.keys(mods).map((keyName: string) => {
      let modName =
        mods[keyName]?.addontitle ??
        //profileAllOnlineAddoninfos[keyName]?.title ??
        mods[keyName].id
      let thisMod = mods[keyName] as IMod

      // Make sure the mod's title fits the search term
      if (searchTerm) {
        if (!modName) return
        if (!modName.toLowerCase().includes($searchTerm.toLowerCase())) return
      }

      if (allFilters.length > 0) {
        if (thisMod.categories == undefined) return
        let sharedCats = arraysShareValues(allFilters, thisMod.categories)
        if (!sharedCats) return
      }

      tempStorage.push(thisMod)

      if ($sortingType == 'name_asc') {
        tempStorage = tempStorage.sort((a: IMod, b: IMod) =>
          (a?.addontitle ?? a.id).localeCompare(b.addontitle ?? a.id)
        )
      }

      if ($sortingType == 'name_desc') {
        tempStorage = tempStorage.sort((a: IMod, b: IMod) =>
          (b?.addontitle ?? '').localeCompare(a.addontitle ?? '')
        )
      }

      if ($sortingType == 'time_oldest') {
        tempStorage = tempStorage.sort(
          (a: IMod, b: IMod) => Date.parse(a.timeModified) - Date.parse(b.timeModified)
        )
      }

      if ($sortingType == 'time_newest') {
        tempStorage = tempStorage.sort(
          (a: IMod, b: IMod) => Date.parse(b.timeModified) - Date.parse(a.timeModified)
        )
      }
    })

    return tempStorage
  })()
</script>

<ul class="library">
  <Sidebar />
  <div class="mods-wrapper">
    <TopRow />
    <div class="mods-inner">
      <div class="mods-list">
        {#each modsList as mod}
          <ModCard {mod} />
        {/each}
      </div>
    </div>
  </div>
</ul>

<style>
  .library {
    display: grid;
    grid-template-columns: 260px 1fr;
    position: relative;

    width: 100vw;
    height: calc(100vh - 64px);
    overflow: hidden;
  }

  .library,
  .library * {
    user-select: none;
  }

  .mods-wrapper {
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .mods-inner {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    flex: 1;
  }

  .mods-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(182px, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
    align-items: stretch;

    gap: 12px;
    padding: 1em;
    padding-left: 0.5em;

    height: 600px;
  }
</style>
