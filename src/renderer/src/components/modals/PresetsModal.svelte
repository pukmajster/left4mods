<script lang="ts">
  // Props
  /** Exposes parent props to this component. */
  export let parent: any
  // Stores
  import { nanoid } from 'nanoid'
  import { activePreset, presets } from '../../stores/profile'

  // Form Data
  const formData = {
    newPresetName: ''
  }
  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    //if ($modalStore[0].response) $modalStore[0].response(formData)
    createNewPreset(formData.newPresetName)
    //modalStore.close()
  }

  function createNewPreset(newPresetName: string) {
    if (newPresetName === '') return
    if ($presets.find((preset) => preset.id === newPresetName)) return

    presets.update((presets) => {
      presets.push({
        label: newPresetName,
        id: nanoid(),
        enabledMods: []
      })

      return presets
    })
    $activePreset = newPresetName
    newPresetName = ''
  }

  // Base Classes
  const cBase = 'space-y-4'
</script>

<!-- @component This example creates a simple form modal. -->
<div class="modal-example-form {cBase}">
  <h5 class="font-bold">Pick Preset</h5>
  <select bind:value={$activePreset} placeholder="preset" class="">
    <option hidden value="">None</option>
    {#each $presets as preset}
      <option value={preset.id}>{preset.label}</option>
    {/each}
  </select>

  <h5 class="font-bold">Create new preset</h5>
  <div class="flex gap-4">
    <input
      type="text"
      bind:value={formData.newPresetName}
      placeholder="Enter name..."
      class="flex-1 w-full"
    />

    <button class="btn btn-ghost-accent" on:click={onFormSubmit}>Create preset</button>
  </div>

  <!--   <ListBox
    accent="!bg-accent-active-token"
    hover="!bg-accent-hover-token"
    selected={activePreset}
    label="Select Active Preset"
  >
    {#each $presets as preset}
      <ListBoxItem value={preset.id}>{preset.label}</ListBoxItem>
    {/each}
  </ListBox> -->

  <!-- prettier-ignore -->
  <footer class="modal-footer {parent.regionFooter}">
    <button class="btn btn-ghost-accent" on:click={parent.onClose}>Ok</button>
  </footer>
</div>
