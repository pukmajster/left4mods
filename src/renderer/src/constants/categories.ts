const misc: ICategoryToLabelMap = {
  vgui: 'VGUI Icons',
  ui: 'UI',
  vscript: 'VScript',
  color_correction: 'Colour Correction',
  //loading_screen: 'Loading Screen', // TODO only for official maps?
  loading_screen_official: 'Loading Screen', // TODO only for official maps?
  flashlight: 'Flashlight',
  spray: 'Spray',
  ammo_stack: 'Ammo Stack',
  gnome: 'Gnome',
  jukebox: 'Jukebox',
  vehicles: 'Ve: hicles',
  water: 'Water',
  medical_cabinet: 'Medical Cabinet',
  lil_peanut: "Lil' Peanut"
}

const guns: ICategoryToLabelMap = {
  pistol: 'Pistol',
  magnum: 'Deagle',
  sniper_military: 'Military Sniper',
  hutning_rifle: 'Hunting Sniper',
  awp: 'CSS AWP',
  scar: 'SCAR',
  ak47: 'AK-47',
  shotgun_chrome: 'Shotgun Chrome',
  shotgun_pump: 'Shotgun Pump',
  sg552: 'SG552',
  auto_shotgun_spas: 'SPAS',
  rifle_m16a2: 'M16',
  smg_silenced: 'UZI Silenced',
  smg: 'UZI',
  mp5navy: 'CSS MP5',
  scout: 'CSS Scout',
  grenade_launcher: 'Grenade Launcher',
  auto_shotgun: 'Auto Shotgun',
  machinegun_m60: 'M60'
}

const infected: ICategoryToLabelMap = {
  common_infected: 'Common Infected',
  boomer: 'Boomer',
  boomette: 'Boomette',
  charger: 'Charger',
  tank: 'Tank',
  jockey: 'Jockey',
  witch: 'Witch',
  //tank_hulk: 'Tank (Hulk)',
  spitter: 'Spitter',
  hunter: 'Hunter',
  smoker: 'Smoker'
}

const survivors: ICategoryToLabelMap = {
  nick: 'Nick',
  zoey: 'Zoey',
  louis: 'Louis',
  bill: 'Bill',
  ellis: 'Ellis',
  francis: 'Francis',
  coach: 'Coach',
  rochelle: 'Rochelle'
}

const utils: ICategoryToLabelMap = {
  defibrillator: 'Defibrillator',
  adrenaline: 'Adrenaline',
  painpills: 'Pills',
  medkit: 'Medkit',
  incendiary_ammopack: 'Incendiary Ammo Pack',
  explosive_ammopack: 'Explosive Ammo Pack',
  laser_pack: 'Laser Pack'
}

const grenades: ICategoryToLabelMap = {
  pipebomb: 'Pipebomb',
  molotov: 'Molotov',
  bile: 'Bile'
}

const melee: ICategoryToLabelMap = {
  machete: 'Machete',
  cricketbat: 'Cricket Bat',
  bat: 'Bat',
  css_knife: 'CSS Knife',
  chainsaw: 'Chainsaw',
  axe: 'Axe',
  crowbar: 'Crowbar',
  guitar: 'Guitar',
  shovel: 'Shovel',
  katana: 'Katana',
  frying_pan: 'Pan',
  golf_club: 'Golf Club',
  tonfa: 'Tonfa',
  pitchfork: 'Pitchfork'
}

const audio: ICategoryToLabelMap = {
  voice: 'Voice',
  music: 'Music'
}

const filetypes: ICategoryToLabelMap = {
  model: 'Model',
  sound: 'Sound',
  material: 'Material'
}

export interface ICategoryToLabelMap {
  [key: string]: string
}

export const combinedCategoryToLabelMap = {
  ...misc,
  ...guns,
  ...filetypes,
  ...audio,
  ...melee,
  ...grenades,
  ...utils,
  ...survivors,
  ...infected
}

export const categoriesToIgnore = ['skin', 'weapon', 'phy']

export default {
  misc,
  guns,
  filetypes,
  audio,
  melee,
  grenades,
  utils,
  survivors,
  infected
}
