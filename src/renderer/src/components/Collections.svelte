<script lang="ts">
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
</div>

<style>
  select {
    width: 100%;
  }
</style>
