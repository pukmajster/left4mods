import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton'
import { commonToastOptions } from '../constants/skeleton'

export function triggerAlertToast(message: string): void {
  const t: ToastSettings = {
    message: message,
    ...commonToastOptions
  }
  toastStore.trigger(t)
}
