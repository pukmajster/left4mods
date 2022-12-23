import { ICategoryMap } from 'shared'
import { gunFiles } from './guns'
import { meleeFiles } from './melee'
import { miscFiles } from './misc'
import { nadeFiles } from './nades'
import { infectedFiles } from './specialinfected'
import { survivorFiles } from './survivors'
import { utilFiles } from './utils'

export const fileOccurrencesToCategoryMap: ICategoryMap = {
  common_infected: ['infected/common/'],

  ...infectedFiles,
  ...gunFiles,
  ...nadeFiles,
  ...meleeFiles,
  ...miscFiles,
  ...survivorFiles,
  ...utilFiles

  // file types
  // model: ['models/'],
  // sound: ['sound/'],
  // material: ['materials/'],
  // phy: ['.phy']
}
