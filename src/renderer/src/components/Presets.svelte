<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'
  import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton/'
  import { Folder } from 'lucide-svelte'
  import { activePreset, presets } from '../stores/profile'
  import { trimString } from '../utils'
  import PresetsModal from './modals/PresetsModal.svelte'

  export let parent: any

  $: trimmedPresetName = trimString(
    $presets.find((preset) => preset.id == $activePreset)?.label ?? 'None',
    15
  )

  function triggerCustomModal(): void {
    const modalComponent: ModalComponent = {
      ref: PresetsModal,
      props: { background: 'bg-red-500' },
      // Provide default slot content as a template literal
      slot: '<p>aw</p>'
    }
    const d: ModalSettings = {
      type: 'component',
      title: 'Manage Presets',
      component: modalComponent
    }
    modalStore.trigger(d)
  }
</script>

<button on:click={triggerCustomModal} class="btn btn-ghost-primary btn-sm">
  <Folder size={16} />
  <span>Preset: {trimmedPresetName}</span>
</button>

<style>
</style>
