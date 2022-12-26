<script lang="ts">
  import {
    Divider,
    modalStore,
    type ModalComponent,
    type ModalSettings
  } from '@skeletonlabs/skeleton'
  import { Album } from 'lucide-svelte'
  import { collections, selectedCollectionName } from '../stores/profile'
  import CollectionsModal from './modals/CollectionsModal.svelte'

  function triggerCustomModal(): void {
    const modalComponent: ModalComponent = {
      ref: CollectionsModal,
      props: { background: 'bg-red-500' },
      // Provide default slot content as a template literal
      slot: '<p>aw</p>'
    }
    const d: ModalSettings = {
      type: 'component',
      title: 'Manage Collections',
      component: modalComponent
    }
    modalStore.trigger(d)
  }
</script>

<div class="my-4">
  <div class="flex gap-2">
    <select class="flex-1" bind:value={$selectedCollectionName}>
      <option hidden value="">Pick a Collection</option>
      <option value="">None</option>
      {#each $collections as collection}
        <option value={collection.id}>{collection.label}</option>
      {/each}
    </select>

    <button class="btn btn-sm btn-ghost-primary" on:click={triggerCustomModal}>
      <Album size={16} />
      <span>Manage</span></button
    >
  </div>
</div>

<Divider />

<style>
  select {
    width: 100%;
  }
</style>
