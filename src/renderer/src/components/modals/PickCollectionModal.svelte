<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'

  // Props
  /** Exposes parent props to this component. */
  export let parent: any
  // Stores
  import { collections } from '../../stores/profile'
  // Form Data
  const formData = {
    collection: ''
  }
  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    if ($modalStore[0].response) $modalStore[0].response(formData.collection)
    modalStore.close()
  }

  // Base Classes
  const cBase = 'space-y-4'
</script>

<!-- @component This example creates a simple form modal. -->
<div class="modal-example-form {cBase}">
  <select bind:value={formData.collection}>
    {#each $collections as collection}
      <option value={collection.id}>{collection.label}</option>
    {/each}
  </select>

  <footer class="modal-footer {parent.regionFooter}">
    <button class="btn btn-sm btn-filled-surface" on:click={parent.onClose}>Close</button>
    <button
      class="btn btn-sm btn-filled-primary"
      disabled={!formData.collection}
      on:click={onFormSubmit}>Add to Collection</button
    >
  </footer>
</div>
