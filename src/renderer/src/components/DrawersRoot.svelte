<script lang="ts">
  import { Drawer, drawerStore } from '@skeletonlabs/skeleton'
  import { DRAWER_IDS } from '../functions/drawers'
  import ModOverview from './ModOverview.svelte'
  import WelcomeStepper from './WelcomeStepper.svelte'
</script>

<Drawer>
  {#if $drawerStore.id === DRAWER_IDS.MOD_OVERVIEW}
    <ModOverview />
  {/if}

  {#if $drawerStore.id === DRAWER_IDS.WELCOME_STEPPER}
    <WelcomeStepper />
  {/if}
</Drawer>

<style global>
</style>
