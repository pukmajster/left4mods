<script lang="ts">
  import { Play } from 'lucide-svelte'
  import { writeAddonList } from '../api/api'
  import { modManifest } from '../stores/manifest'
  import { activePreset, gameDir, presets } from '../stores/profile'

  async function launchGame() {
    await _writeAddonList()
    window.api.openLinkInBrowser('steam://run/550/"-novid +exec autoexec.cfg"')
  }

  let writingAddonList = false

  async function _writeAddonList() {
    writingAddonList = true

    try {
      writeAddonList(
        $gameDir,
        $modManifest,
        $presets.find((preset) => preset.name === $activePreset)
      )
    } catch (e) {
      console.log(e)
    } finally {
      writingAddonList = false
    }
  }
</script>

<!-- <button on:click={_writeAddonList} disabled={writingAddonList} class="launch-button write"
  >{writingAddonList ? 'Writing...' : 'Write addonlist'}</button
> -->
<button on:click={launchGame} class="btn btn-sm btn-ghost-accent">
  <Play size={16} /> <span>Launch L4D2</span></button
>
