<script lang="ts">
  import { perPageCount, selectedMods, sortingType, typeToShow } from '../stores/library'
  import { modManifest } from '../temp'

  function unselectAll() {
    selectedMods.set([])
  }

  function selectAll() {
    selectedMods.set(Object.keys(modManifest))
  }
</script>

<div class="container">
  <div class="top-filters">
    <select bind:value={$perPageCount}>
      <option value={30}>30</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
      <option value={300}>300</option>
      <option value={999}>All</option>
    </select>

    <select bind:value={$sortingType}>
      <option value="name_asc">Name (Ascending)</option>
      <option value="name_desc">Name (Descending)</option>
      <option value="time_newest">Time modified (latest)</option>
      <option value="time_oldest">Time modified (oldest)</option>
    </select>

    <select bind:value={$typeToShow}>
      <option value="any">Any</option>
      <option value="enabled">Enabled</option>
      <option value="disabled">Disabled</option>
      <option value="conflicting">Conflicting</option>
      <option value="corrupt">Corrupt addoninfo</option>
    </select>
  </div>

  <div class="actions">
    <span>selected: {$selectedMods.length}</span>
    <button on:click={unselectAll}>unselect all</button>
    <button on:click={selectAll}>select visible</button>

    {#if $selectedMods.length > 0}
      <div>
        <button>enable selected</button>
        <button>disable selected</button>
      </div>
    {/if}
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;
  }
</style>
