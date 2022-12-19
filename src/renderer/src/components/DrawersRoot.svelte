<script lang="ts">
  import { Drawer, drawerStore } from '@skeletonlabs/skeleton'
  import ModOverview from './ModOverview.svelte'
</script>

<Drawer>
  {#if $drawerStore.id === 'mod-overview'}
    <!-- Doc Sidebar -->
    <ModOverview />
  {/if}
</Drawer>

<style global>
</style>
