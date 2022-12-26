import { ICategoryMap } from 'shared'

export type Util =
  | 'medkit'
  | 'painpills'
  | 'defibrillator'
  | 'adrenaline'
  | 'incendiary_ammopack'
  | 'explosive_ammopack'
  | 'laser_pack'

export const utils: Util[] = [
  'medkit',
  'painpills',
  'defibrillator',
  'adrenaline',
  'incendiary_ammopack',
  'explosive_ammopack',
  'laser_pack'
]

export const utilFiles: ICategoryMap = {
  medkit: [
    'sound/player/survivor/heal/bandaging_1',
    'sound/player/survivor/bandaging_1',
    'w_eq_medkit',
    'v_medkit'
  ],
  painpills: ['pain_pills/pills_deploy_', 'w_eq_painpills', 'v_painpills'],
  defibrillator: ['defibrillator'],
  adrenaline: ['sound/weapons/adrenaline/', 'models/v_models/v_adrenaline', 'w_eq_adrenaline'],
  incendiary_ammopack: ['incendiary_ammo'],
  explosive_ammopack: ['explosive_ammo'],
  laser_pack: ['laser_pack']
}
