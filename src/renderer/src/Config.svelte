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
    grayscaleDisabledMods,
    hasFinishedFirstTimeSetup,
    launchParameters,
    presets
  } from './stores/profile'

  let ready = false
  let readyToRequestInitialManifest = false

  onMount(async () => {
    let savedProfile: IUserProfile

    let defaultConfig: IUserProfile = {
      activePreset: 'default',
      collections: [{ id: 'favourites', label: 'Favourites', mods: [] }],
      presets: [
        { id: 'default', label: 'Default', enabledMods: [] },
        { id: 'nomods', label: 'Vanilla (No Mods)', enabledMods: [] }
      ],
      preferences: {
        gameDir: '',
        disableOnlineFetchingOfModData: false,
        darkMode: true,
        grayscaleDisabledMods: false
      },
      launchParameters: '-novid +exec autoexec.cfg +exec l4d2launcher.cfg',
      customCfg: 'bind p "toggleconsole"',
      hasFinishedFirstTimeSetup: false
    }

    try {
      savedProfile = await window.api.readProfile()
    } catch (e) {
      savedProfile = defaultConfig
    }

    let profile: IUserProfile = { ...defaultConfig, ...savedProfile }

    collections.set(profile.collections)
    gameDir.set(profile.preferences.gameDir)
    presets.set(profile.presets)
    activePreset.set(profile.activePreset)
    disableOnlineFetchingOfModData.set(profile.preferences.disableOnlineFetchingOfModData)
    launchParameters.set(profile.launchParameters)
    customCfg.set(profile.customCfg)
    darkMode.set(profile.preferences.darkMode)
    hasFinishedFirstTimeSetup.set(profile.hasFinishedFirstTimeSetup)
    grayscaleDisabledMods.set(profile.preferences.grayscaleDisabledMods)

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
          darkMode: $darkMode,
          grayscaleDisabledMods: $grayscaleDisabledMods
        },
        launchParameters: $launchParameters,
        customCfg: $customCfg,
        hasFinishedFirstTimeSetup: $hasFinishedFirstTimeSetup
      }

      try {
        window.api.writeProfile(profileData)
      } catch (e) {
        console.log(e)
      }
    }
  }

  $: {
    if (readyToRequestInitialManifest && $hasFinishedFirstTimeSetup) {
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
