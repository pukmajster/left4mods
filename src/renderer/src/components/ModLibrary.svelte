<script lang="ts">
  import { paginatedSortedFilteredMods } from '../stores/library'
  import ModCard from './ModCard.svelte'
  import Sidebar from './Sidebar.svelte'
  import TopRow from './TopRow.svelte'
</script>

<ul class="library">
  <Sidebar />
  <div class="mods-wrapper">
    <TopRow />
    <div class="mods-inner">
      <div class="mods-list">
        {#each $paginatedSortedFilteredMods as mod}
          <ModCard {mod} />
        {/each}
      </div>
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
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    grid-auto-rows: minmax(min-content, max-content);
    align-items: stretch;

    gap: 12px;
    padding: 1em;
    padding-left: 0.5em;

    height: 600px;
  }
</style>
