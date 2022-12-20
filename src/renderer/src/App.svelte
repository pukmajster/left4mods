<script lang="ts">
  import { AppShell, Modal } from '@skeletonlabs/skeleton'
  import DrawersRoot from './components/DrawersRoot.svelte'
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
<DrawersRoot />

<style global>
</style>
