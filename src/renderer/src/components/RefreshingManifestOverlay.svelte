<script lang="ts">
  import { isBuildingModManifest } from '../stores/manifest'
</script>

{#if $isBuildingModManifest}
  <div class="absolute inset-0 w-full h-full bg-surface-500/50 flex justify-center items-center">
    <div class="card p-5">Rrefreshing mods...</div>
  </div>
{/if}
