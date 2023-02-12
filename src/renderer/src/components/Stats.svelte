<script>
  import { enabledMods, uninstalledMods } from '../stores/library'
  import { modManifest } from '../stores/manifest'
</script>

<div class="pb-2">
  <div class="stats card">
    <div class="stat">
      <p>{Object.keys($modManifest.mods).length - $uninstalledMods.length}</p>
      <h5>Total Mods</h5>
    </div>

    <div class="stat">
      <p>{$enabledMods.length}</p>
      <h5>Enabled Mods</h5>
    </div>
  </div>
</div>

<style lang="postcss">
  .stats {
    @apply flex gap-7 my-2 px-4 py-2;
  }

  .stat {
    @apply flex  items-center gap-2;
  }

  .stat h5 {
    font-size: 12px;
    @apply m-0 p-0;
  }

  .stat p {
    font-size: 18px;
    @apply m-0 p-0;
  }
</style>
