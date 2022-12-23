export type ModId = string
export type ModFile = string

declare global {
  interface Window {
    api: BridgedAPI
  }
}

export interface RequestManifestOptions {
  forceNewBuild: boolean
  gameDir: string
  disableOnlineFetchingOfModData: boolean
}

export interface BridgedAPI {
  requestManifest: (options: RequestManifestOptions) => Promise<IModManifest>
  openLinkInBrowser: (url: string) => void
  writeProfile: (profileData: IUserProfile) => void
  readProfile: () => Promise<IUserProfile>
  writeAddonInfo: (gameDir: string, addonInfo: string) => Promise<boolean>
  writeCustomCfg: (gameDir: string, customCfg: string) => Promise<boolean>
  selectFolder: () => Promise<string>
}

export interface IModManifest {
  [id: ModId]: IMod
}

export interface IUserProfile {
  collections: IModCollection[]
  presets: IPreset[]
  activePreset: string
  preferences: {
    gameDir: string
    disableOnlineFetchingOfModData: boolean
    darkMode: boolean
    grayscaleDisabledMods: boolean
  }
  customCfg: string
  launchParameters: string
  hasFinishedFirstTimeSetup: boolean
}

export interface IPreset {
  label: string
  id: string
  enabledMods: ModId[]
}

export interface IModCollection {
  label: string
  id: string
  mods: ModId[]
}

export interface IMod {
  id: ModId
  addontitle?: string
  addonversion?: string
  addonauthor?: string
  addontagline?: string
  addonurl?: string
  addonauthorsteamid?: string
  addondescription?: string
  files: ModFile[]
  addoncontent_backgroundmovie?: string
  addoncontent_bossinfected?: string
  addoncontent_campaign?: string
  addoncontent_commoninfected?: string
  addoncontent_map?: string
  addoncontent_music?: string
  addoncontent_prefab?: string
  addoncontent_prop?: string
  addoncontent_script?: string
  addoncontent_skin?: string
  addoncontent_sound?: string
  addoncontent_spray?: string
  addoncontent_survivor?: string
  addoncontent_weapon?: string
  addoncontent_weaponmodel?: string
  error?: string
  categories: string[]
  timemodified: string
  vpksize: number
}

export type CategoryKey = string
export type CategoryFileOccurrence = string
export interface ICategoryMap {
  [key: CategoryKey]: CategoryFileOccurrence[]
}
