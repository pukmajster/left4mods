<script lang="ts">
  import { AppRail } from '@skeletonlabs/skeleton'
  import categories from '../constants/categories'
  import {
    searchTerm,
    selectedGuns,
    selectedInfected,
    selectedMelees,
    selectedMisc,
    selectedSurvivors,
    selectedUtils,
    showConflictingView,
    visibleFilterPanel
  } from '../stores/library'
  import Collections2 from './Collections2.svelte'
  import SidebarCategoryButton from './SidebarCategoryButton.svelte'
  import SidebarCategoryEntry from './SidebarCategoryEntry.svelte'

  import campaign from '../assets/media/icons/campaign.png'
  import guns from '../assets/media/icons/guns.png'
  import infected from '../assets/media/icons/infected.png'
  import melee from '../assets/media/icons/melee.png'
  import misc from '../assets/media/icons/misc.png'
  import survivors from '../assets/media/icons/survivors.png'
  import utils from '../assets/media/icons/utils.png'
  import Stats from './Stats.svelte'
</script>

<div class="sidebar" class:disabled={$showConflictingView}>
  <div class="sidebar-inner">
    <Collections2 />
    <input type="text" placeholder="Search" bind:value={$searchTerm} class="my-4" />

    <div class="filter-panels">
      <div class="panel-hovers">
        <AppRail width="sm:w-18" selected={visibleFilterPanel}>
          <svelte:fragment slot="lead">
            <SidebarCategoryButton categoryName={'all'} label="All" image={''} />
            <SidebarCategoryButton categoryName={'guns'} label="Guns" image={guns} />
            <SidebarCategoryButton categoryName={'melee'} label="Melees" image={melee} />
            <SidebarCategoryButton categoryName={'utils'} label="Utils" image={utils} />
            <SidebarCategoryButton categoryName={'survivors'} label="Survivors" image={survivors} />
            <SidebarCategoryButton categoryName={'infected'} label="Infected" image={infected} />
            <SidebarCategoryButton categoryName={'misc'} label="Misc." image={misc} />
            <SidebarCategoryButton categoryName={'campaign'} label="Maps" image={campaign} />
            <SidebarCategoryButton categoryName={'?'} label="Unknown" image={''} />
          </svelte:fragment>
        </AppRail>
      </div>

      <div class="relative m-auto flex-1 ml-1 grid">
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

    <div style="height: 0.5rem" />
  </div>
  <Stats />
</div>

<style lang="postcss">
  .sidebar {
    padding: 1em;
    padding-top: 0;
    padding-bottom: 0;
    min-width: 360px;
    max-width: 360px;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .sidebar.disabled {
    pointer-events: none;
    opacity: 0.3;
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
