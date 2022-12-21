<script lang="ts">
  import {
    AppBar,
    modalStore,
    RadioGroup,
    RadioItem,
    type ModalComponent,
    type ModalSettings
  } from '@skeletonlabs/skeleton'
  import {
    FileCog,
    HelpCircle,
    Import,
    Library,
    MessageCircle,
    RefreshCw,
    Settings
  } from 'lucide-svelte'
  import { writable } from 'svelte/store'
  import { requestManifest } from '../functions/manifest'
  import ActionButtons from './ActionButtons.svelte'
  import HelpModal from './modals/HelpModal.svelte'
  import SettingsModal from './modals/SettingsModal.svelte'
  import Presets from './Presets.svelte'

  import { writeAddonlist } from '../functions/writeAddonlist'
  import { isBuildingModManifest, isWritingAddonlist } from '../stores/manifest'

  let store = writable('library')

  async function attemptRequestManifest(forceNewBuild: boolean = false) {
    $isBuildingModManifest = true

    try {
      await requestManifest(forceNewBuild)
    } catch (e) {
      console.log(e)
    } finally {
      $isBuildingModManifest = false
    }
  }

  function triggerCustomModal(): void {
    const modalComponent: ModalComponent = {
      ref: SettingsModal,
      props: { background: 'bg-red-500' },
      // Provide default slot content as a template literal
      slot: '<p>aw</p>'
    }
    const d: ModalSettings = {
      type: 'component',
      title: 'Settings',
      component: modalComponent
    }
    modalStore.trigger(d)
  }

  function triggerHelpDialog(): void {
    const modalComponent: ModalComponent = {
      ref: HelpModal,
      props: { background: 'bg-red-500' },
      // Provide default slot content as a template literal
      slot: '<p>aw</p>'
    }
    const d: ModalSettings = {
      type: 'component',
      title: 'Help',
      component: modalComponent
    }
    modalStore.trigger(d)
  }
</script>

<AppBar padding="px-2 py-2">
  <svelte:fragment slot="lead">
    <button on:click={triggerCustomModal} class="btn btn-sm">
      <Settings size={16} /> <span>Settings</span></button
    >
    <button
      on:click={() => attemptRequestManifest(false)}
      disabled={$isBuildingModManifest}
      class="btn btn-sm"
    >
      <RefreshCw size={16} />
      <span>{$isBuildingModManifest ? 'Refreshing mods...' : 'Refresh Mods'}</span></button
    >

    <button on:click={() => writeAddonlist()} disabled={$isWritingAddonlist} class="btn btn-sm">
      <Import size={16} />
      <span>{$isWritingAddonlist ? 'Writing list...' : 'Use these mods'}</span></button
    >

    <!--     <button
      on:click={() => attemptRequestManifest(true)}
      disabled={$isBuildingModManifest}
      class="btn btn-sm"
    >
      {$isBuildingModManifest ? 'refreshing manifest...' : 'force new build manifest'}</button
    > -->

    <ActionButtons />
  </svelte:fragment>

  <div class="flex justify-center hidden">
    <RadioGroup selected={store}>
      <RadioItem value="library"><Library size={16} /></RadioItem>
      <RadioItem value="autoexec"><FileCog size={16} /></RadioItem>
      <RadioItem value="vocalizer"><MessageCircle size={16} /></RadioItem>
    </RadioGroup>
  </div>

  <svelte:fragment slot="trail">
    <!-- <button class="btn btn-sm" on:click={triggerWelcomeStepper}
      ><HelpCircle size={16} /><span>welcome</span></button
    > -->

    <button class="btn btn-sm" on:click={triggerHelpDialog}
      ><HelpCircle size={16} /><span>Help</span></button
    >

    <Presets parent={{}} />
  </svelte:fragment>
</AppBar>
