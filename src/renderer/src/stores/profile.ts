import type { IModCollection, IPreset, ModId } from 'shared'
import { get, writable } from 'svelte/store'

export const presets = writable<IPreset[]>([{ name: 'default', enabledMods: [] }])
export const collections = writable<IModCollection[]>([])

export const activePreset = writable('')
export const selectedCollectionName = writable('') // Not stored in profile
export const disableOnlineFetchingOfModData = writable(false) // Not stored in profile
export const gameDir = writable('')

// --------------------------------------------------------------------
// Unsafe methods for mods.
//
// These methods do not check if the mod is already
// enabled/disabled in the current preset. Use these methods only if you
// are sure that the mod is not already enabled/disabled in the current preset.
// --------------------------------------------------------------------

function enableModInCurrentPresetUnsafe(modId: ModId) {
  const workingPresets = get(presets)
  const workingActivePreset = get(activePreset)
  workingPresets.find((preset) => preset.name == workingActivePreset).enabledMods.push(modId)
  presets.set(workingPresets)
}

function disableModInCurrentPresetUnsafe(modId: ModId) {
  const workingPresets = get(presets)
  const workingActivePreset = get(activePreset)
  let tempEnabledMods = workingPresets
    .find((preset) => preset.name == workingActivePreset)
    .enabledMods.filter((id) => id != modId)

  workingPresets.find((preset) => preset.name == workingActivePreset).enabledMods = tempEnabledMods
  presets.set(workingPresets)
}

// --------------------------------------------------------------------
// Safe methods for mods.
//
// These methods check if the mod is already enabled/disabled in the
// current preset.
// --------------------------------------------------------------------

export function isModEnabledInCurrentPreset(modId: ModId) {
  const workingPresets = get(presets)
  const workingActivePreset = get(activePreset)

  return workingPresets
    .find((preset) => preset.name == workingActivePreset)
    .enabledMods.includes(modId)
}

export function enableModInCurrentPresetSafe(modId: ModId) {
  if (!isModEnabledInCurrentPreset(modId)) enableModInCurrentPresetUnsafe(modId)
}

export function disableModInCurrentPresetSafe(modId: ModId) {
  if (isModEnabledInCurrentPreset(modId)) disableModInCurrentPresetUnsafe(modId)
}

export function toggleModInCurrentPresetSafe(modId: ModId) {
  if (isModEnabledInCurrentPreset(modId)) disableModInCurrentPresetUnsafe(modId)
  else enableModInCurrentPresetUnsafe(modId)
}

export function batchEnableModsInCurrentPreset(modIds: ModId[]) {
  modIds.forEach((modId) => enableModInCurrentPresetSafe(modId))
}

export function batchDisableModsInCurrentPreset(modIds: ModId[]) {
  modIds.forEach((modId) => disableModInCurrentPresetSafe(modId))
}

// --------------------------------------------------------------------
// Unsafe methods for collections.
//
// Same idea as with mods
// --------------------------------------------------------------------

function addModToCurrentCollectionUnsafe(modId: ModId, workingCollectionName: string) {
  const workingCollections = get(collections)

  addModToCollectionUnsafe(modId, workingCollectionName)
}

function removeModFromCurrentCollectionUnsafe(modId: ModId, workingCollectionName: string) {
  const workingCollections = get(collections)

  removeModFromCollectionUnsafe(modId, workingCollectionName)
}

function addModToCollectionUnsafe(modId: ModId, workingCollectionName: string) {
  const workingCollections = get(collections)
  workingCollections.find((collection) => collection.name == workingCollectionName).mods.push(modId)
  collections.set(workingCollections)
}

function removeModFromCollectionUnsafe(modId: ModId, workingCollectionName: string) {
  const workingCollections = get(collections)
  let tempMods = workingCollections
    .find((collection) => collection.name == workingCollectionName)
    .mods.filter((id) => id != modId)

  workingCollections.find((collection) => collection.name == workingCollectionName).mods = tempMods
  collections.set(workingCollections)
}

// --------------------------------------------------------------------
// Safe methods for collections.
//
// You get the idea :D
// --------------------------------------------------------------------

export function isModInCollection(modId: ModId, workingCollectionName: string) {
  const workingCollections = get(collections)

  return workingCollections
    .find((collection) => collection.name == workingCollectionName)
    .mods.includes(modId)
}

export function isModInCurrentCollection(modId: ModId) {
  const workingCollectionName = get(selectedCollectionName)

  return isModInCollection(modId, workingCollectionName)
}

export function addModToCollectionSafe(modId: ModId, workingCollectionName: string) {
  if (!isModInCollection(modId, workingCollectionName))
    addModToCurrentCollectionUnsafe(modId, workingCollectionName)
}

export function removeModFromCollectionSafe(modId: ModId, workingCollectionName: string) {
  if (isModInCollection(modId, workingCollectionName))
    removeModFromCurrentCollectionUnsafe(modId, workingCollectionName)
}

export function batchAddModsToCollection(modIds: ModId[], workingCollectionName: string) {
  modIds.forEach((modId) => addModToCollectionSafe(modId, workingCollectionName))
}

export function batchRemoveModsFromCollection(modIds: ModId[], workingCollectionName: string) {
  modIds.forEach((modId) => removeModFromCollectionSafe(modId, workingCollectionName))
}
