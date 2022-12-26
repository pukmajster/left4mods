import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer, shell } from 'electron'
import { BridgedAPI, IUserProfile, RequestManifestOptions } from 'shared'

console.log('preload')

// Custom APIs for renderer
const api: BridgedAPI = {
  requestManifest: (options: RequestManifestOptions) =>
    ipcRenderer.invoke('manifest:request', options),
  openLinkInBrowser: (url: string) => openLinkInBrowser(url),
  writeProfile: (profileData: IUserProfile) => ipcRenderer.invoke('profile:write', profileData),
  readProfile: () => ipcRenderer.invoke('profile:read'),
  writeAddonList: (gameDir: string, addonInfo: string) =>
    ipcRenderer.invoke('addonlist:write', gameDir, addonInfo),
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
  openWorkingDirectory: () => ipcRenderer.invoke('profile:openWorkingDirectory'),
  writeCustomCfg: (gameDir, customCfg) => ipcRenderer.invoke('customcfg:write', gameDir, customCfg)
}

function openLinkInBrowser(url: string) {
  console.log(' ------------ ' + url + ' ------------------')
  shell.openExternal(url)
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
}
