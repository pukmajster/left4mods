<script lang="ts">
  import { drawerStore, Step, Stepper } from '@skeletonlabs/skeleton'
  import { FolderSearch } from 'lucide-svelte'
  import { writable } from 'svelte/store'
  import { requestManifest } from '../functions/manifest'
  import { gameDir, hasFinishedFirstTimeSetup } from '../stores/profile'

  const currentStep = writable(0)

  const onComplete: any = () => {
    /* handle the event */
    $gameDir = formData.gameDir
    hasFinishedFirstTimeSetup.set(true)
    drawerStore.close()
    requestManifest(false)
  }

  const formData = {
    gameDir: $gameDir
  }

  async function browseGameDir() {
    let result = await window.api.selectFolder()
    if (result) {
      formData.gameDir = result
    }
  }

  $: lockGameDirStep =
    !formData.gameDir.endsWith('common/Left 4 Dead 2') &&
    !formData.gameDir.endsWith('common/Left 4 Dead 2/')
</script>

<div class="flex justify-center p-8 space-y-8 overflow-y-scroll min-h-full">
  <div class="wrapper">
    <h1 class="mb-8">Initial Setup</h1>

    <Stepper {currentStep} length={6} on:complete={onComplete}>
      <Step index={0}>
        <svelte:fragment slot="header">Welcome</svelte:fragment>
        Welcome to L4D2-Launcher! Before you can start, you just need to go throught a quick set up procees.
        Let's start by clicking Next!
        <br />
      </Step>
      <Step index={1} locked={lockGameDirStep}>
        <svelte:fragment slot="header">Game Directory</svelte:fragment>
        <p>
          For L4D2-Launcher to work, you need to specify the location of your Left 4 Dead 2 game
          directory. Rather obvious...
        </p>

        <p>
          If you don't know where exactly to find it: go to your Steam library, right click on Left
          4 Dead 2, and click "Properties". Then click on the "Local Files" tab and click "Browse
          Local Files". This will open up the game directory in your file browser.
        </p>

        <p>
          The end of the directory should look like this:
          <span class="pl-4 font-bold">.../common/Left 4 Dead 2/left4dead2/</span>
        </p>
        <div class="flex gap-4">
          <input bind:value={formData.gameDir} type="text" class="flex-1" />
          <button class="btn" on:click={browseGameDir}>
            <FolderSearch />

            <span>Browse</span>
          </button>
        </div>
        {#if lockGameDirStep && formData.gameDir}
          <span class="text-red-500 pl-4 text-xs"> Invalid game diretory. Look again... </span>
        {/if}
      </Step>

      <Step index={2}>
        <svelte:fragment slot="header">The Basics</svelte:fragment>

        <div class="space-y-2">
          <h4 class="font-bold">Enabled mods</h4>
          <img src="/images/enabledmod.png" width="154" alt="Enabled mod" />

          <p>Mods you enable will have a green line at the bottom.</p>

          <h4 class="font-bold pt-3">Conflicting mods</h4>
          <img src="/images/conflictingmods.png" width="312" alt="Conflicting mods" />

          <p>
            Enabled mods that end up conflicting with other mods will have this red line at the
            bottom. Usually, most your mods will still work fine, but you can easily sort out
            conflicts by viewing the "Conflicts" page via the annoyingly red button!
          </p>
          <img src="/images/conflicts.png" width="156" alt="Enabled mod" />
        </div>
      </Step>

      <Step index={3}>
        <svelte:fragment slot="header">The Basics: Episode 2</svelte:fragment>

        <div class="space-y-2">
          <h4 class="font-bold">Presets</h4>
          <p>
            A preset is a selection of mods you want enabled in-game. Imagine it as a like a mod
            pack. You can have multiple, but only one may be selected at a time. I'm even giving you
            a default preset to work with! How kind indeed.
          </p>

          <h4 class="font-bold pt-3">Colletions</h4>
          <p>
            Collections are just groups of mods, or like labels slapped onto mods. Got a bunch of
            mods for Halloween? You can neatly organize them in a collection just for that. You'll
            already have a "Favorites" collection from the get go. My generosity is endless!
          </p>

          <h4 class="font-bold  pt-3">Refreshing mods</h4>
          <p>
            The app needs to build a list of all installed mods on your system before you can start
            using anything. This will happen automatically when you start the app, and when you
            finish this setup. You can also manually refresh the mods list whenever you want by
            clicking the "Refresh Mods" button. Usefull when you've downloaded more mods.
          </p>
        </div>
      </Step>

      <Step index={4}>
        <svelte:fragment slot="header">The Basics: More than 2 and less than 4?</svelte:fragment>

        <div class="space-y-2">
          <h4 class="font-bold">Selection</h4>
          <img src="/images/selections.png" width="420" alt="Enabled mod" />
          <p>You can select multiple mods by holding down the Ctrl key and clicking on them!</p>
        </div>
      </Step>

      <Step index={5}>
        <svelte:fragment slot="header">Setup Complete</svelte:fragment>
        <div class="space-y-2">
          <p>
            You're all set! Remember to take a quick gander at the settings and view the Help panel
            (located in the header) for more info.
          </p>

          <p>
            Remember, this thing is in its early stages... there will be bugs and missing features.
            Otherwise, enjoy!
          </p>
        </div>
      </Step>
    </Stepper>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    width: 800px;
  }

  img {
    border-radius: 4px;
    @apply shadow-md;
  }
</style>
