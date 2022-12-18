<script lang="ts">
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

<div class="container">
  <div>
    <button on:click={toggleShowPreferences}>settings</button>
    <button on:click={() => attemptRequestManifest(false)} disabled={isBuildingManifest}>
      {isBuildingManifest ? 'refreshing manifest...' : 'refresh manifest'}</button
    >
    <button on:click={() => attemptRequestManifest(true)} disabled={isBuildingManifest}>
      {isBuildingManifest ? 'refreshing manifest...' : 'force new build manifest'}</button
    >
  </div>

  <Presets />

  {#if $showPreferences}
    <Preferences />
  {/if}
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    padding: 1em;
  }
</style>
