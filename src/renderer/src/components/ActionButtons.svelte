<script lang="ts">
  import { Play } from 'lucide-svelte'
  import { writeAddonlist } from '../functions/writeAddonlist'
  import { launchParameters } from '../stores/profile'

  async function launchGame() {
    await writeAddonlist()
    window.api.openLinkInBrowser(`steam://run/550/${launchParameters}`)
  }
</script>

<!-- <button on:click={_writeAddonList} disabled={writingAddonList} class="launch-button write"
  >{writingAddonList ? 'Writing...' : 'Write addonlist'}</button
> -->
<button on:click={launchGame} class="btn btn-sm btn-ghost-accent ml-2">
  <Play size={16} /> <span>Launch L4D2</span></button
>
