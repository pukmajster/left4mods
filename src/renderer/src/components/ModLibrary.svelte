<script lang="ts">
  import {
    groupedEnabledMods,
    paginatedSortedFilteredMods,
    showConflictingView
  } from '../stores/library'
  import { activePreset } from '../stores/profile'
  import ModCard from './ModCard.svelte'
  import Sidebar from './Sidebar.svelte'
  import TopRow from './TopRow.svelte'
</script>

<ul class="library">
  <Sidebar />
  <div class="mods-wrapper">
    <TopRow />
    <div class="mods-inner">
      {#if $activePreset == ''}
        <div class="no-preset-selected">
          <h1>No preset selected</h1>
          <p>Please select a preset or create a new one.</p>
        </div>
      {:else if $showConflictingView}
        <div class="conflicting-mods">
          {#each $groupedEnabledMods as group, i}
            <h2>Conflicting mods #{i + 1}</h2>
            <div class="conflicting-mods-group">
              {#each group as mod}
                <ModCard {mod} />
              {/each}
            </div>
          {/each}
        </div>
      {:else}
        <div class="mods-list">
          {#each $paginatedSortedFilteredMods as mod}
            <ModCard {mod} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</ul>

<style>
  .library {
    display: grid;
    grid-template-columns: 260px 1fr;
    position: relative;

    width: 100vw;
    height: calc(100vh - 64px);
    overflow: hidden;
  }

  .library,
  .library * {
    user-select: none;
  }

  .mods-wrapper {
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .mods-inner {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    flex: 1;
  }

  .mods-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(182px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
    align-items: stretch;

    gap: 12px;
    padding: 1em;
    padding-left: 0.5em;

    height: 600px;
  }

  .mods-list:last-child {
    padding-bottom: 4em;
  }

  .conflicting-mods {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-left: 1em;
  }

  .conflicting-mods-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(182px, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
    align-items: stretch;
    gap: 12px;
    padding: 0.6em 0 1.5em 0;
  }
</style>
