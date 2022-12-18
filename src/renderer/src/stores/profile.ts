import type { IModCollection, IPreset } from 'shared'
import { writable } from 'svelte/store'

export const presets = writable<IPreset[]>([{ name: 'default', enabledMods: [] }])
export const collections = writable<IModCollection[]>([])

export const activePreset = writable('')
export const selectedCollectionName = writable('') // Not stored in profile

export const gameDir = writable('')
