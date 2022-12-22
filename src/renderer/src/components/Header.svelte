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
    writeAddons: {
      content: 'Save your selected preset to the game.',
      position: 'bottom',
      regionTooltip: '!text-sm'
    },
    startGame: {
      content: 'Launch the game with your selected preset.',
      position: 'bottom',
      regionTooltip: '!text-sm'
    },
    refreshManifest: {
      content: 'Refresh the list of installed mods.',
      position: 'right',
      regionTooltip: '!text-sm'
    }
  }

  async function launchGame() {
    await writeAddonlist()
    window.api.openLinkInBrowser(`steam://run/550/${$launchParameters}`)
  }
</script>

<AppBar padding="px-2 py-2">
  <svelte:fragment slot="lead">
    <div class="space-x-2">
      <!--     <button on:click={triggerCustomModal} class="btn btn-sm">
      <Settings size={16} /> <span>Settings</span></button
    >
 -->
      <button on:click={triggerCustomModal} class="btn-icon btn-icon-sm   ">
        <Settings size={16} /></button
      >

      <button
        on:click={() => attemptRequestManifest(false)}
        disabled={$isBuildingModManifest}
        class="btn-icon btn-icon-sm   "
        use:tooltip={tooltips.refreshManifest}
      >
        <RefreshCw size={16} /></button
      >

      <!--     <button
      on:click={() => attemptRequestManifest(false)}
      disabled={$isBuildingModManifest}
      class="btn btn-sm"
    >
      <RefreshCw size={16} />
      <span>{$isBuildingModManifest ? 'Refreshing mods...' : 'Refresh Mods'}</span></button
    > -->

      <!--         <button
      on:click={() => writeAddonlist()}
      disabled={$isWritingAddonlist}
      use:tooltip={tooltips.writeaAddons}
      class="btn btn-sm"
    >
      <Import size={16} />
      <span>{$isWritingAddonlist ? 'Writing List...' : 'Use These Mods'}</span></button
    > -->

      <button
        on:click={() => writeAddonlist()}
        disabled={$isWritingAddonlist}
        use:tooltip={tooltips.writeAddons}
        class="btn-icon btn-icon-sm   "
      >
        <Import size={16} /></button
      >

      <!--       <button
        on:click={launchGame}
        use:tooltip={tooltips.startGame}
        class="btn-icon  btn-icon-sm btn-filled-primary "
      >
        <Play size={16} /></button
      > -->

      <button
        on:click={launchGame}
        use:tooltip={tooltips.startGame}
        class="btn btn-sm  btn-ghost-primary "
      >
        <Play size={16} /> <span>Launch L4D2</span></button
      >
    </div>
  </svelte:fragment>

  <div class=" justify-center hidden">
    <RadioGroup selected={store}>
      <RadioItem value="library"><Library size={16} /></RadioItem>
      <RadioItem value="autoexec"><FileCog size={16} /></RadioItem>
      <RadioItem value="vocalizer"><MessageCircle size={16} /></RadioItem>
    </RadioGroup>
  </div>

  <svelte:fragment slot="trail">
    <button class="btn-icon btn-icon-sm " on:click={triggerHelpDialog}
      ><HelpCircle size={18} />
    </button>

    <Presets parent={{}} />
  </svelte:fragment>
</AppBar>

<style>
  .btn-icon {
    padding: 0;
    margin: 0;
  }
</style>
