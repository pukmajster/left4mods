import { writable } from 'svelte/store'

export const showPreferences = writable(false)
export function toggleShowPreferences() {
  showPreferences.update((value) => !value)
}
