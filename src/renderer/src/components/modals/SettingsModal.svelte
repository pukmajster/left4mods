<script lang="ts">
  import {
    modalStore,
    SlideToggle,
    Tab,
    TabGroup,
    toastStore,
    type ToastSettings
  } from '@skeletonlabs/skeleton'

  import { writable } from 'svelte/store'
  import { bridgedApi } from '../../api/api'
  import { commonToastOptions } from '../../constants/skeleton'
  import { openInitialSetupDrawer } from '../../functions/drawers'
  import { requestManifest } from '../../functions/manifest'
  import {
    customCfg,
    darkMode,
    disableOnlineFetchingOfModData,
    gameDir,
    grayscaleDisabledMods,
    launchParameters
  } from '../../stores/profile'
  import GameDirectoryManager from '../GameDirectoryManager.svelte'

  export let parent: any
  const tab = writable<'manifest' | 'Appearance' | 'launchparameters' | 'config' | 'misc'>(
    'manifest'
  )

  // Form Data
  let formData = {
    gameDir: $gameDir,
    disableOnlineFetchingOfModData: $disableOnlineFetchingOfModData,
    launchParameters: $launchParameters,
    customCfg: $customCfg
  }

  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    //if ($modalStore[0].response) $modalStore[0].response(formData)
    gameDir.set(formData.gameDir)
    disableOnlineFetchingOfModData.set(formData.disableOnlineFetchingOfModData)
    launchParameters.set(formData.launchParameters)
    customCfg.set(formData.customCfg)
    modalStore.close()
    triggerToast()
  }

  function triggerToast(): void {
    const t: ToastSettings = {
      message: 'Settings saved!',
      ...commonToastOptions
    }
    toastStore.trigger(t)
  }

  // Base Classes
  const cBase = 'space-y-4'

  const willNetworkText = 'Networking allowed.'
  const willNotNetworkText = 'Networking disabled.'

  async function forceFullManifestRefresh() {
    try {
      await requestManifest(true)
    } catch (e) {
      console.log(e)
    }
  }

  $: networkText = formData.disableOnlineFetchingOfModData ? willNotNetworkText : willNetworkText
</script>

<!-- @component This example creates a simple form modal. -->
<div class="modal-example-form {cBase}">
  <TabGroup selected={tab}>
    <Tab value="manifest">General</Tab>
    <Tab value="launchparameters">Launch Paramaters</Tab>
    <Tab value="config">Config</Tab>
    <Tab value="Appearance">Appearance</Tab>
    <Tab value="misc">Dev</Tab>
  </TabGroup>

  <div class="modal-content space-y-4">
    {#if $tab == 'manifest'}
      <h5 class="font-bold">Game Directory</h5>
      <p>
        The directory is needed to access and write to the game files. We won't be snooping outside
        of this directory even if an invalid l4d2 directory has been supplied.
      </p>

      <GameDirectoryManager bind:state={formData.gameDir} />

      <h5 class="font-bold">Disable Networking</h5>
      <p>
        A lot of .VPKs come with broken or straight up missing accompanying metadata (such as title,
        author, ...). We get around this by fetching said metadata straight from Steam's own
        workshop. In fact, so does the game! You can disable this feature if you wish, but new mods
        will show up as "undefined" until you re-enable this feature and refresh the manifest.
      </p>

      <SlideToggle bind:checked={formData.disableOnlineFetchingOfModData}>{networkText}</SlideToggle
      >
    {/if}

    {#if $tab == 'launchparameters'}
      <h5 class="font-bold">Launch Parameters</h5>
      <p>Launch parameters to use when launching the game directly from the app.</p>
      <div class="flex gap-4">
        <input
          type="text"
          bind:value={formData.launchParameters}
          placeholder="Enter launch parameters..."
          class="flex-1 w-full"
        />
      </div>

      <p>Recommended launch parameters to use:</p>

      <ul class="pl-4">
        <li>-novid (skips the intro cutscene)</li>
        <li>+exec left4mods.cfg (executes your custom config)</li>
      </ul>
    {/if}

    {#if $tab == 'config'}
      <h5 class="font-bold">Config</h5>
      <p>Write your custom config here...</p>
      <div class="flex gap-4">
        <textarea rows="15" rowspan="15" bind:value={formData.customCfg} class="flex-1 w-full" />
      </div>
    {/if}

    {#if $tab == 'Appearance'}
      <h5 class="font-bold">Theme</h5>
      <p>Light theme is supported but it's not quite there yet</p>
      <SlideToggle bind:checked={$darkMode}
        >{$darkMode ? 'Dark Mode' : 'Light Theme (WIP)'}</SlideToggle
      >

      <h5 class="font-bold">Gray Out Disabled Mods</h5>
      <p>Disabled mods will appear in black and white for better distinction from enabled mods</p>
      <SlideToggle bind:checked={$grayscaleDisabledMods}
        >{$grayscaleDisabledMods ? 'Enabled' : 'Disabled'}</SlideToggle
      >
    {/if}

    {#if $tab == 'misc'}
      <div class="flex flex-col space-y-2">
        <button class="btn btn-ghost-warning" on:click={forceFullManifestRefresh}
          >forceFullManifestRefresh</button
        >

        <button class="btn btn-ghost-warning" on:click={openInitialSetupDrawer}
          >openInitialSetupDrawer</button
        >

        <button class="btn btn-ghost-warning" on:click={bridgedApi.openWorkingDirectory}
          >openWorkingDirectory</button
        >

        <button class="btn btn-ghost-warning" on:click={bridgedApi.openGameDirectory}
          >openGameDirectory</button
        >
      </div>
    {/if}
  </div>

  <!-- prettier-ignore -->
  <footer class="modal-footer {parent.regionFooter}">
    <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Cancel</button>
    <button class="btn btn-ghost-primary" on:click={onFormSubmit}> Save</button>
  </footer>
</div>

<style>
  .modal-content {
    min-height: 480px;
  }

  textarea {
    resize: none;
  }
</style>
