<script lang="ts">
  import {
    enabledMods,
    paginatedSortedFilteredMods,
    searchTerm,
    selectedGrenades,
    selectedGuns,
    selectedInfected,
    selectedMelees,
    selectedMisc,
    selectedSurvivors,
    selectedUtils,
    sortedFilteredMods
  } from '../stores/library'

  import categories from '../constants/categories'
  import { modManifest } from '../stores/manifest'
  import ActionButtons from './ActionButtons.svelte'
  import Collections from './Collections.svelte'
  let visibleFilterPanel = 'guns'

  function setVisiblePanel(panel: string) {
    clearCategorySelection()
    visibleFilterPanel = panel
  }

  function clearCategorySelection() {
    selectedGuns.set([])
    selectedMelees.set([])
    selectedGrenades.set([])
    selectedUtils.set([])
    selectedSurvivors.set([])
    selectedInfected.set([])
    selectedMisc.set([])
  }
</script>

<div class="sidebar">
  <div class="sidebar-inner">
    <input placeholder="Search" bind:value={$searchTerm} />
    <br />

    <div class="stats">
      <p>Mods installed: {Object.keys($modManifest).length}</p>
      <p>Mods enabled: {$enabledMods.length}</p>
      <p>Mods by filter: {Object.keys($sortedFilteredMods).length}</p>
      <p>Mods shown: {Object.keys($paginatedSortedFilteredMods).length}</p>
    </div>

    <div style="height: 7px" />

    <div class="filter-panels">
      <div class="panel-hovers">
        <button
          class:active={$selectedGuns.length > 0 && $selectedGuns[0] != ''}
          class:selected={visibleFilterPanel == 'guns'}
          on:click={() => setVisiblePanel('guns')}><span>guns</span></button
        >
        <button
          class:active={$selectedMelees.length > 0 && $selectedMelees[0] != ''}
          class:selected={visibleFilterPanel == 'melee'}
          on:click={() => setVisiblePanel('melee')}><span>melee</span></button
        >
        <button
          class:active={$selectedGrenades.length > 0 && $selectedGrenades[0] != ''}
          class:selected={visibleFilterPanel == 'grenades'}
          on:click={() => setVisiblePanel('grenades')}><span>grenades</span></button
        >
        <button
          class:active={$selectedUtils.length > 0 && $selectedUtils[0] != ''}
          class:selected={visibleFilterPanel == 'utils'}
          on:click={() => setVisiblePanel('utils')}><span>utils</span></button
        >
        <button
          class:active={$selectedSurvivors.length > 0 && $selectedSurvivors[0] != ''}
          class:selected={visibleFilterPanel == 'survivors'}
          on:click={() => setVisiblePanel('survivors')}><span>survivors</span></button
        >
        <button
          class:active={$selectedInfected.length > 0 && $selectedInfected[0] != ''}
          class:selected={visibleFilterPanel == 'infected'}
          on:click={() => setVisiblePanel('infected')}><span>infected</span></button
        >
        <button
          class:active={$selectedMisc.length > 0 && $selectedMisc[0] != ''}
          class:selected={visibleFilterPanel == 'misc'}
          on:click={() => setVisiblePanel('misc')}><span>misc</span></button
        >
      </div>

      <!-- guns -->
      <select multiple bind:value={$selectedGuns} class:visible={visibleFilterPanel == 'guns'}>
        <option value="">- NONE -</option>
        {#each categories.guns as entry}
          <option value={entry}>
            {entry}
          </option>
        {/each}
      </select>

      <!-- melee -->
      <select multiple bind:value={$selectedMelees} class:visible={visibleFilterPanel == 'melee'}>
        <option value="">- NONE -</option>
        {#each categories.melee as entry}
          <option value={entry}>
            {entry}
          </option>
        {/each}
      </select>

      <!-- grenades -->
      <select
        multiple
        bind:value={$selectedGrenades}
        class:visible={visibleFilterPanel == 'grenades'}
      >
        <option value="">- NONE -</option>
        {#each categories.grenades as entry}
          <option value={entry}>
            {entry}
          </option>
        {/each}
      </select>

      <!-- utils -->
      <select multiple bind:value={$selectedUtils} class:visible={visibleFilterPanel == 'utils'}>
        <option value="">- NONE -</option>
        {#each categories.utils as entry}
          <option value={entry}>
            {entry}
          </option>
        {/each}
      </select>

      <!-- survivors -->
      <select
        multiple
        bind:value={$selectedSurvivors}
        class:visible={visibleFilterPanel == 'survivors'}
      >
        <option value="">- NONE -</option>
        {#each categories.survivors as entry}
          <option value={entry}>
            {entry}
          </option>
        {/each}
      </select>

      <!-- infected -->
      <select
        multiple
        bind:value={$selectedInfected}
        class:visible={visibleFilterPanel == 'infected'}
      >
        <option value="">- NONE -</option>
        {#each categories.infected as entry}
          <option value={entry}>
            {entry}
          </option>
        {/each}
      </select>

      <!-- misc -->
      <select multiple bind:value={$selectedMisc} class:visible={visibleFilterPanel == 'misc'}>
        <option value="">- NONE -</option>
        {#each categories.misc as entry}
          <option value={entry}>
            {entry}
          </option>
        {/each}
      </select>
    </div>

    <div style="height: 1em" />

    <Collections />

    <div style="height: 1px; background-color: gray" />
    <div style="height: 1em" />

    <ActionButtons />
  </div>
</div>

<style>
  .sidebar {
    padding: 1em;

    display: flex;
    flex-direction: column;
  }

  .sidebar-inner {
    display: flex;
    flex-direction: column;
  }

  .filter-panels select {
    display: none;
    height: 466px;
    width: 100%;
    overflow: hidden;
  }

  .filter-panels select.visible {
    display: block;
  }

  .panel-hovers {
    display: flex;
    flex-direction: column;
    gap: 2px;
    /* transform: rotate(-90deg);
    transform-origin: center; */
  }

  .panel-hovers button span {
    font-weight: 600;
    text-transform: uppercase;

    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-orientation: inherit;
    width: 32px;
  }

  .panel-hovers button.active {
    color: rgb(0, 42, 255);
  }

  .panel-hovers button.selected {
    color: red;
  }

  .panel-hovers button {
    padding: 2px;
  }

  .panel-hovers {
    width: 24px;
    margin-right: 12px;
  }

  .filter-panels {
    width: 100%;
    display: flex;
  }

  option {
    padding: 4px;
  }

  option:checked {
    color: rgb(234, 249, 255);
    background-color: black;
  }

  .stats {
    font-size: 13px;
  }
</style>
