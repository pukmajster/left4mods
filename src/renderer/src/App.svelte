<script lang="ts">
  import { AppShell, Modal, Toast } from '@skeletonlabs/skeleton'
  import DrawersRoot from './components/DrawersRoot.svelte'
  import Header from './components/Header.svelte'
  import ModLibrary from './components/ModLibrary.svelte'
  import RefreshingManifestOverlay from './components/RefreshingManifestOverlay.svelte'
  import Sidebar from './components/Sidebar.svelte'
  import WelcomeStepper from './components/WelcomeStepper.svelte'
  import Config from './Config.svelte'
  import { hasFinishedFirstTimeSetup } from './stores/profile'
</script>

<Config />

{#if !$hasFinishedFirstTimeSetup}
  <WelcomeStepper />
{:else}
  <AppShell>
    <svelte:fragment slot="header"><Header /></svelte:fragment>

    <svelte:fragment slot="sidebarLeft">
      <Sidebar />
    </svelte:fragment>

    <ModLibrary />
  </AppShell>
  <RefreshingManifestOverlay />
{/if}

<Modal />
<DrawersRoot />
<Toast position="br" padding="!px-3 !py-2" />

<style global lang="postcss">
  select,
  input[type='text'],
  textarea {
    @apply !p-1 !px-2;
  }
</style>
