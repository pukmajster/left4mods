import { get } from 'svelte/store'
import { bridgedApi } from '../api/api'
import { isWritingAddonlist, modManifest } from '../stores/manifest'
import { activePreset, gameDir, presets } from '../stores/profile'
import { triggerAlertToast } from './toast'

export async function writeAddonlist(): Promise<void> {
  if (get(isWritingAddonlist)) {
    triggerAlertToast('Already writing addonlist')
    return
  }

  isWritingAddonlist.set(true)

  const values = {
    modManifest: get(modManifest),
    presets: get(presets),
    activePreset: get(activePreset),
    gameDir: get(gameDir)
  }

  try {
    await bridgedApi.writeAddonList(
      values.gameDir,
      values.modManifest,
      values.presets.find((preset) => preset.id === values.activePreset) ?? {
        enabledMods: [],
        id: '',
        label: ''
      }
    )

    triggerAlertToast('Addonlist written!')
    bridgedApi.writeCustomCfg()
  } catch (e) {
    console.log(e)
    triggerAlertToast('Error writing addonlist')
  } finally {
    isWritingAddonlist.set(false)
  }
}
