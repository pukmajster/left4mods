<script lang="ts">
  import { nanoid } from 'nanoid'
  import { selectedMods } from '../../stores/library'
  import {
    collections,
    renameCurrentCollection,
    selectedCollectionName
  } from '../../stores/profile'

  /** Exposes parent props to this component. */
  export let parent: any

  const formData = {
    newCollectionName: ''
  }

  function onFormSubmit(): void {
    //if ($modalStore[0].response) $modalStore[0].response(formData)
    selectedMods.set([])
    createNewCollection(formData.newCollectionName)
    //modalStore.close()
  }

  const renameFormData = {
    collectionLabel: ''
  }

  $: selectedColletionLabel = $collections.find(
    (collection) => collection.id === $selectedCollectionName
  )?.label!

  function onRename() {
    renameCurrentCollection(renameFormData.collectionLabel)
    renameFormData.collectionLabel = ''
  }

  function createNewCollection(newCollectionName: string) {
    if (newCollectionName === '') return
    if ($collections.find((preset) => preset.id === newCollectionName)) return

    let newId = nanoid()

    collections.update((collections) => {
      collections.push({
        label: newCollectionName,
        id: newId,
        mods: []
      })

      return collections
    })
    $selectedCollectionName = newId
    newCollectionName = ''
    formData.newCollectionName = ''
  }

  // Base Classes
  const cBase = 'space-y-4'

  $: {
    $selectedCollectionName && selectedMods.set([])
  }
</script>

<!-- @component This example creates a simple form modal. -->
<div class="modal-example-form {cBase}">
  <select bind:value={$selectedCollectionName} placeholder="collection" class="">
    <option value="">None</option>
    {#each $collections as collection}
      <option value={collection.id}>{collection.label}</option>
    {/each}
  </select>

  <div class="flex gap-3">
    <input
      bind:value={renameFormData.collectionLabel}
      placeholder={`${
        $selectedCollectionName !== ''
          ? `Rename collection "${selectedColletionLabel}"`
          : 'Select a collection'
      }`}
      type="text"
    />
    <button
      on:click={onRename}
      disabled={renameFormData.collectionLabel.length == 0}
      class="btn btn-ghost-primary">Rename</button
    >
  </div>

  <h5 class="font-bold">Create New Collection</h5>
  <div class="flex gap-4">
    <input
      type="text"
      bind:value={formData.newCollectionName}
      placeholder="Enter new collection name..."
      class="flex-1 w-full"
    />

    <button
      class="btn btn-ghost-primary"
      disabled={formData.newCollectionName.length == 0}
      on:click={onFormSubmit}>Create Collection</button
    >
  </div>

  <!-- prettier-ignore -->
  <footer class="modal-footer {parent.regionFooter}">
    <button class="btn btn-ghost-primary" on:click={parent.onClose}>Close</button>
  </footer>
</div>
