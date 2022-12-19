<script lang="ts">
  export let parent: any
  import { nanoid } from 'nanoid'
  import { collections, selectedCollectionName } from '../../stores/profile'

  const formData = {
    newCollectionName: ''
  }

  function onFormSubmit(): void {
    //if ($modalStore[0].response) $modalStore[0].response(formData)
    createNewCollection(formData.newCollectionName)
    //modalStore.close()
  }

  function createNewCollection(newCollectionName: string) {
    if (newCollectionName === '') return
    if ($collections.find((preset) => preset.id === newCollectionName)) return

    collections.update((collections) => {
      collections.push({
        label: newCollectionName,
        id: nanoid(),
        mods: []
      })

      return collections
    })
    $selectedCollectionName = newCollectionName
    newCollectionName = ''
  }

  // Base Classes
  const cBase = 'space-y-4'
</script>

<!-- @component This example creates a simple form modal. -->
<div class="modal-example-form {cBase}">
  <h5 class="font-bold">Manage your collection</h5>
  <select bind:value={$selectedCollectionName} placeholder="collection" class="">
    <option value="">None</option>
    {#each $collections as collection}
      <option value={collection.id}>{collection.label}</option>
    {/each}
  </select>

  <h5 class="font-bold">Create New Collection</h5>
  <div class="flex gap-4">
    <input
      type="text"
      bind:value={formData.newCollectionName}
      placeholder="Enter new collection name..."
      class="flex-1 w-full"
    />

    <button class="btn btn-ghost-accent" on:click={onFormSubmit}>Create Collection</button>
  </div>

  <!-- prettier-ignore -->
  <footer class="modal-footer {parent.regionFooter}">
    <button class="btn btn-ghost-accent" on:click={parent.onClose}>Close</button>
  </footer>
</div>
