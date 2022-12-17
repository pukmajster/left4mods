import { ElectronAPI } from '@electron-toolkit/preload'
import { BridgedAPI } from 'shared'

declare global {
  interface Window {
    electron: ElectronAPI
  }
}
