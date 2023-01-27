import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { release } from 'os'
import * as path from 'path'
import { IUserProfile, ModId, RequestManifestOptions } from 'shared'
import { writeAddonList } from './addoninfo'
import { requestManifest } from './manifest/manifest_v5'
import {
  openDirectory,
  openWorkingDirectory,
  readProfile,
  writeCustomCfg,
  writeProfile
} from './profile'
import { removeVpkFile } from './vpk'
import { exportVpkFiles } from './vpkexport'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

// Darwin case
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

ipcMain.handle('manifest:request', async (_e, options: RequestManifestOptions) => {
  return requestManifest(options)
})

ipcMain.handle('external:openLinkInBrowser', async (__e, url: string) => {
  return shell.openExternal(url)
})

ipcMain.handle('profile:write', async (_e, profileData: IUserProfile) => {
  return writeProfile(profileData)
})

ipcMain.handle('profile:read', async (_e) => {
  return readProfile()
})

ipcMain.handle('addonlist:write', async (_e, gameDir: string, addonInfo: string) => {
  return writeAddonList(gameDir, addonInfo)
})

ipcMain.handle('profile:openWorkingDirectory', async (_e) => {
  return openWorkingDirectory()
})

ipcMain.handle('profile:writeCustomCfg', (_e, gameDir: string, customCfg: string) => {
  return writeCustomCfg(gameDir, customCfg)
})

ipcMain.handle('profile:openDirectory', (_e, directory: string) => {
  return openDirectory(directory)
})

ipcMain.handle('getPath', () => app.getPath('appData'))

ipcMain.handle('getPathJoin', (_e, file: string) => path.join(app.getPath('appData'), file))

ipcMain.handle(
  'exportVpkFiles',
  (_e, gameDir: string, extractDir: string, modId: ModId, filesToExtract: string[]) =>
    exportVpkFiles(gameDir, extractDir, modId, filesToExtract)
)

ipcMain.handle('removeVpkFile', (_e, gameDir: string, modId: ModId) =>
  removeVpkFile(gameDir, modId)
)

let firstPassFinished = false
let mainWindow: BrowserWindow | null = null
function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 840,
    minHeight: 670,
    show: false,
    icon: path.join(__dirname, '../../build/icon.icns'),
    title: 'Left 4 Mods',
    autoHideMenuBar: true,
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../build/icon.icns')
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true, // keep     two    !
      contextIsolation: true, //    these   true
      allowRunningInsecureContent: false,
      webSecurity: app.isPackaged
    }
  })

  mainWindow.on('ready-to-show', () => {
    if (mainWindow) mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (!firstPassFinished) {
    // Handle for directory dialog
    ipcMain.handle('dialog:openDirectory', async () => {
      if (!mainWindow) return

      const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
      })
      if (canceled) {
        return
      } else {
        return filePaths[0]
      }
    })

    firstPassFinished = true
  }

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.left4mods.Pukmajster')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  mainWindow = null
  if (process.platform !== 'darwin') app.quit()
})

// Focus on the main instance if possible
app.on('second-instance', () => {
  if (mainWindow) {
    // Focus on the main window if the user tried to open another
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
