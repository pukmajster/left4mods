<script lang="ts">
  import type { IUserProfile } from 'shared'
  import { onMount } from 'svelte'
  import { requestManifest } from './functions/manifest'
  import {
    activePreset,
    collections,
    customCfg,
    darkMode,
    disableOnlineFetchingOfModData,
    gameDir,
    hasFinishedFirstTimeSetup,
    launchParameters,
    presets
  } from './stores/profile'

  let ready = false
  let readyToRequestInitialManifest = false

  onMount(async () => {
    try {
      let profile = await window.api.readProfile()

      let defaultConfig: IUserProfile = {
        activePreset: 'default',
        collections: [{ id: 'favourites', label: 'Favourites', mods: [] }],
        presets: [{ id: 'default', label: 'Default', enabledMods: [] }],
        preferences: {
          gameDir: '',
          disableOnlineFetchingOfModData: false,
          darkMode: true
        },
        launchParameters: '-novid +exec autoexec.cfg +exec l4d2launcher.cfg',
        customCfg: '',
        hasFinishedFirstTimeSetup: false
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
      darkMode.set(profile.preferences.darkMode ?? false)
      hasFinishedFirstTimeSetup.set(profile.hasFinishedFirstTimeSetup ?? false)
    } catch (e) {
      console.log(e)
    }

    ready = true
    readyToRequestInitialManifest = true
  })

  $: {
    if (ready) {
      let profileData: IUserProfile = {
        activePreset: $activePreset,
        collections: $collections,
        presets: $presets,
        preferences: {
          gameDir: $gameDir,
          disableOnlineFetchingOfModData: $disableOnlineFetchingOfModData,
          darkMode: $darkMode
        },
        launchParameters: $launchParameters,
        customCfg: $customCfg,
        hasFinishedFirstTimeSetup: $hasFinishedFirstTimeSetup
      }

      window.api.writeProfile(profileData)
    }
  }

  $: {
    if (readyToRequestInitialManifest) {
      // Sync the manifest on startup
      requestManifest(false)
      readyToRequestInitialManifest = false
    }
  }

  $: {
    if ($darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
</script>
