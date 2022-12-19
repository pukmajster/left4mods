<script lang="ts">
  import { onlyShowModsNotInAnyCollection } from '../stores/library'
  import { collections, selectedCollectionName } from '../stores/profile'

  let newCollectionName = ''

  function createNewCollection() {
    if (newCollectionName === '') {
      return
    }

    if ($collections.find((collection) => collection.name === newCollectionName)) {
      return
    }

    collections.update((collections) => {
      collections.push({
        name: newCollectionName,
        mods: []
      })

      return collections
    })

    newCollectionName = ''
  }
</script>

<div class="container">
  <p>Collections</p>
  <div>
    <select bind:value={$selectedCollectionName} placeholder="collection">
      <option value="">None</option>
      {#each $collections as collection}
        <option value={collection.name}>{collection.name}</option>
      {/each}
    </select>
  </div>

  <button on:click={createNewCollection}>create</button>
  <input bind:value={newCollectionName} />

  <div style="height: 1em;" />

  <div class="flex items-center gap-3">
    <input
      id="onlyShowModsNotInAnyCollection"
      type="checkbox"
      disabled={$selectedCollectionName !== ''}
      bind:checked={$onlyShowModsNotInAnyCollection}
    />
    <label class="inline" for="onlyShowModsNotInAnyCollection">
      Only mods not in <br /> any collection</label
    >
  </div>
</div>

<style>
  select {
    width: 100%;
  }
</style>
