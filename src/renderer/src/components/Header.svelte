<script lang="ts">
  import {
    AppBar,
    modalStore,
    RadioGroup,
    RadioItem,
    tooltip,
    type ModalComponent,
    type ModalSettings
  } from '@skeletonlabs/skeleton'
  import {
    FileCog,
    HelpCircle,
    Import,
    Library,
    MessageCircle,
    Play,
    RefreshCw,
    Settings
  } from 'lucide-svelte'
  import { writable } from 'svelte/store'
  import { requestManifest } from '../functions/manifest'
  import HelpModal from './modals/HelpModal.svelte'
  import SettingsModal from './modals/SettingsModal.svelte'
  import Presets from './Presets.svelte'

  import { writeAddonlist } from '../functions/writeAddonlist'
  import { isBuildingModManifest, isWritingAddonlist } from '../stores/manifest'
  import { launchParameters } from '../stores/profile'

  let store = writable('library')

  async function attemptRequestManifest(forceNewBuild: boolean = false) {
    requestManifest(forceNewBuild)
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

  const tooltips = {
    writeaAddons: {
      content: 'Save your selected preset to the game.',
      position: 'bottom'
    },
    startGame: {
      content: 'Launch the game with your selected preset.',
      position: 'bottom'
    }
  }

  async function launchGame() {
    await writeAddonlist()
    window.api.openLinkInBrowser(`steam://run/550/${$launchParameters}`)
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

    <button
      on:click={() => writeAddonlist()}
      disabled={$isWritingAddonlist}
      use:tooltip={tooltips.writeaAddons}
      class="btn btn-sm"
    >
      <Import size={16} />
      <span>{$isWritingAddonlist ? 'Writing List...' : 'Use These Mods'}</span></button
    >

    <button
      on:click={launchGame}
      use:tooltip={tooltips.startGame}
      class="btn btn-sm btn-filled-primary ml-2"
    >
      <Play size={16} /> <span>Launch L4D2</span></button
    >
  </svelte:fragment>

  <div class=" justify-center hidden">
    <RadioGroup selected={store}>
      <RadioItem value="library"><Library size={16} /></RadioItem>
      <RadioItem value="autoexec"><FileCog size={16} /></RadioItem>
      <RadioItem value="vocalizer"><MessageCircle size={16} /></RadioItem>
    </RadioGroup>
  </div>

  <svelte:fragment slot="trail">
    <button class="btn btn-sm" on:click={triggerHelpDialog}
      ><HelpCircle size={16} /><span>Help</span></button
    >

    <Presets parent={{}} />
  </svelte:fragment>
</AppBar>
