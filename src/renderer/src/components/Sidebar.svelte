<script lang="ts">
  import { AppRail } from '@skeletonlabs/skeleton'
  import categories from '../constants/categories'
  import { searchTerm, showConflictingView, visibleFilterPanel } from '../stores/library'
  import Collections2 from './Collections2.svelte'
  import SidebarCategoryButton from './SidebarCategoryButton.svelte'
  import SidebarCategoryEntry from './SidebarCategoryEntry.svelte'

  import { Search, Slash } from 'lucide-svelte'
  import campaign from '../assets/media/icons/campaign.png'
  import guns from '../assets/media/icons/guns.png'
  import infected from '../assets/media/icons/infected.png'
  import melee from '../assets/media/icons/melee.png'
  import misc from '../assets/media/icons/misc.png'
  import survivors from '../assets/media/icons/survivors.png'
  import utils from '../assets/media/icons/utils.png'
  import Stats from './Stats.svelte'

  function clearSearchTerm() {
    searchTerm.set('')
  }
</script>

<div class="sidebar" class:disabled={$showConflictingView}>
  <div class="sidebar-inner">
    <Collections2 />

    <label class="relative block my-4">
      <input
        type="text"
        placeholder="Search"
        bind:value={$searchTerm}
        class="placeholder:font-italitc border indent-7 border-slate-300 py-2 pl-10 pr-4 focus:outline-none"
      />

      <span class="absolute p-2 pl-3 inset-y-0 left-0">
        <Search size={16} />
      </span>

      <button on:click={clearSearchTerm} class="btn absolute p-2 top-0 bottom-0 right-1">
        <Slash size={16} /></button
      >
    </label>

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
          isVisible={$visibleFilterPanel == 'guns'}
        />

        <SidebarCategoryEntry
          categoryName="melee"
          categoryEntries={categories.melee}
          isVisible={$visibleFilterPanel == 'melee'}
          label={'melees'}
        />

        <SidebarCategoryEntry
          categoryName="utils"
          categoryEntries={categories.utils}
          isVisible={$visibleFilterPanel == 'utils'}
          label={'utilities'}
        />

        <SidebarCategoryEntry
          categoryName="survivors"
          categoryEntries={categories.survivors}
          isVisible={$visibleFilterPanel == 'survivors'}
        />

        <SidebarCategoryEntry
          categoryName="infected"
          categoryEntries={categories.infected}
          isVisible={$visibleFilterPanel == 'infected'}
        />

        <SidebarCategoryEntry
          categoryName="misc"
          categoryEntries={categories.misc}
          isVisible={$visibleFilterPanel == 'misc'}
          label={'misc.'}
        />

        <SidebarCategoryEntry
          categoryName=""
          categoryEntries={categories.guns}
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
    z-index: 2;
  }

  .filter-panels {
    width: 100%;
    display: flex;
    align-items: flex-start;
  }
</style>
