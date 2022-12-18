<script lang="ts">
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

<button on:click={_writeAddonList} disabled={writingAddonList} class="launch-button write"
  >{writingAddonList ? 'Writing...' : 'Write addonlist'}</button
>
<button on:click={launchGame} class="launch-button">Launch L4D2</button>

<style>
  .launch-button {
    margin-top: 0.6em;
    padding: 8px;
    font-size: 1.2em;
    font-weight: 400;
    text-transform: uppercase;
    background-color: rgb(67, 149, 32);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .launch-button:hover {
    background-color: rgb(42, 86, 23);
  }

  .launch-button.write {
    background-color: rgb(16, 114, 176);
  }

  .launch-button.write:hover {
    background-color: rgb(23, 73, 104);
  }
</style>
