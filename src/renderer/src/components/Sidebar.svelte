<script lang="ts">
  import categories from '../constants/categories'
  import {
    searchTerm,
    selectedGrenades,
    selectedGuns,
    selectedInfected,
    selectedMelees,
    selectedMisc,
    selectedSurvivors,
    selectedUtils,
    showConflictingView,
    totalConflictingMods,
    visibleFilterPanel
  } from '../stores/library'
  import Collections from './Collections.svelte'
  import SidebarCategoryButton from './SidebarCategoryButton.svelte'
  import SidebarCategoryEntry from './SidebarCategoryEntry.svelte'

  function toggleView() {
    $showConflictingView = !$showConflictingView
  }
</script>

<div class="sidebar">
  <div class="sidebar-inner">
    <input type="text" placeholder="Search" bind:value={$searchTerm} />

    <button
      on:click={toggleView}
      class="btn btn-sm my-3"
      class:btn-ghost-warning={$totalConflictingMods > 0}
    >
      {#if $showConflictingView}
        Show all
      {:else}
        Show {$totalConflictingMods} conflicting
      {/if}
    </button>

    <div class="filter-panels">
      <div class="panel-hovers">
        <div class="flex flex-col pt-1">
          <SidebarCategoryButton categoryName={'guns'} />
          <SidebarCategoryButton categoryName={'melee'} />
          <SidebarCategoryButton categoryName={'grenades'} />
          <SidebarCategoryButton categoryName={'utils'} />
          <SidebarCategoryButton categoryName={'survivors'} />
          <SidebarCategoryButton categoryName={'infected'} />
          <SidebarCategoryButton categoryName={'misc'} />
        </div>
      </div>

      <!-- guns -->
      <SidebarCategoryEntry
        categoryName="guns"
        categoryEntries={categories.guns}
        store={selectedGuns}
        isVisible={$visibleFilterPanel == 'guns'}
      />

      <SidebarCategoryEntry
        categoryName="melee"
        categoryEntries={categories.melee}
        store={selectedMelees}
        isVisible={$visibleFilterPanel == 'melee'}
      />

      <SidebarCategoryEntry
        categoryName="grenades"
        categoryEntries={categories.grenades}
        store={selectedGrenades}
        isVisible={$visibleFilterPanel == 'grenades'}
      />

      <SidebarCategoryEntry
        categoryName="utils"
        categoryEntries={categories.utils}
        store={selectedUtils}
        isVisible={$visibleFilterPanel == 'utils'}
      />

      <SidebarCategoryEntry
        categoryName="survivors"
        categoryEntries={categories.survivors}
        store={selectedSurvivors}
        isVisible={$visibleFilterPanel == 'survivors'}
      />

      <SidebarCategoryEntry
        categoryName="infected"
        categoryEntries={categories.infected}
        store={selectedInfected}
        isVisible={$visibleFilterPanel == 'infected'}
      />

      <SidebarCategoryEntry
        categoryName="misc"
        categoryEntries={categories.misc}
        store={selectedMisc}
        isVisible={$visibleFilterPanel == 'misc'}
      />
    </div>

    <!-- <div class="clear-selection">
      <button on:click={clearCategorySelection}>Clear Selection</button>
    </div> -->

    <div style="height: 1em" />

    <Collections />
  </div>
</div>

<style lang="postcss">
  .sidebar {
    padding: 1em;
    width: 300px;
    min-width: 300px;
    max-width: 300px;

    display: flex;
    flex-direction: column;
  }

  .sidebar-inner {
    display: flex;
    flex-direction: column;
  }

  .panel-hovers {
    display: flex;
    flex-direction: column;
    gap: 2px;
    /* transform: rotate(-90deg);
    transform-origin: center; */
  }

  .panel-hovers {
    width: 52px;
    margin-right: 1em;
  }

  .filter-panels {
    width: 100%;
    display: flex;
  }
</style>
