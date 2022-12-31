const misc: ICategoryToLabelMap = {
  vgui: 'VGUI Icons',
  ui: 'UI',
  vscript: 'VScript',
  color_correction: 'Colour Correction',
  //loading_screen: 'Loading Screen', // TODO only for official maps?
  loading_screen_official: 'Loading Screen',
  flashlight: 'Flashlight',
  spray: 'Spray',
  ammo_stack: 'Ammo Stack',
  gnome: 'Gnome',
  jukebox: 'Jukebox',
  vehicles: 'Vehicles',
  water: 'Water',
  medical_cabinet: 'Medical Cabinet',
  lil_peanut: "Lil' Peanut"
}

const guns: ICategoryToLabelMap = {
  pistol: 'Pistol',
  magnum: 'Deagle',
  smg: 'UZI',
  smg_silenced: 'UZI Silenced',
  shotgun_chrome: 'Shotgun Chrome',
  shotgun_pump: 'Shotgun Pump',
  auto_shotgun_spas: 'SPAS',
  auto_shotgun: 'Auto Shotgun',
  rifle_m16a2: 'M16',
  rifle_ak47: 'AK-47',
  rifle_desert: 'SCAR',
  hutning_rifle: 'Hunting Sniper',
  sniper_military: 'Military Sniper',
  grenade_launcher: 'Grenade Launcher',
  machinegun_m60: 'M60',
  mp5navy: 'CSS MP5',
  sg552: 'CSS SG552',
  scout: 'CSS Scout',
  awp: 'CSS AWP'
}

const infected: ICategoryToLabelMap = {
  common_infected: 'Common Infected',
  hunter: 'Hunter',
  smoker: 'Smoker',
  boomer: 'Boomer',
  boomette: 'Boomette',
  charger: 'Charger',
  jockey: 'Jockey',
  //tank_hulk: 'Tank (Hulk)',
  spitter: 'Spitter',
  witch: 'Witch',
  tank: 'Tank'
}

const survivors: ICategoryToLabelMap = {
  teenangst: 'Zoey',
  namvet: 'Bill',
  biker: 'Francis',
  manager: 'Louis',

  producer: 'Rochelle',
  mechanic: 'Ellis',
  coach: 'Coach',
  gambler: 'Nick'
}

const utils: ICategoryToLabelMap = {
  pipebomb: 'Pipebomb',
  molotov: 'Molotov',
  bile_flask: 'Bile',
  medkit: 'Medkit',
  defibrillator: 'Defibrillator',
  adrenaline: 'Adrenaline',
  painpills: 'Pills',
  incendiary_ammopack: 'Incendiary Ammo Pack',
  explosive_ammopack: 'Explosive Ammo Pack',
  laser_pack: 'Laser Pack'
}

const melee: ICategoryToLabelMap = {
  machete: 'Machete',
  cricketbat: 'Cricket Bat',
  bat: 'Bat',
  chainsaw: 'Chainsaw',
  axe: 'Axe',
  crowbar: 'Crowbar',
  guitar: 'Guitar',
  katana: 'Katana',
  pan: 'Pan',
  golf_club: 'Golf Club',
  tonfa: 'Tonfa',
  pitchfork: 'Pitchfork',
  shovel: 'Shovel',
  css_knife: 'CSS Knife'
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
  utils,
  survivors,
  infected
}
