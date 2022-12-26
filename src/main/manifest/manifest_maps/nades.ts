import { ICategoryMap } from 'shared'
import { CategoryFiles } from '../manifest_v4'

function genericNadeFiles(id: Nade): CategoryFiles {
  return [`models/w_models/weapons/w_eq_${id}.`, `models/v_models/v_${id}.`]
}

export type Nade = 'pipebomb' | 'molotov' | 'bile_flask'
export const nades: Nade[] = ['pipebomb', 'molotov', 'bile_flask']

export const nadeFiles: ICategoryMap = {
  pipebomb: genericNadeFiles('pipebomb'),
  molotov: genericNadeFiles('molotov'),
  bile_flask: genericNadeFiles('bile_flask'),
  nades_vgui: []
}
