<script lang="ts">
  import { AppRail } from '@skeletonlabs/skeleton'
  import categories from '../constants/categories'
  import {
    searchTerm,
    selectedGuns,
    selectedInfected,
    selectedMelees,
    selectedMisc,
    selectedMods,
    selectedSurvivors,
    selectedUtils,
    visibleFilterPanel
  } from '../stores/library'
  import Collections from './Collections.svelte'
  import SidebarCategoryButton from './SidebarCategoryButton.svelte'
  import SidebarCategoryEntry from './SidebarCategoryEntry.svelte'

  $: searchTerm && selectedMods.set([])
</script>

<div class="sidebar">
  <div class="sidebar-inner">
    <input type="text" placeholder="Search" bind:value={$searchTerm} class="my-4" />

    <div class="filter-panels">
      <div class="panel-hovers">
        <AppRail width="sm:w-18" selected={visibleFilterPanel}>
          <svelte:fragment slot="lead">
            <SidebarCategoryButton categoryName={'-'} label="All" />
            <SidebarCategoryButton categoryName={'guns'} label="Guns" />
            <SidebarCategoryButton categoryName={'melee'} label="Melees" />
            <SidebarCategoryButton categoryName={'utils'} label="Utils" />
            <SidebarCategoryButton categoryName={'survivors'} label="Survivors" />
            <SidebarCategoryButton categoryName={'infected'} label="Infected" />
            <SidebarCategoryButton categoryName={'misc'} label="Misc." />
            <SidebarCategoryButton categoryName={'campaign'} label="Maps" />
          </svelte:fragment>
        </AppRail>
        <!-- <div class="flex flex-col p-2 gap-3 bg-surface-800/90 rounded-md">
          <SidebarCategoryButton categoryName={'guns'} />
          <SidebarCategoryButton categoryName={'melee'} />
          <SidebarCategoryButton categoryName={'grenades'} />
          <SidebarCategoryButton categoryName={'utils'} />
          <SidebarCategoryButton categoryName={'survivors'} />
          <SidebarCategoryButton categoryName={'infected'} />
          <SidebarCategoryButton categoryName={'misc'} />
        </div> -->
      </div>

      <div class="relative m-auto flex-1 ml-1 grid">
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

        <SidebarCategoryEntry
          categoryName=""
          categoryEntries={categories.guns}
          store={selectedGuns}
          isVisible={$visibleFilterPanel == 'campaign'}
          label={'Maps'}
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

    overflow: hidden;
    border-radius: 4px;

    /* transform: rotate(-90deg);
    transform-origin: center; */
  }

  .panel-hovers {
    width: 64px;
    margin-right: 0.5em;
  }

  .filter-panels {
    width: 100%;
    display: flex;
    align-items: flex-start;
  }
</style>
