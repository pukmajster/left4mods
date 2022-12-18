export type ModId = string
export type ModFile = string

declare global {
  interface Window {
    api: BridgedAPI
  }
}

export interface BridgedAPI {
  requestManifest: (forceNewBuild: boolean) => Promise<IModManifest>
  openLinkInBrowser: (url: string) => void
}

export interface IModManifest {
  [id: ModId]: IMod
}

export interface Profile {
  collections?: IModCollection[]
  preferences: {
    gameDir: string
  }
}

export interface IModCollection {
  name: string
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
  categories?: string[]
  timeModified?: string
}
