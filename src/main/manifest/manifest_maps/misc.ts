import { ICategoryMap } from 'shared'
import { CategoryFiles } from '../manifest_v5'

function genericLoadingScreenFiles(id: string): CategoryFiles {
  return [`materials/vgui/loadingscreen_${id}`]
}

export const loading_screens_official: CategoryFiles = [
  // L4D1
  ...genericLoadingScreenFiles('the_sacrifice'),
  ...genericLoadingScreenFiles('nomercy'),
  ...genericLoadingScreenFiles('laststand'),
  ...genericLoadingScreenFiles('deathtoll'),
  ...genericLoadingScreenFiles('deadair'),
  ...genericLoadingScreenFiles('crashcourse'),
  ...genericLoadingScreenFiles('bloodharvest'),

  // L4D2
  ...genericLoadingScreenFiles('thepassing'),
  ...genericLoadingScreenFiles('theparish'),
  ...genericLoadingScreenFiles('swampfever'),
  ...genericLoadingScreenFiles('darkcarnival.vtf'),
  ...genericLoadingScreenFiles('coldstream.vtf'),
  ...genericLoadingScreenFiles('campaign4.vtf'),
  ...genericLoadingScreenFiles('campaign1.vtf')
]

export const miscFiles: ICategoryMap = {
  ui: ['resource/ui/hud/'],
  vgui: ['vgui/hud/'],
  vscript: ['vscripts'],
  color_correction: ['/correction/'],
  gnome: ['gnome'],
  vehicles: ['/props_vehicles/'],
  jukebox: ['flu/jukebox/'],
  voice: ['voice'],
  music: ['music'],
  water: ['/liquids/water'],
  flashlight: ['materials/effects/flashlight'],
  spray: ['scripts/sprays_manifest.txt', 'materials/vgui/logos'],
  ammo_stack: ['ammo_stack', 'coffeeammo'],
  medical_cabinet: ['/props_interiors/medicalcabinet'],
  lil_peanut: ["lil'peanut_cutout001"],

  loading_screen_official: loading_screens_official
}
