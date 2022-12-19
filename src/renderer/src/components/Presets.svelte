<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'
  import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton/'
  import { Folder } from 'lucide-svelte'
  import { activePreset, presets } from '../stores/profile'
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

<button on:click={triggerCustomModal} class="btn btn-ghost-accent btn-sm">
  <Folder size={16} />
  <span>Preset: {$presets.find((preset) => preset.id == $activePreset)?.label}</span>
</button>

<style>
</style>
