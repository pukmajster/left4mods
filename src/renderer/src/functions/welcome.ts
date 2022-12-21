import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'

export function triggerWelcomeStepper() {
  const settings: DrawerSettings = { id: 'welcome-stepper', position: 'left', width: '700px' }
  drawerStore.open(settings)
}
