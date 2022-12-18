<script lang="ts">
  import { activePreset, presets } from '../stores/profile'
  let newPresetName = ''

  function createNewPreset() {
    if (newPresetName === '') {
      return
    }

    if ($presets.find((preset) => preset.name === newPresetName)) {
      return
    }

    presets.update((presets) => {
      presets.push({
        name: newPresetName,
        enabledMods: []
      })

      return presets
    })

    newPresetName = ''
  }
</script>

<div class="container">
  <p>Preset</p>
  <div>
    <select bind:value={$activePreset} placeholder="none">
      <option value="">None</option>
      {#each $presets as preset}
        <option value={preset.name}>{preset.name}</option>
      {/each}
    </select>

    <div>
      <button on:click={createNewPreset}>create</button>
      <input bind:value={newPresetName} />
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
  }

  select {
    width: 100%;
  }
</style>
