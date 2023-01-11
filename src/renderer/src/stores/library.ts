import type { IMod, ModId } from 'shared'
import { derived, writable } from 'svelte/store'
import { arraysShareValues } from '../utils'
import { modManifest } from './manifest'
import {
  activePreset,
  collections,
  ignoreAllVguiIconConflicts,
  presets,
  selectedCollectionName
} from './profile'

type SortingType =
  | 'name_asc'
  | 'name_desc'
  | 'time_oldest'
  | 'time_newest'
  | 'size_smallest'
  | 'size_biggest'
type TypeOfMod = 'any' | 'enabled' | 'disabled'
export const typeToShow = writable<TypeOfMod>('any')
export const sortingType = writable<SortingType>('name_asc')
export const perPageCount = writable('50')

export const showConflictingView = writable(false)
export const onlyShowModsNotInAnyCollection = writable(false)
export const searchTerm = writable('')
export const activeCategoriesToFilterBy = writable<string[]>([])
export const visibleFilterPanel = writable('all')

export const modIdToOverview = writable<ModId>('99999999999')

export const enabledMods = derived(
  [modManifest, presets, activePreset],
  ([$modManifest, $presets, $activePreset]) => {
    const tempStorage: ModId[] = []
    const activePreset = $presets.find((preset) => preset.id == $activePreset)

    if (!activePreset) return tempStorage

    activePreset.enabledMods.map((modId) => {
      if ($modManifest.mods[modId]) {
        tempStorage.push(modId)
      }
    })

    return tempStorage
  }
)

export const selectedMods = writable<ModId[]>([])

export const filteredMods = derived(
  [
    searchTerm,
    activeCategoriesToFilterBy,

    modManifest,
    typeToShow,
    enabledMods,
    onlyShowModsNotInAnyCollection,
    collections,
    selectedCollectionName,
    visibleFilterPanel
  ],
  ([
    $searchTerm,
    $activeCategoriesToFilterBy,
    $modManifest,
    $typeToShow,
    $enabledMods,
    $onlyShowModsNotInAnyCollection,
    $collections,
    $selectedCollectionName,
    $visibleFilterPanel
  ]) => {
    const tempStorage: IMod[] = []

    const allFilters = $activeCategoriesToFilterBy.filter((filter) => filter != '')

    Object.keys($modManifest.mods).map((keyName: string) => {
      const modName =
        $modManifest.mods[keyName]?.addontitle ??
        //profileAllOnlineAddoninfos[keyName]?.title ??
        $modManifest.mods[keyName].id
      const thisMod = $modManifest.mods[keyName] as IMod

      // Check for mod type
      switch ($typeToShow) {
        case 'any':
          break
        case 'enabled':
          if (!$enabledMods.includes(thisMod.id)) return
          break
        case 'disabled':
          if ($enabledMods.includes(thisMod.id)) return
          break
      }

      // Make sure the mod's title fits the search term
      if ($searchTerm) {
        if (!modName) return
        if (!modName.toLowerCase().includes($searchTerm.toLowerCase())) return
      }

      if ($visibleFilterPanel == 'campaign') {
        if (thisMod.categories == undefined) return
        if (!thisMod.categories.includes('campaign')) return
      } else if ($visibleFilterPanel == '?') {
        if (thisMod.categories.length > 0) return
      } else if (allFilters.length > 0) {
        if (thisMod.categories == undefined) return
        const sharedCats = arraysShareValues(allFilters, thisMod.categories)
        if (!sharedCats) return
      }

      if ($onlyShowModsNotInAnyCollection && $selectedCollectionName == '') {
        if ($collections.find((collection) => collection.mods.includes(thisMod.id))) return
      }

      tempStorage.push(thisMod)
    })

    return tempStorage
  }
)

export const sortedFilteredMods = derived(
  [filteredMods, sortingType, selectedCollectionName, collections],
  ([$filteredMods, $sortingType, $selectedCollectionName, $collections]) => {
    let tempStorage: IMod[] = $filteredMods

    if ($selectedCollectionName != '') {
      const modsInCollection = $collections.find(
        (collection) => collection.id == $selectedCollectionName
      )?.mods

      tempStorage = tempStorage.filter((mod) => modsInCollection?.includes(mod.id))
    }

    if ($sortingType == ('name_asc' as SortingType)) {
      tempStorage = tempStorage.sort((a: IMod, b: IMod) =>
        (a?.addontitle ?? a.id).localeCompare(b?.addontitle ?? b.id)
      )
    }

    if ($sortingType == 'name_desc') {
      tempStorage = tempStorage.sort((a: IMod, b: IMod) =>
        (b?.addontitle ?? b.id).localeCompare(a.addontitle ?? a.id)
      )
    }

    if ($sortingType == 'time_oldest') {
      tempStorage = tempStorage.sort(
        (a: IMod, b: IMod) => Date.parse(a.timemodified) - Date.parse(b.timemodified)
      )
    }

    if ($sortingType == 'time_newest') {
      tempStorage = tempStorage.sort(
        (a: IMod, b: IMod) => Date.parse(b.timemodified) - Date.parse(a.timemodified)
      )
    }

    if ($sortingType == 'size_smallest') {
      tempStorage = tempStorage.sort((a: IMod, b: IMod) => a.vpksize - b.vpksize)
    }

    if ($sortingType == 'size_biggest') {
      tempStorage = tempStorage.sort((a: IMod, b: IMod) => b.vpksize - a.vpksize)
    }

    return tempStorage
  }
)

export const paginatedSortedFilteredMods = derived(
  [sortedFilteredMods, perPageCount],
  ([$sortedFilteredMods, $perPageCount]) => {
    const tempStorage: IMod[] = $sortedFilteredMods

    return tempStorage.slice(0, parseInt($perPageCount))
  }
)

// Group enabled mods that share indentical files
export const groupedEnabledMods = derived(
  [enabledMods, modManifest, ignoreAllVguiIconConflicts],
  ([$enabledMods, $modManifest, $ignoreAllVguiIconConflicts]) => {
    let tempStorage: IMod[][] = []

    $enabledMods.map((modId) => {
      const thisMod = $modManifest.mods[modId] as IMod

      let foundGroup = false

      tempStorage.map((group) => {
        let files = thisMod.files

        if ($ignoreAllVguiIconConflicts) {
          console.log('ignoring vgui conflicts')

          files = files.filter((file) => !file.includes('materials/vgui/'))
        }

        if (arraysShareValues(group[0].files, files)) {
          group.push(thisMod)
          foundGroup = true
        }
      })

      if (!foundGroup) {
        tempStorage.push([thisMod])
      }
    })

    tempStorage = tempStorage.filter((group) => group.length > 1)

    return tempStorage
  }
)

export const totalConflictingMods = derived([groupedEnabledMods], ([$groupedEnabledMods]) => {
  let tempStorage = 0

  $groupedEnabledMods.map((group) => {
    tempStorage += group.length
  })

  return tempStorage
})
