import { ICategoryMap } from 'shared'
import { CategoryFiles, GenericFilesBuilderReturn } from '../manifest_v5'

function genericMeleeFiles(
  soundId: string,
  worldId: string,
  viewmodelId: string
): GenericFilesBuilderReturn {
  return {
    [soundId]: [
      `sound/weapons/${soundId}/`,
      `models/weapons/melee/w_${worldId}.`,
      `models/weapons/melee/v_${viewmodelId}.`
    ],
    [`${soundId}_vgui`]: [`materials/vgui/hud/icon_${soundId}.vtf`]
  }
}

function knifeMeleeFiles() {
  return [
    'sound/weapons/knife/melee',
    'models/w_models/weapons/w_knife_t.',
    'models/v_models/v_knife_t.'
  ]
}

function genericMeleeVguiFiles(id: string): CategoryFiles {
  return [`materials/vgui/hud/icon_${id}.vtf`]
}

export type Melee =
  | 'cricketbat'
  | 'crowbar'
  | 'machete'
  | 'bat'
  | 'knife'
  | 'chainsaw'
  | 'axe'
  | 'guitar'
  | 'shovel'
  | 'katana'
  | 'pan'
  | 'golf_club'
  | 'tonfa'
  | 'pitchfork'

export const survivors: Melee[] = [
  'cricketbat',
  'crowbar',
  'machete',
  'bat',
  'knife',
  'chainsaw',
  'axe',
  'guitar',
  'shovel',
  'katana',
  'pan',
  'golf_club',
  'tonfa',
  'pitchfork'
]

export const meleeFiles: ICategoryMap = {
  ...genericMeleeFiles('cricketbat', 'cricket_bat', 'cricket_bat'),
  ...genericMeleeFiles('bat', 'bat', 'bat'),
  ...genericMeleeFiles('machete', 'machete', 'machete'),
  ...genericMeleeFiles('axe', 'fireaxe', 'fireaxe'),
  ...genericMeleeFiles('crowbar', 'crowbar', 'crowbar'),
  ...genericMeleeFiles('guitar', 'electric_guitar', 'electric_guitar'),
  ...genericMeleeFiles('shovel', 'shovel', 'shovel'),
  ...genericMeleeFiles('katana', 'katana', 'katana'),
  ...genericMeleeFiles('pan', 'frying_pan', 'frying_pan'),
  ...genericMeleeFiles('golf_club', 'golfclub', 'golfclub'),
  ...genericMeleeFiles('tonfa', 'tonfa', 'tonfa'),
  ...genericMeleeFiles('pitchfork', 'pitchfork', 'pitchfork'),

  // The knife is SPECIAL
  knife: knifeMeleeFiles(),

  melee_vgui: genericMeleeVguiFiles('cricketbat')
}
