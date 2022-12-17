<script lang="ts">
  import { requestManifest } from '../api/api'
  import { showPreferences, toggleShowPreferences } from '../stores/preferences'
  import Preferences from './Preferences.svelte'

  function attemptRequestManifest() {
    requestManifest(false)
  }
</script>

<div class="container">
  <div>
    <button on:click={toggleShowPreferences}>settings</button>
    <button on:click={attemptRequestManifest}>refresh manifest</button>
  </div>

  {#if $showPreferences}
    <Preferences />
  {/if}
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;
  }
</style>
