import type { IModManifest, IPreset, IUserProfile, ModId, RequestManifestOptions } from 'shared'
import { get } from 'svelte/store'
import { emptyManifest } from '../constants/manifest'
import { triggerAlertToast } from '../functions/toast'
import { customCfg, gameDir } from '../stores/profile'

async function requestManifest(options: RequestManifestOptions): Promise<IModManifest> {
  try {
    return await window.api.requestManifest(options)
  } catch (e) {
    const err = e as Error
    console.log(err)
    return emptyManifest
  }
}

export async function readProfile(): Promise<IUserProfile | object> {
  try {
    return await window.api.readProfile()
  } catch (e) {
    const err = e as Error
    console.log(err)
    return {}
  }
}

export async function writeProfile(profile: IUserProfile): Promise<void> {
  try {
    await window.api.writeProfile(profile)
  } catch (e) {
    let err = e as Error
    console.log(err)
  }
}

async function writeAddonList(
  gameDir: string,
  manifest: IModManifest,
  preset: IPreset
): Promise<void> {
  let outputVdfString = `"AddonList"\n{\n`
  const enabledMods = preset.enabledMods

  for (const mod in manifest.mods) {
    const modId = manifest.mods[mod].id
    const enabled = enabledMods.includes(modId) ? '1' : '0'

    if (manifest.mods[mod].fromworkshop)
      outputVdfString += `\t"workshop\\${modId}.vpk"\t\t\t"${enabled}"\n`
    else outputVdfString += `\t"${modId}.vpk"\t\t\t"${enabled}"\n`
  }

  outputVdfString += '}'

  await window.api.writeAddonList(gameDir, outputVdfString)
}

async function writeCustomCfg(): Promise<void> {
  await window.api.writeCustomCfg(get(gameDir), get(customCfg))
}

async function openGameDirectory(): Promise<void> {
  await window.api.openDirectory(get(gameDir))
}

function getPath(): Promise<string> {
  return window.api.getPath()
}

function getPathJoin(file: string): Promise<string> {
  return window.api.getPathJoin(file)
}

export async function exportVpkFiles(
  gameDir: string,
  exportDir: string,
  modId: ModId,
  files: string[]
): Promise<void> {
  try {
    await window.api.exportVpkFiles(gameDir, exportDir, modId, files)
    triggerAlertToast('Exported files successfully')
  } catch (e) {
    const err = e as Error
    triggerAlertToast('Failed to extract vpk')
    console.log(err)
  }
}

export const bridgedApi = {
  writeAddonList,
  requestManifest,
  openWorkingDirectory: (): void => window.api.openWorkingDirectory(),
  writeCustomCfg,
  openGameDirectory,
  getPath,
  getPathJoin
}
