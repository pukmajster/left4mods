<script lang="ts">
  import { Divider } from '@skeletonlabs/skeleton'
  import { modIdToExtractFrom } from '../../stores/drawers'
  import { modManifest } from '../../stores/manifest'
  import { gameDir } from '../../stores/profile'

  /** Exposes parent props to this component. */
  export let parent: any

  // Base Classes
  const cBase = 'space-y-4'

  $: mod = $modManifest.mods[$modIdToExtractFrom!]

  let exportDir = $gameDir + '/left4dead2/media/'
  let filesToExport: string[] = []

  async function browseExportDir() {
    let result = await window.api.selectFolder()
    if (result) {
      exportDir = result
    }
  }

  function onExtract() {
    window.api.exportVpkFiles($gameDir, exportDir, $modIdToExtractFrom!, filesToExport)
  }

  let selectedFiles = []

  function selectAllFiles() {
    filesToExport = mod.files
  }

  function clearSelectedFiles() {
    filesToExport = []
  }

  function handleClick() {
    if (filesToExport.length === mod.files.length) {
      clearSelectedFiles()
    } else {
      selectAllFiles()
    }
  }
</script>

<!-- @component This example creates a simple form modal. -->
<div class="modal-example-form {cBase}">
  <h5 class="font-bold">Files to extract</h5>

  {#if mod}
    <div class="p-4 bg-surface-700 rounded-md  max-h-72 overflow-y-scroll">
      <div class="flex items-center gap-2">
        <input
          id="selectcheckbox"
          type="checkbox"
          checked={filesToExport.length == mod.files.length}
          on:click={handleClick}
        />
        <label for="selectcheckbox" class="pt-1 flex items-center">
          <span class="font-bold">
            {#if selectedFiles.length === mod.files.length}
              Deselect all
            {:else}
              Select all
            {/if}
          </span>
        </label>
      </div>

      <Divider />

      {#each mod.files as file}
        {@const id = `file_${file}`}
        {@const filename = file.split(/(\\|\/)/g).pop()}
        {@const dir = file.replace(filename ?? '', '')}
        <div class="flex items-center gap-2">
          <input {id} bind:group={filesToExport} value={file} type="checkbox" />
          <label for={id} class="pt-1 flex items-center">
            <span class="opacity-40">{dir}</span>
            <span class="font-bold">{filename}</span>
          </label>
        </div>
      {/each}
    </div>
  {/if}

  <div class="space-y-2">
    <button class="btn btn-sm btn-filled-surface" on:click={browseExportDir}
      >Choose directory</button
    >
    <div class="text-sm">{exportDir}</div>
  </div>

  <!-- prettier-ignore -->
  <footer class="modal-footer {parent.regionFooter}">
    <button class="btn btn-sm btn-filled-surface" on:click={parent.onClose}>Close</button>
    <button class="btn btn-sm btn-filled-primary" on:click={onExtract}>Extract</button>
  </footer>
</div>

<style>
  .keycombo {
    display: flex;
    grid-template-columns: 120px auto;
    gap: 1rem;
  }

  .keycombo p {
    display: inline;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
    color: #24262a;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
  }
</style>
