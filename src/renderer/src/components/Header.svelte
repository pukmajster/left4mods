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
    Album,
    Eye,
    FileCog,
    HelpCircle,
    Import,
    Library,
    Link,
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
  import { onlyShowModsNotInAnyCollection } from '../stores/library'

  let store = writable('library')

  async function attemptRequestManifest(forceNewBuild: boolean = false) {
    requestManifest(forceNewBuild)
  }

  function openWorkshopInBrowser() {
    window.api.openLinkInBrowser('https://steamcommunity.com/app/550/workshop/')
  }

  function openWorkshopInSteam() {
    window.api.openLinkInBrowser('https://steamcommunity.com/app/550/workshop/')
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

  function toggleOnlyShowModsNotInAnyCollection() {
    onlyShowModsNotInAnyCollection.set(!$onlyShowModsNotInAnyCollection)
  }
</script>

<AppBar padding="px-4 py-2">
  <svelte:fragment slot="lead">
    <div class=" space-x-1 ">
      <span class="relative">
        <button use:menu={{ menu: 'example' }} class=" menubutton btn btn-sm btn-filled-surface">
          <Menu size={16} />
          <span> Menu</span>
        </button>

        <nav class=" p-2 px-2 card w-64 shadow-xl " data-menu="example">
          <div class="!flex flex-col gap-2">
            <button on:click={triggerCustomModal} class="flex-1 btn btn-sm text-left">
              <Settings size={16} /> <span>Settings</span></button
            >

            <button
              on:click={() => attemptRequestManifest(false)}
              disabled={$isBuildingModManifest}
              class="btn btn-sm "
            >
              <RefreshCw size={16} />
              <span>{$isBuildingModManifest ? 'Refreshing mods...' : 'Refresh Mods'}</span></button
            >

            <button
              on:click={() => writeAddonlist()}
              disabled={$isWritingAddonlist}
              class="btn btn-sm  "
            >
              <Import size={16} />
              <span>{$isWritingAddonlist ? 'Writing List...' : 'Save Changes'}</span></button
            >

            <Divider />

            <button class="btn btn-sm" on:click={triggerHelpDialog}
              ><HelpCircle size={16} />
              <span>Help</span>
            </button>
          </div>
        </nav>
      </span>

      <span class="relative">
        <button use:menu={{ menu: 'view' }} class=" menubutton btn btn-sm btn-filled-surface">
          <Eye size={16} />
          <span> View</span>
        </button>

        <nav class=" p-2 px-2 card shadow-xl " data-menu="view">
          <div class="!flex flex-col gap-2  ">
            <!-- <button on:click={triggerCustomModal} class="flex-1 btn text-left">
        <EyeOff size={16} /> <span>Show/hide hidden mods</span></button
      > -->

            <button
              on:click={toggleOnlyShowModsNotInAnyCollection}
              class="flex-1 btn btn-sm text-left"
            >
              <Album size={16} />

              {#if $onlyShowModsNotInAnyCollection}
                <span>Show all mods</span>
              {:else}
                <span>Only show mods in no collection</span>
              {/if}
            </button>

            <button on:click={openWorkshopInBrowser} class="flex-1 btn btn-sm text-left">
              <Link size={16} />
              <span>Open workshop in browser</span>
            </button>

            <button disabled on:click={openWorkshopInSteam} class="flex-1 btn btn-sm text-left">
              <Link size={16} />
              <span>Open Workshop in Steam</span>
            </button>
          </div>
        </nav>
      </span>

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
        class="btn btn-sm  btn-filled-primary "
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
