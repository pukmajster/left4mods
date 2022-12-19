import { writable } from 'svelte/store'

export type DrawerID = 'mod-overview' | undefined

export const drawerId = writable<DrawerID>(undefined)
