<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton'
  import { requestManifest } from '../api/api'
  import { modManifest } from '../stores/manifest'
  import { showPreferences, toggleShowPreferences } from '../stores/preferences'
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
</script>

<AppBar padding="px-2 py-2">
  <svelte:fragment slot="lead">
    <button on:click={toggleShowPreferences} class="btn btn-sm">Settings</button>
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
    <a class="btn btn-sm" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
    <Presets parent={{}} />
  </svelte:fragment>

  {#if $showPreferences}
    <Preferences />
  {/if}
</AppBar>
