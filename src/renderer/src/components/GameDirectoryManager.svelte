<script lang="ts">
  import { FolderSearch } from 'lucide-svelte'

  export let state = ''
  export let isValid = false

  async function browseGameDir() {
    let result = await window.api.selectFolder()
    if (result) {
      state = result
    }
  }

  $: {
    isValid = state.endsWith('common/Left 4 Dead 2') || state.endsWith('common/Left 4 Dead 2/')
  }
</script>

<p>
  The end of the directory should look like this:
  <span class="pl-4 font-bold">.../common/Left 4 Dead 2/</span>
</p>

<div class="flex gap-4">
  <input bind:value={state} type="text" class="flex-1" />
  <button class="btn" on:click={browseGameDir}>
    <FolderSearch />

    <span>Browse</span>
  </button>
</div>

{#if !isValid && state}
  <span class="text-red-500 pl-4 text-xs"> Invalid game diretory. Look again... </span>
{/if}

{#if !state}
  <span class="text-primary-500 pl-4 text-xs"> Browse for a directory! </span>
{/if}
