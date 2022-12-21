<script lang="ts">
  import { Drawer, drawerStore } from '@skeletonlabs/skeleton'
  import ModOverview from './ModOverview.svelte'
  import WelcomeStepper from './WelcomeStepper.svelte'
</script>

<Drawer>
  {#if $drawerStore.id === 'mod-overview'}
    <ModOverview />
  {/if}

  {#if $drawerStore.id === 'welcome-stepper'}
    <WelcomeStepper />
  {/if}
</Drawer>

<style global>
</style>
