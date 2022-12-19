<script lang="ts">
  import {
    AppBar,
    modalStore,
    type ModalComponent,
    type ModalSettings
  } from '@skeletonlabs/skeleton'
  import { Github, Settings } from 'lucide-svelte'
  import { requestManifest } from '../api/api'
  import { modManifest } from '../stores/manifest'
  import { showPreferences } from '../stores/preferences'
  import SettingsModal from './modals/SettingsModal.svelte'
  import Preferences from './Preferences.svelte'
  import Presets from './Presets.svelte'

  let isBuildingManifest = false

  async function attemptRequestManifest(forceNewBuild: boolean = false) {
    isBuildingManifest = true

    try {
      modManifest.set(await requestManifest(forceNewBuild))
    } catch (e) {
      console.log(e)
    } finally {
      isBuildingManifest = false
    }
  }

  function triggerCustomModal(): void {
    const modalComponent: ModalComponent = {
      ref: SettingsModal,
      props: { background: 'bg-red-500' },
      // Provide default slot content as a template literal
      slot: '<p>aw</p>'
    }
    const d: ModalSettings = {
      type: 'component',
      title: 'Settings',
      component: modalComponent
    }
    modalStore.trigger(d)
  }
</script>

<AppBar padding="px-2 py-2">
  <svelte:fragment slot="lead">
    <button on:click={triggerCustomModal} class="btn btn-sm">
      <Settings size={16} /> <span>Settings</span></button
    >
    <button
      on:click={() => attemptRequestManifest(false)}
      disabled={isBuildingManifest}
      class="btn btn-sm"
    >
      {isBuildingManifest ? 'Refreshing Manifest...' : 'Refresh Manifest'}</button
    >
    <!--     <button
      on:click={() => attemptRequestManifest(true)}
      disabled={isBuildingManifest}
      class="btn btn-sm"
    >
      {isBuildingManifest ? 'refreshing manifest...' : 'force new build manifest'}</button
    > -->
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <a
      class="btn btn-sm"
      href="https://github.com/pukmajster/l4d2-launcher"
      target="_blank"
      rel="noreferrer"
    >
      <Github size={16} /> <span>GitHub</span>
    </a>
    <Presets parent={{}} />
  </svelte:fragment>

  {#if $showPreferences}
    <Preferences />
  {/if}
</AppBar>
