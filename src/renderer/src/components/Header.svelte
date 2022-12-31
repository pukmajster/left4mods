<script lang="ts">
  import {
    AppBar,
    Divider,
    menu,
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
    Menu,
    MessageCircle,
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

  import l4d2logo from '../assets/media/icons/icon_l4d.png'

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
      position: 'right',
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
    //window.api.openLinkInBrowser(`steam://rungameid/550//${$launchParameters}`)
    window.api.openLinkInBrowser(`steam://rungameid/550/`)
  }
</script>

<nav class=" p-2 px-2 card w-64 shadow-xl mt-14 ml-2" data-menu="example">
  <div class="!flex flex-col gap-2  ">
    <button on:click={triggerCustomModal} class="flex-1 btn text-left">
      <Settings size={16} /> <span>Settings</span></button
    >

    <button
      on:click={() => attemptRequestManifest(false)}
      disabled={$isBuildingModManifest}
      class="btn  "
    >
      <RefreshCw size={16} />
      <span>{$isBuildingModManifest ? 'Refreshing mods...' : 'Refresh Mods'}</span></button
    >

    <button on:click={() => writeAddonlist()} disabled={$isWritingAddonlist} class="btn  ">
      <Import size={16} />
      <span>{$isWritingAddonlist ? 'Writing List...' : 'Save Changes'}</span></button
    >

    <Divider />

    <button class="btn" on:click={triggerHelpDialog}
      ><HelpCircle size={16} />
      <span>Help</span>
    </button>
  </div>
</nav>

<AppBar padding="px-4 py-2">
  <svelte:fragment slot="lead">
    <div class=" space-x-1">
      <button use:menu={{ menu: 'example' }} class=" menubutton btn btn-sm btn-filled-surface">
        <Menu size={16} />
        <span> Menu</span>
      </button>

      <!--       <button on:click={triggerCustomModal} class="btn-icon btn-icon-sm   ">
        <Settings size={16} /></button
      > -->

      <!--    <button
        on:click={() => attemptRequestManifest(false)}
        disabled={$isBuildingModManifest}
        class="btn-icon btn-icon-sm   "
        use:tooltip={tooltips.refreshManifest}
      >
        <RefreshCw size={16} /></button
      >
 -->

      <!--      <button
        on:click={() => writeAddonlist()}
        disabled={$isWritingAddonlist}
        use:tooltip={tooltips.writeAddons}
        class="btn-icon btn-icon-sm   "
      >
        <Import size={16} /></button
      > -->

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
        <!--  <Play size={16} /> -->
        <img width="16px" src={l4d2logo} alt={'play'} />
        <span>Launch L4D2</span></button
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
    <Presets parent={{}} />
  </svelte:fragment>
</AppBar>

<style lang="postcss">
  .btn-icon {
    padding: 0;
    margin: 0;
  }

  nav button {
    @apply justify-start gap-1;
  }

  nav button:hover,
  .menubutton:hover {
    @apply bg-zinc-600/70;
  }
</style>
