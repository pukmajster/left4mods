<script lang="ts">
  // Props
  /** Exposes parent props to this component. */
  export let parent: any
  // Stores
  import { nanoid } from 'nanoid'
  import { activePreset, presets, renameCurrentPreset } from '../../stores/profile'

  const formData = {
    newPresetName: ''
  }

  function onFormSubmit(): void {
    createNewPreset(formData.newPresetName)
  }

  const renameFormData = {
    label: ''
  }

  $: selectedPresetLabel = $presets.find((collection) => collection.id === $activePreset)?.label!

  function onRename() {
    renameCurrentPreset(renameFormData.label)
    renameFormData.label = ''
  }

  function createNewPreset(newPresetName: string) {
    if (newPresetName === '') return
    if ($presets.find((preset) => preset.id === newPresetName)) return

    let newId = nanoid()

    presets.update((presets) => {
      presets.push({
        label: newPresetName,
        id: newId,
        enabledMods: []
      })

      return presets
    })
    $activePreset = newId
    formData.newPresetName = ''
  }

  // Base Classes
  const cBase = 'space-y-4'
</script>

<!-- @component This example creates a simple form modal. -->
<div class="modal-example-form {cBase}">
  <select bind:value={$activePreset} placeholder="preset" class="">
    <option hidden value="">None</option>
    {#each $presets as preset}
      <option value={preset.id}>{preset.label}</option>
    {/each}
  </select>

  <div class="flex gap-3">
    <input
      bind:value={renameFormData.label}
      placeholder={`Rename preset "${selectedPresetLabel}"`}
      type="text"
    />
    <button
      on:click={onRename}
      disabled={renameFormData.label.length == 0}
      class="btn btn-ghost-accent">Rename</button
    >
  </div>

  <h5 class="font-bold">Create New Preset</h5>
  <div class="flex gap-4">
    <input
      type="text"
      bind:value={formData.newPresetName}
      placeholder="Enter new preset name..."
      class="flex-1 w-full"
    />

    <button
      class="btn btn-ghost-accent"
      disabled={formData.newPresetName.length == 0}
      on:click={onFormSubmit}>Create Preset</button
    >
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
