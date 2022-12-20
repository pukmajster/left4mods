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
    visibleFilterPanel
  } from '../stores/library'
  import Collections from './Collections.svelte'
  import SidebarCategoryButton from './SidebarCategoryButton.svelte'
  import SidebarCategoryEntry from './SidebarCategoryEntry.svelte'
</script>

<div class="sidebar">
  <div class="sidebar-inner">
    <input type="text" placeholder="Search" bind:value={$searchTerm} class="my-4" />

    <div class="filter-panels">
      <div class="panel-hovers">
        <div class="flex flex-col p-2 gap-3 bg-surface-800/90 rounded-md">
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
          label={'melees'}
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
          label={'utilities'}
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
          label={'misc.'}
        />
      </div>
    </div>

    <!-- <div class="clear-selection">
      <button on:click={clearCategorySelection}>Clear Selection</button>
    </div> -->

    <div style="height: 1em" />
  </div>

  <Collections />
</div>

<style lang="postcss">
  .sidebar {
    padding: 1em;
    padding-top: 0;
    padding-bottom: 0;
    min-width: 320px;
    max-width: 320px;
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
