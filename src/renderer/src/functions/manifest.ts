import { get } from 'svelte/store'
import { bridgedApi } from '../api/api'
import { isBuildingModManifest, modManifest } from '../stores/manifest'
import { triggerAlertToast } from './toast'

export async function requestManifest(forceNewBuild: boolean = false) {
  if (get(isBuildingModManifest)) {
    triggerAlertToast('Already refreshing mods, please wait')
    return
  }

  isBuildingModManifest.set(true)
  triggerAlertToast('Refreshing mods...')

  try {
    modManifest.set(await bridgedApi.requestManifest(forceNewBuild))
    triggerAlertToast('Refreshed mods!')
  } catch (e) {
    console.log(e)
    triggerAlertToast('Error refreshing mods')
  } finally {
    isBuildingModManifest.set(false)
  }
}
