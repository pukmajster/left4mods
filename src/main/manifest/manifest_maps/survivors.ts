import { ICategoryMap } from 'shared'
import { CategoryFiles } from '../manifest_v5'

function genericSurvivorFiles(id: string): CategoryFiles {
  return [`models/survivors/survivor_${id}.`]
}

function genericSurvivorVguiFiles(id: string): CategoryFiles {
  return [`materials/vgui/s_panel_lobby_${id}.`, `materials/vgui/s_panel_${id}.`]
}

export type Survivor =
  | 'gambler'
  | 'mechanic'
  | 'coach'
  | 'producer'
  | 'teenangst'
  | 'manager'
  | 'biker'
  | 'namvet'

export const survivors = [
  'gambler',
  'mechanic',
  'coach',
  'producer',
  'teenangst',
  'manager',
  'biker',
  'namvet'
]

export const survivorFiles: ICategoryMap = {
  gambler: genericSurvivorFiles('gambler'),
  mechanic: genericSurvivorFiles('mechanic'),
  coach: genericSurvivorFiles('coach'),
  producer: genericSurvivorFiles('producer'),
  teenangst: genericSurvivorFiles('teenangst'),
  manager: genericSurvivorFiles('manager'),
  biker: genericSurvivorFiles('biker'),
  namvet: genericSurvivorFiles('namvet'),

  survivor_vgui: [
    ...genericSurvivorVguiFiles('gambler'),
    ...genericSurvivorVguiFiles('mechanic'),
    ...genericSurvivorVguiFiles('coach'),
    ...genericSurvivorVguiFiles('producer'),
    ...genericSurvivorVguiFiles('teenangst'),
    ...genericSurvivorVguiFiles('manager'),
    ...genericSurvivorVguiFiles('biker'),
    ...genericSurvivorVguiFiles('namvet')
  ]
}
