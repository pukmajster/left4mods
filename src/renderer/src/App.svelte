<script lang="ts">
  import type { IUserProfile } from 'shared'
  import { onMount } from 'svelte'
  import Header from './components/Header.svelte'
  import ModLibrary from './components/ModLibrary.svelte'
  import { modManifest } from './stores/manifest'
  import { activePreset, collections, gameDir, presets } from './stores/profile'

  let ready = false

  onMount(async () => {
    let data = await window.api.requestManifest(false)
    console.log(data)
    modManifest.set(data)

    try {
      let profile = await window.api.readProfile()
      console.log(profile)

      collections.set(profile.collections ?? [])
      gameDir.set(profile.preferences.gameDir ?? '')
      presets.set(profile.presets ?? [])
      activePreset.set(profile.activePreset ?? '')
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
          gameDir: $gameDir
        }
      }

      console.log('profileData', profileData)

      window.api.writeProfile(profileData)
    }
  }
</script>

<div class="container">
  <Header />
  <ModLibrary />
</div>

<style>
  .container {
    display: grid;
    grid-template-rows: 64px 1fr;
  }
</style>
