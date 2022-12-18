import type { IModManifest } from 'shared'
import { writable } from 'svelte/store'

export const modManifest = writable<IModManifest>({})
