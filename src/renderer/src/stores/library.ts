import type { IMod, ModId } from 'shared'
import { derived, writable } from 'svelte/store'
import { arraysShareValues } from '../utils'
import { modManifest } from './manifest'

type SortingType = 'name_asc' | 'name_desc' | 'time_oldest' | 'time_newest'
type TypeOfMod = 'any' | 'enabled' | 'disabled' | 'conflicting' | 'corrupt'
export const typeToShow = writable<TypeOfMod>('any')
export const sortingType = writable<SortingType>('name_asc')
export const perPageCount = writable('30')

export const searchTerm = writable('')
export const selectedGuns = writable<string[]>([])
export const selectedMelees = writable<string[]>([])
export const selectedGrenades = writable<string[]>([])
export const selectedUtils = writable<string[]>([])
export const selectedSurvivors = writable<string[]>([])
export const selectedInfected = writable<string[]>([])
export const selectedMisc = writable<string[]>([])

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
    modManifest
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
    $modManifest
  ]) => {
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

    Object.keys($modManifest).map((keyName: string) => {
      let modName =
        $modManifest[keyName]?.addontitle ??
        //profileAllOnlineAddoninfos[keyName]?.title ??
        $modManifest[keyName].id
      let thisMod = $modManifest[keyName] as IMod

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

      tempStorage.push(thisMod)
    })

    return tempStorage
  }
)

export const sortedFilteredMods = derived(
  [filteredMods, sortingType, perPageCount],
  ([$filteredMods, $sortingType, $perPageCount]) => {
    let tempStorage: IMod[] = $filteredMods

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
        (a: IMod, b: IMod) => Date.parse(a.timeModified) - Date.parse(b.timeModified)
      )
    }

    if ($sortingType == 'time_newest') {
      tempStorage = tempStorage.sort(
        (a: IMod, b: IMod) => Date.parse(b.timeModified) - Date.parse(a.timeModified)
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
