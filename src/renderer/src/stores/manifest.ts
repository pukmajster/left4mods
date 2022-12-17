import type { IModManifest } from 'shared'
import { writable } from 'svelte/store'
import { modManifestTemp } from '../temp'

export const modManifest = writable<IModManifest>(modManifestTemp)
