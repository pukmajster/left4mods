// @ts-nocheck

import type { IModCollection, IPreset, ModId } from 'shared'
import { get, writable } from 'svelte/store'

export const presets = writable<IPreset[]>([{ id: 'default', label: 'Default', enabledMods: [] }])
export const collections = writable<IModCollection[]>([])

export const activePreset = writable('')
export const selectedCollectionName = writable('') // Not stored in profile
export const disableOnlineFetchingOfModData = writable(false) // Not stored in profile
export const gameDir = writable('')
export const launchParameters = writable('')
export const customCfg = writable('')
export const darkMode = writable(true)
export const hasFinishedFirstTimeSetup = writable(false)
export const grayscaleDisabledMods = writable(false)
export const hiddenMods = writable<ModId[]>([])
export const ignoreAllVguiIconConflicts = writable(false)
//export const uninstalledMods = writable<ModId[]>([]) // Mods labeled as uninstalled will be removed from the list when the mod files are detected
//export const unsubscribedMods = writable<ModId[]>([]) // Mods labeled as unsubscribed will be removed from the list when the mod files are detected

type SimpleModListStore = writable<ModId[]>

export function addToList(list: SimpleModListStore, id: ModId): void {
  if (isInList(list)) return
  list.update((items) => [...items, id])
}

export function removeFromList(list: SimpleModListStore, id: ModId): void {
  if (isInList(list)) return
  llist.update((items) => items.filter((item) => item !== id))
}

export function toggleInList(list: SimpleModListStore, id: ModId): void {
  list.update((items) => {
    if (items.includes(id)) return items.filter((item) => item !== id)
    else return [...items, id]
  })
}

export function isInList(list: SimpleModListStore, id: ModId): boolean {
  return get(list).includes(id)
}

// --------------------------------------------------------------------
// Unsafe methods for mods.
//
// These methods do not check if the mod is already
// enabled/disabled in the current preset. Use these methods only if you
// are sure that the mod is not already enabled/disabled in the current preset.
// --------------------------------------------------------------------

function enableModInCurrentPresetUnsafe(modId: ModId): void {
  const workingPresets = get(presets)
  const workingActivePreset = get(activePreset)
  workingPresets.find((preset) => preset.id == workingActivePreset).enabledMods.push(modId)
  presets.set(workingPresets)
}

function disableModInCurrentPresetUnsafe(modId: ModId): void {
  const workingPresets = get(presets)
  const workingActivePreset = get(activePreset)
  const tempEnabledMods = workingPresets
    .find((preset) => preset.id == workingActivePreset)
    .enabledMods.filter((id) => id != modId)

  workingPresets.find((preset) => preset.id == workingActivePreset).enabledMods = tempEnabledMods
  presets.set(workingPresets)
}

// --------------------------------------------------------------------
// Safe methods for mods.
//
// These methods check if the mod is already enabled/disabled in the
// current preset.
// --------------------------------------------------------------------

export function isModEnabledInCurrentPreset(modId: ModId): void {
  const workingPresets = get(presets)
  const workingActivePreset = get(activePreset)

  return workingPresets
    .find((preset) => preset.id == workingActivePreset)
    .enabledMods.includes(modId)
}

export function enableModInCurrentPresetSafe(modId: ModId): void {
  if (!isModEnabledInCurrentPreset(modId)) enableModInCurrentPresetUnsafe(modId)
}

export function disableModInCurrentPresetSafe(modId: ModId): void {
  if (isModEnabledInCurrentPreset(modId)) disableModInCurrentPresetUnsafe(modId)
}

export function toggleModInCurrentPresetSafe(modId: ModId): void {
  if (isModEnabledInCurrentPreset(modId)) disableModInCurrentPresetUnsafe(modId)
  else enableModInCurrentPresetUnsafe(modId)
}

export function batchEnableModsInCurrentPreset(modIds: ModId[]): void {
  modIds.forEach((modId) => enableModInCurrentPresetSafe(modId))
}

export function batchDisableModsInCurrentPreset(modIds: ModId[]): void {
  modIds.forEach((modId) => disableModInCurrentPresetSafe(modId))
}

export const renameCurrentPreset = (newName: string): void => {
  const workingPresets = get(presets)
  let workingPreset = workingPresets.find((preset) => preset.id == get(activePreset))
  if (!workingPreset) return
  workingPreset.label = newName
  presets.set(workingPresets)
}

// --------------------------------------------------------------------
// Unsafe methods for collections.
//
// Same idea as with mods
// --------------------------------------------------------------------

function addModToCurrentCollectionUnsafe(modId: ModId): void {
  const workingCollectionName = get(selectedCollectionName)
  addModToCollectionUnsafe(modId, workingCollectionName)
}

function removeModFromCurrentCollectionUnsafe(modId: ModId): void {
  const workingCollectionName = get(selectedCollectionName)
  removeModFromCollectionUnsafe(modId, workingCollectionName)
}

function addModToCollectionUnsafe(modId: ModId, workingCollectionName: string): void {
  const workingCollections = get(collections)
  if (workingCollections === undefined) return

  const workingCollection = workingCollections.find(
    (collection) => collection.id == workingCollectionName
  )
  if (workingCollection === undefined) return
  workingCollection.mods.push(modId)
  collections.set(workingCollections)
}

function removeModFromCollectionUnsafe(modId: ModId, workingCollectionName: string): void {
  const workingCollections = get(collections)!

  const tempMods = workingCollections
    .find((collection) => collection.id == workingCollectionName)
    .mods.filter((id) => id != modId)

  workingCollections.find((collection) => collection.id == workingCollectionName).mods = tempMods
  collections.set(workingCollections)
}

// --------------------------------------------------------------------
// Safe methods for collections.
//
// You get the idea :D
// --------------------------------------------------------------------

export function isModInCollection(modId: ModId, workingCollectionName: string): boolean {
  const workingCollections = get(collections)

  const workingCollection = workingCollections.find(
    (collection) => collection.id == workingCollectionName
  )

  if (!workingCollection) return false

  return workingCollection.mods.includes(modId)
}

export function isModInCurrentCollection(modId: ModId): boolean {
  const workingCollectionName = get(selectedCollectionName)

  return isModInCollection(modId, workingCollectionName)
}

export function addModToCollectionSafe(modId: ModId, workingCollectionName: string): void {
  if (!isModInCollection(modId, workingCollectionName))
    addModToCollectionUnsafe(modId, workingCollectionName)
}

export function removeModFromCollectionSafe(modId: ModId, workingCollectionName: string): void {
  if (isModInCollection(modId, workingCollectionName))
    removeModFromCollectionUnsafe(modId, workingCollectionName)
}

export function batchAddModsToCollection(modIds: ModId[], workingCollectionName: string): void {
  modIds.forEach((modId) => addModToCollectionSafe(modId, workingCollectionName))
}

export function batchRemoveModsFromCollection(
  modIds: ModId[],
  workingCollectionName: string
): void {
  modIds.forEach((modId) => removeModFromCollectionSafe(modId, workingCollectionName))
}

export const renameCurrentCollection = (newName: string): void => {
  const workingCollections = get(collections)
  const workingCollection = workingCollections.find(
    (collection) => collection.id == get(selectedCollectionName)
  )
  if (!workingCollection) return
  workingCollection.label = newName
  collections.set(workingCollections)
}
