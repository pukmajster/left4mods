<script lang="ts">
  import {
    groupedEnabledMods,
    paginatedSortedFilteredMods,
    showConflictingView
  } from '../stores/library'
  import { modManifest } from '../stores/manifest'
  import { activePreset } from '../stores/profile'
  import ModCard from './ModCard.svelte'
  import TopRow from './TopRow.svelte'
</script>

<ul class="library">
  <div class="mods-wrapper">
    <TopRow />
    <div class="mods-inner">
      {#if $activePreset == ''}
        <div class="no-preset-selected">
          <h1>No preset selected</h1>
          <p>Please select a preset or create a new one.</p>
        </div>
      {:else if $showConflictingView}
        {#if $groupedEnabledMods.length == 0}
          <div class="no-conflicting-mods p-2 pl-8 space-y-2">
            <h1>No conflicting mods</h1>
            <p>There are no conflicting mods in your preset.</p>
          </div>
        {/if}
        <div class="conflicting-mods">
          {#each $groupedEnabledMods as group, i}
            <h3>Conflicting mods #{i + 1}</h3>
            <div class="conflicting-mods-group mt-2 mb-5">
              {#each group as mod}
                <ModCard {mod} />
              {/each}
            </div>
          {/each}
        </div>
      {:else if Object.keys(modManifest).length == 0}
        <div class="no-mods-found p-2 pl-4 space-y-2">
          <h1>No mods installed.</h1>
        </div>
      {:else if $paginatedSortedFilteredMods.length == 0}
        <div class="no-mods-found p-2 pl-4 space-y-2">
          <h1>No mods found.</h1>
          <p>Try changing your search query or filters.</p>
        </div>
      {:else}
        <div class="mods-list p-4 pt-0">
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
    position: relative;
  }

  .library,
  .library * {
    user-select: none;
  }

  .mods-wrapper {
    display: flex;
    flex-direction: column;
  }

  .mods-inner {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 300px;
  }

  .mods-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
    align-items: stretch;

    gap: 12px;
  }

  .mods-list:last-child {
    padding-bottom: 24em;
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
    grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
    align-items: stretch;
    gap: 12px;
  }
</style>
