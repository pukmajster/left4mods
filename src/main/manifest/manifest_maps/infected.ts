import { ICategoryMap } from 'shared'
import { CategoryFiles } from '../manifest_v4'

function genericSpecialInfectedL4D1Files(id: string): CategoryFiles {
  return [
    `models/v_models/weapons/v_claw_${id}_l4d1.`,
    `models/infected/${id}_l4d1.`,
    `models/infected/${id}_l4d1`
  ]
}

function genericSpecialInfectedFiles(id: string): CategoryFiles {
  return [
    `models/v_models/weapons/v_claw_${id}.`,
    `models/infected/${id}.`,
    `models/infected/${id}`,
    `sound/npc/${id}/voice`
  ]
}

// TODO: add files
function genericSpecialInfectedVguiFiles(id: string): CategoryFiles {
  return []
}

export type Infected =
  | 'smoker_l4d1'
  | 'hunter_l4d1'
  | 'boomer_l4d1'
  | 'boomette_l4d1'
  | 'witch_l4d1'
  | 'tank_l4d1'
  | 'jockey_l4d1'
  | 'spitter_l4d1'
  | 'boomette_l4d1'
  | 'smoker'
  | 'hunter'
  | 'boomer'
  | 'boomette'
  | 'witch'
  | 'tank'
  | 'jockey'
  | 'spitter'
  | 'boomette'

export const survivors = [
  'smoker_l4d1',
  'hunter_l4d1',
  'boomer_l4d1',
  'boomette_l4d1',
  'witch_l4d1',
  'tank_l4d1',
  'jockey_l4d1',
  'spitter_l4d1',
  'boomette_l4d1',
  'smoker',
  'hunter',
  'boomer',
  'boomette',
  'witch',
  'tank',
  'jockey',
  'spitter',
  'boomette'
]

export const infectedFiles: ICategoryMap = {
  common_infected: ['infected/common/'],

  smoker_l4d1: genericSpecialInfectedL4D1Files('smoker'),
  hunter_l4d1: genericSpecialInfectedL4D1Files('hunter'),
  boomer_l4d1: genericSpecialInfectedL4D1Files('boomer'),
  witch_l4d1: genericSpecialInfectedL4D1Files('witch'),
  tank_l4d1: [
    ...genericSpecialInfectedL4D1Files('tank'),
    ...genericSpecialInfectedL4D1Files('hulk')
  ],

  // Apparently these exist?
  jockey_l4d1: genericSpecialInfectedL4D1Files('jockey'),
  charger_l4d1: genericSpecialInfectedL4D1Files('charger'),
  spitter_l4d1: genericSpecialInfectedL4D1Files('spitter'),
  boomette_l4d1: genericSpecialInfectedL4D1Files('boomette'),

  smoker: genericSpecialInfectedFiles('smoker'),
  hunter: genericSpecialInfectedFiles('hunter'),
  boomer: genericSpecialInfectedFiles('boomer'),
  witch: genericSpecialInfectedFiles('witch'),
  tank: [...genericSpecialInfectedFiles('tank'), ...genericSpecialInfectedFiles('hulk')],

  jockey: genericSpecialInfectedFiles('jockey'),
  charger: genericSpecialInfectedFiles('charger'),
  spitter: genericSpecialInfectedFiles('spitter'),
  boomette: genericSpecialInfectedFiles('boomette'),

  specialinfected_vgui: [
    ...genericSpecialInfectedVguiFiles('smoker'),
    ...genericSpecialInfectedVguiFiles('hunter'),
    ...genericSpecialInfectedVguiFiles('boomer'),
    ...genericSpecialInfectedVguiFiles('witch'),
    ...[...genericSpecialInfectedVguiFiles('tank'), ...genericSpecialInfectedVguiFiles('hulk')],
    ...genericSpecialInfectedVguiFiles('jockey'),
    ...genericSpecialInfectedVguiFiles('charger'),
    ...genericSpecialInfectedVguiFiles('spitter'),
    ...genericSpecialInfectedVguiFiles('boomette')
  ]
}
