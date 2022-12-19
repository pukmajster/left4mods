<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'
  import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton/'
  import { activePreset } from '../stores/profile'
  import PresetsModal from './modals/PresetsModal.svelte'

  export let parent: any

  function triggerCustomModal(): void {
    const modalComponent: ModalComponent = {
      ref: PresetsModal,
      props: { background: 'bg-red-500' },
      // Provide default slot content as a template literal
      slot: '<p>aw</p>'
    }
    const d: ModalSettings = {
      type: 'component',
      title: 'Presets',
      component: modalComponent
    }
    modalStore.trigger(d)
  }
</script>

<button on:click={triggerCustomModal} class="btn btn-ghost-accent btn-sm"
  >Preset: {$activePreset}
</button>

<style>
</style>
