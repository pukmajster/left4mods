import type { ToastSettings } from '@skeletonlabs/skeleton'

export const TOAST_TIMEOUT = 4000 // in ms
export const TOAST_AUTOHIDE = true

export const commonToastOptions: Partial<ToastSettings> = {
  timeout: TOAST_TIMEOUT,
  autohide: TOAST_AUTOHIDE
}
