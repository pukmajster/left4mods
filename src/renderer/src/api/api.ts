import type { IModManifest, IPreset, IUserProfile } from 'shared'

async function requestManifest(forceNewBuild: boolean = false) {
  console.log('manifest')

  try {
    let manifest = await window.api.requestManifest(forceNewBuild)
    return manifest
  } catch (e) {
    let err = e as Error
    console.log(err)
    return {}
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

  for (let mod in manifest) {
    let modId = manifest[mod].id
    let enabled = enabledMods.includes(modId) ? '1' : '0'
    outputVdfString += `\t"workshop\\${modId}.vpk"\t\t\t"${enabled}"\n`
  }

  outputVdfString += '}'

  let res = await window.api.writeAddonList(gameDir, outputVdfString)
  return res
}

export const bridgedApi = {
  writeAddonList,
  requestManifest
}
