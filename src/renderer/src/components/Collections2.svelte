<script lang="ts">
  import {
    Divider,
    modalStore,
    type ModalComponent,
    type ModalSettings
  } from '@skeletonlabs/skeleton'
  import { Album } from 'lucide-svelte'
  import { selectedCollectionName } from '../stores/profile'
  import CollectionSelectOptions from './CollectionSelectOptions.svelte'
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
      <CollectionSelectOptions />
    </select>

    <button class="btn btn-sm btn-filled-primary" on:click={triggerCustomModal}>
      <Album size={16} />
      <span>Manage</span></button
    >
  </div>
  <!-- 
  <div class="mt-4 flex items-center gap-3 ">
    <input
      id="onlyShowModsNotInAnyCollection"
      type="checkbox"
      disabled={$selectedCollectionName !== ''}
      bind:checked={$onlyShowModsNotInAnyCollection}
    />
    <label class="inline" for="onlyShowModsNotInAnyCollection">
      Only show mods not in any collection</label
    >
  </div> -->
</div>

<Divider />

<style>
  select {
    width: 100%;
  }
</style>
