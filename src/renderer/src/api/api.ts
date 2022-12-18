import type { IUserProfile } from 'shared'

export async function requestManifest(forceNewBuild: boolean = false) {
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
