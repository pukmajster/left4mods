import type { IMod, ModId } from 'shared'
import { derived, writable } from 'svelte/store'
import { arraysShareValues } from '../utils'
import { modManifest } from './manifest'
import { activePreset, collections, presets, selectedCollectionName } from './profile'

type SortingType = 'name_asc' | 'name_desc' | 'time_oldest' | 'time_newest'
type TypeOfMod = 'any' | 'enabled' | 'disabled'
export const typeToShow = writable<TypeOfMod>('any')
export const sortingType = writable<SortingType>('name_asc')
export const perPageCount = writable('50')

export const showConflictingView = writable(false)
export const onlyShowModsNotInAnyCollection = writable(false)

export const searchTerm = writable('')
export const selectedGuns = writable<string>('')
export const selectedMelees = writable<string>('')
export const selectedGrenades = writable<string>('')
export const selectedUtils = writable<string>('')
export const selectedSurvivors = writable<string>('')
export const selectedInfected = writable<string>('')
export const selectedMisc = writable<string>('')

export const selectedGuns_multi = writable<string[]>([])
export const selectedMelees_multi = writable<string[]>([])
export const selectedGrenades_multi = writable<string[]>([])
export const selectedUtils_multi = writable<string[]>([])
export const selectedSurvivors_multi = writable<string[]>([])
export const selectedInfected_multi = writable<string[]>([])
export const selectedMisc_multi = writable<string[]>([])

export const visibleFilterPanel = writable('guns')

export const modIdToOverview = writable<ModId>('99999999999')

export const enabledMods = derived(
  [modManifest, presets, activePreset],
  ([$modManifest, $presets, $activePreset]) => {
    let tempStorage: ModId[] = []

    let activePreset = $presets.find((preset) => preset.name == $activePreset)

    if (!activePreset) return tempStorage

    activePreset.enabledMods.map((modId) => {
      if ($modManifest[modId]) {
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
    selectedGuns,
    selectedGrenades,
    selectedMelees,
    selectedUtils,
    selectedSurvivors,
    selectedInfected,
    selectedMisc,
    modManifest,
    typeToShow,
    enabledMods,
    onlyShowModsNotInAnyCollection,
    collections,
    selectedCollectionName
  ],
  ([
    $searchTerm,
    $selectedGuns,
    $selectedGrenades,
    $selectedMelees,
    $selectedUtils,
    $selectedSurvivors,
    $selectedInfected,
    $selectedMisc,
    $modManifest,
    $typeToShow,
    $enabledMods,
    $onlyShowModsNotInAnyCollection,
    $collections,
    $selectedCollectionName
  ]) => {
    let tempStorage: IMod[] = []

    let allFilters = [
      $selectedGuns,
      $selectedMelees,
      $selectedGrenades,
      $selectedSurvivors,
      $selectedInfected,
      $selectedUtils,
      $selectedMisc
    ].filter((filter) => filter != '')

    Object.keys($modManifest).map((keyName: string) => {
      let modName =
        $modManifest[keyName]?.addontitle ??
        //profileAllOnlineAddoninfos[keyName]?.title ??
        $modManifest[keyName].id
      let thisMod = $modManifest[keyName] as IMod

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

      if (allFilters.length > 0) {
        if (thisMod.categories == undefined) return
        let sharedCats = arraysShareValues(allFilters, thisMod.categories)
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
      let modsInCollection = $collections.find(
        (collection) => collection.name == $selectedCollectionName
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

    return tempStorage
  }
)

export const paginatedSortedFilteredMods = derived(
  [sortedFilteredMods, perPageCount],
  ([$sortedFilteredMods, $perPageCount]) => {
    let tempStorage: IMod[] = $sortedFilteredMods

    return tempStorage.slice(0, parseInt($perPageCount))
  }
)

// Group enabled mods that share indentical files
export const groupedEnabledMods = derived(
  [enabledMods, modManifest],
  ([$enabledMods, $modManifest]) => {
    let tempStorage: IMod[][] = []

    $enabledMods.map((modId) => {
      let thisMod = $modManifest[modId] as IMod

      let foundGroup = false

      tempStorage.map((group) => {
        if (arraysShareValues(group[0].files, thisMod.files)) {
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
