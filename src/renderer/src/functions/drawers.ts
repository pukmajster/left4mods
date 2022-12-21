import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'

export const DRAWER_IDS = {
  MOD_OVERVIEW: 'mod-overview',
  WELCOME_STEPPER: 'welcome-stepper'
}

export function openInitialSetupDrawer() {
  const settings: DrawerSettings = {
    id: DRAWER_IDS.WELCOME_STEPPER,
    position: 'left',
    width: '400px'
  }
  drawerStore.open(settings)
}
