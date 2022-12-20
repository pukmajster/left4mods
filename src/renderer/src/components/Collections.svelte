<script lang="ts">
  import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton'
  import { Album } from 'lucide-svelte'
  import { onlyShowModsNotInAnyCollection, showConflictingView } from '../stores/library'
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

{#if !$showConflictingView}
  <div class="container">
    <div class="flex gap-2">
      <button class="w-full btn btn-sm bg-accent-500" on:click={triggerCustomModal}>
        <Album size={16} />
        <span
          >{$selectedCollectionName
            ? $collections.find((collection) => collection.id == $selectedCollectionName)?.label
            : 'Collections'}</span
        >
      </button>
    </div>

    <!--  <button on:click={createNewCollection}>create</button>
  <input bind:value={newCollectionName} /> -->

    <div style="height: 1em;" />

    <div class="flex items-center gap-3">
      <input
        id="onlyShowModsNotInAnyCollection"
        type="checkbox"
        disabled={$selectedCollectionName !== ''}
        bind:checked={$onlyShowModsNotInAnyCollection}
      />
      <label class="inline" for="onlyShowModsNotInAnyCollection">
        Only mods not in any collection</label
      >
    </div>
  </div>
{/if}

<style>
  select {
    width: 100%;
  }
</style>
