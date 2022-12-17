import type { IMod, ModId } from 'shared'
import { writable } from 'svelte/store'

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
export const filteredMods = writable<IMod[]>([])
export const sortedFiltedMods = writable<IMod[]>([])
