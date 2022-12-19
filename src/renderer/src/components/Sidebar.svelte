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
  import ActionButtons from './ActionButtons.svelte'
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

        <!-- <button
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
        > -->
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

    <div style="height: 1px; background-color: gray" />
    <div style="height: 1em" />

    <ActionButtons />
  </div>
</div>

<style lang="postcss">
  .sidebar {
    padding: 1em;

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

  .panel-hovers button span {
    font-weight: 600;
    text-transform: uppercase;

    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-orientation: inherit;
  }

  .panel-hovers button.active {
    color: rgb(0, 42, 255);
  }

  .panel-hovers button.selected {
    @apply text-black bg-accent-400/100;
  }

  .panel-hovers button {
    padding: 2px 1px;
    padding-top: 6px;
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
