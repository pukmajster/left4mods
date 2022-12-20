import type { IModManifest } from 'shared'
import { writable } from 'svelte/store'

export const modManifest = writable<IModManifest>({})
export const isBuildingModManifest = writable(false)
export const isWritingAddonlist = writable(false)
