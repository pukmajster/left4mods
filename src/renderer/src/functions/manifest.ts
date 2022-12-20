import { get } from 'svelte/store'
import { bridgedApi } from '../api/api'
import { isBuildingModManifest, modManifest } from '../stores/manifest'
import { disableOnlineFetchingOfModData, gameDir } from '../stores/profile'
import { triggerAlertToast } from './toast'

export async function requestManifest(forceNewBuild: boolean = false) {
  if (get(isBuildingModManifest)) {
    triggerAlertToast('Already refreshing mods, please wait')
    return
  }

  isBuildingModManifest.set(true)
  triggerAlertToast('Refreshing mods...')

  try {
    let manifest = await bridgedApi.requestManifest({
      forceNewBuild,
      gameDir: get(gameDir),
      disableOnlineFetchingOfModData: get(disableOnlineFetchingOfModData)
    })

    console.log(manifest)

    modManifest.set(manifest)
    triggerAlertToast('Refreshed mods!')
  } catch (e) {
    console.log(e)
    triggerAlertToast('Error refreshing mods')
  } finally {
    isBuildingModManifest.set(false)
  }
}
