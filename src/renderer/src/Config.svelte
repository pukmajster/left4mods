<script lang="ts">
  import type { IUserProfile } from 'shared'
  import { onMount } from 'svelte'
  import { modManifest } from './stores/manifest'
  import {
    activePreset,
    collections,
    customCfg,
    disableOnlineFetchingOfModData,
    gameDir,
    launchParameters,
    presets
  } from './stores/profile'
  let ready = false

  onMount(async () => {
    let data = await window.api.requestManifest(false)
    modManifest.set(data)

    try {
      let profile = await window.api.readProfile()

      let defaultConfig: IUserProfile = {
        activePreset: 'default',
        collections: [],
        presets: [{ id: 'default', label: 'Default', enabledMods: [] }],
        preferences: {
          gameDir: '',
          disableOnlineFetchingOfModData: false
        },
        launchParameters: '-novid +exec autoexec.cfg +exec l4d2launcher.cfg',
        customCfg: ''
      }

      profile = { ...defaultConfig, ...profile }

      collections.set(profile.collections ?? [])
      gameDir.set(profile.preferences.gameDir ?? '')
      presets.set(profile.presets ?? [])
      activePreset.set(profile.activePreset ?? '')
      disableOnlineFetchingOfModData.set(
        profile.preferences.disableOnlineFetchingOfModData ?? false
      )
      launchParameters.set(profile.launchParameters ?? '')
      customCfg.set(profile.customCfg ?? '')
    } catch (e) {
      console.log(e)
    }

    ready = true
  })

  $: {
    if (ready) {
      let profileData: IUserProfile = {
        activePreset: $activePreset,
        collections: $collections,
        presets: $presets,
        preferences: {
          gameDir: $gameDir,
          disableOnlineFetchingOfModData: $disableOnlineFetchingOfModData
        },
        launchParameters: $launchParameters,
        customCfg: $customCfg
      }

      window.api.writeProfile(profileData)
    }
  }
</script>
