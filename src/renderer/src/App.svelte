<script lang="ts">
  import { AppShell, Modal } from '@skeletonlabs/skeleton'
  import type { IUserProfile } from 'shared'
  import { onMount } from 'svelte'
  import Header from './components/Header.svelte'
  import ModLibrary from './components/ModLibrary.svelte'
  import Sidebar from './components/Sidebar.svelte'
  import { modManifest } from './stores/manifest'
  import {
    activePreset,
    collections,
    disableOnlineFetchingOfModData,
    gameDir,
    presets
  } from './stores/profile'
  let ready = false

  onMount(async () => {
    let data = await window.api.requestManifest(false)
    modManifest.set(data)

    try {
      let profile = await window.api.readProfile()

      collections.set(profile.collections ?? [])
      gameDir.set(profile.preferences.gameDir ?? '')
      presets.set(profile.presets ?? [])
      activePreset.set(profile.activePreset ?? '')
      disableOnlineFetchingOfModData.set(
        profile.preferences.disableOnlineFetchingOfModData ?? false
      )
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
        }
      }

      window.api.writeProfile(profileData)
    }
  }
</script>

<AppShell>
  <svelte:fragment slot="header"><Header /></svelte:fragment>
  <!-- Sidebar -->
  <svelte:fragment slot="sidebarLeft">
    <Sidebar />
  </svelte:fragment>
  <!-- Page Content -->
  <ModLibrary />
</AppShell>

<Modal />

<style global>
</style>
