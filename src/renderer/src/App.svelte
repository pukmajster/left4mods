<script lang="ts">
  import { AppShell, Drawer, Modal } from '@skeletonlabs/skeleton'
  import Header from './components/Header.svelte'
  import ModLibrary from './components/ModLibrary.svelte'
  import Sidebar from './components/Sidebar.svelte'
  import Config from './Config.svelte'
</script>

<Config />
<AppShell>
  <svelte:fragment slot="header"><Header /></svelte:fragment>
  <!-- Sidebar -->
  <svelte:fragment slot="sidebarLeft">
    <Sidebar />
  </svelte:fragment>
  <!-- Page Content -->
  <ModLibrary />
</AppShell>

<Modal />
<Drawer />

<style global>
</style>
