<script lang="ts">
  import { modalStore, SlideToggle } from '@skeletonlabs/skeleton'

  // Props
  /** Exposes parent props to this component. */
  export let parent: any

  // Stores
  import { disableOnlineFetchingOfModData, gameDir } from '../../stores/profile'

  // Form Data
  let formData = {
    gameDir: $gameDir,
    disableOnlineFetchingOfModData: $disableOnlineFetchingOfModData
  }

  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    //if ($modalStore[0].response) $modalStore[0].response(formData)
    gameDir.set(formData.gameDir)
    disableOnlineFetchingOfModData.set(formData.disableOnlineFetchingOfModData)
    modalStore.close()
  }

  // Base Classes
  const cBase = 'space-y-4'

  const willNetworkText = 'Networking allowed.'
  const willNotNetworkText = 'Networking disabled.'

  $: networkText = !formData.disableOnlineFetchingOfModData ? willNotNetworkText : willNetworkText
</script>

<!-- @component This example creates a simple form modal. -->
<div class="modal-example-form {cBase}">
  <h5 class="font-bold">Game Directory</h5>
  <p>
    The directory is needed to access and write to the game files. We won't be snooping outside of
    this directory even if an invalid l4d2 directory has been supplied.
  </p>
  <div class="flex gap-4">
    <input
      type="text"
      bind:value={formData.gameDir}
      placeholder="Enter name..."
      class="flex-1 w-full"
    />
  </div>

  <h5 class="font-bold">Networking</h5>
  <p>
    A lot of .VPKs come with broken or straight up missing accompanying metadata (such as title,
    author, ...). We get around this by fetching said metadata straight from Steam's own workshop.
    In fact, so does the game! You can disable this feature if you wish, but new mods will show up
    as "undefined" until you re-enable this feature and refresh the manifest.
  </p>

  <SlideToggle bind:checked={formData.disableOnlineFetchingOfModData}>{networkText}</SlideToggle>

  <!-- prettier-ignore -->
  <footer class="modal-footer {parent.regionFooter}">
    <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Cancel</button>
    <button class="btn btn-ghost-accent" on:click={onFormSubmit}> Save</button>

  </footer>
</div>
