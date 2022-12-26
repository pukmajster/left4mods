<script lang="ts">
  import { drawerStore, Step, Stepper } from '@skeletonlabs/skeleton'
  import { writable } from 'svelte/store'
  import { gameDir, hasFinishedFirstTimeSetup } from '../stores/profile'
  import GameDirectoryManager from './GameDirectoryManager.svelte'

  const currentStep = writable(0)

  const onComplete: any = () => {
    $gameDir = formData.gameDir
    hasFinishedFirstTimeSetup.set(true)
    drawerStore.close()
  }

  const formData = {
    gameDir: ''
  }

  let isGameDirValid = false
</script>

<div
  class="flex justify-center p-8 space-y-8 min-w-full overflow-y-scroll min-h-screen max-h-screen"
>
  <div class="wrapper ">
    <h1 class="mb-8">Setup Left 4 Mods</h1>

    <Stepper {currentStep} length={6} on:complete={onComplete}>
      <Step index={0}>
        <svelte:fragment slot="header">Welcome</svelte:fragment>
        Welcome to Left 4 Mods! Before you can start, we just need to go through a quick setup procees.
        Let's start by clicking Next!
        <br />
      </Step>
      <Step index={1} locked={!isGameDirValid}>
        <svelte:fragment slot="header">Game Directory</svelte:fragment>
        <p>
          For Left 4 Mods to work, you need to specify the location of your Left 4 Dead 2 game
          directory.
        </p>

        <p>
          If you don't know where exactly to find it: go to your Steam library, right click on "Left
          4 Dead 2", and click "Properties". Then click on the "Local Files" tab and click "Browse
          Local Files". This will open up the game directory in your file browser.
        </p>

        <GameDirectoryManager bind:state={formData.gameDir} bind:isValid={isGameDirValid} />
      </Step>

      <Step index={2}>
        <svelte:fragment slot="header">The Basics</svelte:fragment>

        <div class="space-y-2">
          <h4 class="font-bold">Enabled mods</h4>
          <img src="/media/enabledmod.png" width="154" alt="Enabled mod" />

          <p>Mods you enable will have a green bar at the bottom.</p>

          <h4 class="font-bold pt-3">Conflicting mods</h4>
          <img src="/media/conflictingmods.png" width="312" alt="Conflicting mods" />

          <p>
            Enabled mods that end up conflicting with other mods will have this orange bar at the
            bottom. You can easily sort out conflicts by viewing the "Conflicts" page via the
            annoyingly orange button!
          </p>
          <img src="/media/conflicts.png" width="156" alt="Enabled mod" />
        </div>
      </Step>

      <Step index={3}>
        <svelte:fragment slot="header">The Basics: Episode 2</svelte:fragment>

        <div class="space-y-2">
          <h4 class="font-bold">Presets</h4>
          <p>
            A preset is a selection of mods you want enabled in-game. Imagine it as a like a mod
            pack. You can have multiple, but only one may be selected at a time. I'm even giving you
            a default preset to start with, plus a "Vanilla (No Mods)" preset! How kind indeed.
          </p>

          <h4 class="font-bold pt-3">Collections</h4>
          <p>
            Collections are just groups of mods, or like labels slapped onto mods. Got a bunch of
            mods for Halloween? You can neatly organize them in a collection just for that. You'll
            already have a "Favourites" collection from the get go. My generosity is endless!
          </p>

          <h4 class="font-bold  pt-3">Refreshing the Mods Manifest</h4>
          <p>
            L4M needs to build a list of all installed mods (a.k.a the manifeset) on your system
            before you can start using anything. This will happen automatically whenever you start
            the app, and when you finish this setup. You can also manually refresh the mods list
            whenever you want by clicking the "Refresh Mods" button from the menu. Useful when
            you've installed more mods.
          </p>
        </div>
      </Step>

      <Step index={4}>
        <svelte:fragment slot="header">The Basics: More Than 2 and Less Than 4?</svelte:fragment>

        <div class="space-y-2">
          <h4 class="font-bold">Selection</h4>
          <img src="/media/selections.png" width="420" alt="Enabled mod" />
          <p>You can select multiple mods by holding down the Ctrl key and clicking on them!</p>
        </div>
      </Step>

      <Step index={5}>
        <svelte:fragment slot="header">Setup Complete</svelte:fragment>
        <div class="space-y-2">
          <p>You're all set!</p>

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
