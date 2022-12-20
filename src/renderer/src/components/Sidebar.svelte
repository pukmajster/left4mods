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
    visibleFilterPanel
  } from '../stores/library'
  import Collections from './Collections.svelte'
  import SidebarCategoryButton from './SidebarCategoryButton.svelte'
  import SidebarCategoryEntry from './SidebarCategoryEntry.svelte'
  import ToggleViewButton from './ToggleViewButton.svelte'

  function toggleView() {
    $showConflictingView = !$showConflictingView
  }
</script>

<div class="sidebar">
  <div class="sidebar-inner">
    <input type="text" placeholder="Search" bind:value={$searchTerm} class="my-4" />

    <div class="filter-panels">
      <div class="panel-hovers">
        <div class="flex flex-col p-3 gap-4 bg-surface-800/90 rounded-md">
          <SidebarCategoryButton categoryName={'guns'} />
          <SidebarCategoryButton categoryName={'melee'} />
          <SidebarCategoryButton categoryName={'grenades'} />
          <SidebarCategoryButton categoryName={'utils'} />
          <SidebarCategoryButton categoryName={'survivors'} />
          <SidebarCategoryButton categoryName={'infected'} />
          <SidebarCategoryButton categoryName={'misc'} />
        </div>
      </div>

      <div class=" relative grid">
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
    </div>

    <!-- <div class="clear-selection">
      <button on:click={clearCategorySelection}>Clear Selection</button>
    </div> -->

    <div style="height: 1em" />
    <Collections />
  </div>

  <ToggleViewButton />
</div>

<style lang="postcss">
  .sidebar {
    padding: 1em;
    padding-top: 0;
    width: 300px;
    min-width: 300px;
    max-width: 300px;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    width: 64px;
    margin-right: 1em;
  }

  .filter-panels {
    width: 100%;
    display: flex;
  }
</style>
