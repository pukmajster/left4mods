import type { IModManifest, IPreset, IUserProfile, RequestManifestOptions } from 'shared'
import { get } from 'svelte/store'
import { emptyManifest } from '../constants/manifest'
import { customCfg, gameDir } from '../stores/profile'

async function requestManifest(options: RequestManifestOptions) {
  console.log('manifest')

  try {
    let manifest = await window.api.requestManifest(options)
    return manifest
  } catch (e) {
    let err = e as Error
    console.log(err)
    return emptyManifest
  }
}

export async function readProfile() {
  try {
    let profile = await window.api.readProfile()
    return profile
  } catch (e) {
    let err = e as Error
    console.log(err)
    return {}
  }
}

export async function writeProfile(profile: IUserProfile) {
  try {
    await window.api.writeProfile(profile)
  } catch (e) {
    let err = e as Error
    console.log(err)
  }
}

async function writeAddonList(gameDir: string, manifest: IModManifest, preset: IPreset) {
  let outputVdfString = `"AddonList"\n{\n`
  let enabledMods = preset.enabledMods

  for (let mod in manifest.mods) {
    let modId = manifest.mods[mod].id
    let enabled = enabledMods.includes(modId) ? '1' : '0'

    if (manifest.mods[mod].fromworkshop)
      outputVdfString += `\t"workshop\\${modId}.vpk"\t\t\t"${enabled}"\n`
    else outputVdfString += `\t"${modId}.vpk"\t\t\t"${enabled}"\n`
  }

  outputVdfString += '}'

  let res = await window.api.writeAddonList(gameDir, outputVdfString)
  return res
}

async function writeCustomCfg() {
  await window.api.writeCustomCfg(get(gameDir), get(customCfg))
}

async function openGameDirectory() {
  await window.api.openDirectory(get(gameDir))
}

export const bridgedApi = {
  writeAddonList,
  requestManifest,
  openWorkingDirectory: () => window.api.openWorkingDirectory(),
  writeCustomCfg,
  openGameDirectory
}
