import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import { BridgedAPI } from 'shared'

console.log('preload')

// Custom APIs for renderer
const api: BridgedAPI = {
  requestManifest: (forceNewBuild: boolean = false) =>
    ipcRenderer.invoke('manifest:request', forceNewBuild)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    console.log('exposed! :D')
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  window.api = api
  console.log('exposed! :D')
}
