export type ModId = string
export type ModFile = string

export interface ModManifest {
  [id: ModId]: Mod
}

export interface Profile {
  collections: ModCollection[]
}

export interface ModCollection {
  name: string
  mods: ModId[]
}

export interface Mod {
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
