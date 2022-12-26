import type { IModManifest } from 'shared'
import { writable } from 'svelte/store'
import { emptyManifest } from '../constants/manifest'

export const modManifest = writable<IModManifest>(emptyManifest)
export const isBuildingModManifest = writable(false)
export const isWritingAddonlist = writable(false)
