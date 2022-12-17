export async function requestManifest(forceNewBuild: boolean) {
  console.log('manifest')

  try {
    let manifest = await window.api.requestManifest(forceNewBuild)
    return manifest
  } catch (e) {
    let err = e as Error
    console.log(err)
  }
}
