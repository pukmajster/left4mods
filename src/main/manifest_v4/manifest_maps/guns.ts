import { ICategoryMap } from 'shared'
import { CategoryFiles } from '../manifest_v4'

function genericGunFiles(soundId: string, worldId: string, viewmodelId: string): CategoryFiles {
  return [
    `sound/weapons/${soundId}/`,
    `models/w_models/weapons/w_${worldId}.`,
    `models/v_models/v_${viewmodelId}.`
  ]
}

function genericGunVguiFiles(id: string): CategoryFiles {
  return []
}

export type Gun =
  | 'rifle_ak47'
  | 'rifle_m16a2'
  | 'rifle_desert'
  | 'pistol'
  | 'magnum'
  | 'sniper_military'
  | 'hutning_rifle'
  | 'awp'
  | 'shotgun_chrome'
  | 'shotgun_pump'
  | 'sg552'
  | 'auto_shotgun_spas'
  | 'smg_silenced'
  | 'smg'
  | 'mp5navy'
  | 'scout'
  | 'grenade_launcher'
  | 'auto_shotgun'
  | 'machinegun_m60'

export const survivors: Gun[] = [
  'rifle_ak47',
  'rifle_m16a2',
  'rifle_desert',
  'pistol',
  'magnum',
  'sniper_military',
  'hutning_rifle',
  'awp',
  'shotgun_chrome',
  'shotgun_pump',
  'sg552',
  'auto_shotgun_spas',
  'smg_silenced',
  'smg',
  'mp5navy',
  'scout',
  'grenade_launcher',
  'auto_shotgun',
  'machinegun_m60'
]

export const gunFiles: ICategoryMap = {
  rifle_ak47: genericGunFiles('rifle_ak47', 'rifle_ak47', 'rifle_ak47'),
  rifle_m16a2: genericGunFiles('rifle', 'rifle_m16a2', 'rifle'),
  rifle_desert: genericGunFiles('rifle_desert', 'desert_rifle', 'desert_rifle'),
  pistol: [
    ...genericGunFiles('pistol', 'pistol_b', 'pistola'), // Single pistol
    ...genericGunFiles('dual_pistol', 'pistol_a', 'dual_pistola'), // Dual pistols
    ...genericGunFiles('dual_pistol', 'pistol_a_dual', 'pistol_a_dual') // Dual p
  ],
  magnum: genericGunFiles('magnum', 'desert_eagle', 'desert_eagle'),
  sniper_military: genericGunFiles('sniper_military', 'sniper_military', 'sniper_military'),
  hutning_rifle: genericGunFiles('hunting_rifle', 'sniper_mini14', 'huntingrifle'),
  awp: genericGunFiles('awp', 'sniper_awp', 'snip_awp'),
  shotgun_chrome: genericGunFiles('shotgun_chrome', 'pumpshotgun_a', 'shotgun_chrome'),
  shotgun_pump: genericGunFiles('shotgun', 'shotgun', 'pumpshotgun'),
  sg552: genericGunFiles('sg552', 'rifle_sg552', 'rif_sg552'),
  auto_shotgun_spas: genericGunFiles('auto_shotgun_spas', 'shotgun_spas', 'shotgun_spas'),
  smg_silenced: genericGunFiles('smg_silenced', 'smg_a', 'silenced_smg'),
  smg: genericGunFiles('smg', 'smg_uzi', 'smg'),
  mp5navy: genericGunFiles('mp5navy', 'smg_mp5', 'smg_mp5'),
  scout: genericGunFiles('scout', 'sniper_scout', 'snip_scout'),
  grenade_launcher: [
    ...genericGunFiles('grenade_launcher', 'grenade_launcher', 'grenade_launcher'), // Grenade launcher
    ...genericGunFiles('grenade_launcher', 'he_grenade', 'grenade_launcher') // Grenade
  ],
  auto_shotgun: genericGunFiles('auto_shotgun', 'autoshot_m4super', 'autoshotgun'),
  machinegun_m60: genericGunFiles('machinegun_m60', 'm60', 'm60'),

  guns_vgui: []
}
