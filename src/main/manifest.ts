const VPK = require('vpk')
const fs = require('fs')
const path = require('path')
const vdf = require('node-vdf')
const { app } = require('electron')

// Some mods pack extra metadata we don't really care about
// These values are just copied over
const acceptedMetaKeys = [
  'addontitle',
  'addonversion',
  'addontagline',
  'addonauthor',
  'addonauthorsteamid',
  'addondescription',
  'addonurl0'
]

// Certain keys signify the vague category of a mod.
// We map these into a category/tag, but only if the value of the key
//  has been been set to "1" by the mod author.
const addonContentToCategoryMap = {
  addoncontent_backgroundmovie: 'Background Movie',
  addoncontent_bossinfected: 'Special Infected',
  addoncontent_campaign: 'Campaign',
  addoncontent_commoninfected: 'Common Infected',
  addoncontent_map: 'Map',
  addoncontent_music: 'Music',
  addoncontent_prefab: 'Prefab',
  addoncontent_prop: 'Prop',
  addoncontent_script: 'Script',
  addoncontent_skin: 'Skin',
  addoncontent_sound: 'Sound',
  addoncontent_spray: 'Spray',
  addoncontent_survivor: 'Survivor',
  addoncontent_weapon: 'Weapon',
  addoncontent_weaponmodel: 'Viewmodel'
}

const fileToCategoryMap = {
  'models/': ['Model'],
  'sound/': ['Sound'],
  'materials/': ['Material'],
  '.phy': ['Material'],

  vgui: ['VGUI'],
  'vgui/hud/': ['HUD'],
  '/correction/': ['Colour Correction'],
  '/ui/': ['UI'],
  vscripts: ['VScript'],
  '.nut': ['VScript'],

  voice: ['Voice'],
  music: ['Music'],

  gambler: ['Nick'],
  zoey: ['Zoey'],
  teenangst: ['Zoey'],
  louis: ['Louis'],
  manager: ['Louis'],
  namvet: ['Bill'],
  bill: ['Bill'],
  mechanic: ['Ellis'],
  biker: ['Francis'],
  coach: ['Coach'],
  producer: ['Rochelle'],

  'infected/common/': ['Common Infected'],

  boomer: ['Boomer'],
  '/tank/': ['Tank'],
  boomette: ['Boomette'],
  'charger/': ['Charger'],
  jockey: ['Jockey'],
  witch: ['Witch'],
  'hulk/': ['Tank (Hulk)'],
  spitter: ['Spitter'],
  'hunter/': ['Hunter'],
  smoker: ['Smoker'],

  machete: ['Machete'],
  cricketbat: ['Cricket Bat'],
  'bat/': ['Bat'],
  'bat.': ['Bat'],
  'knife.': ['CSS Knife'],
  'knife/': ['CSS Knife'],
  chainsaw: ['Chainsaw'],
  axe: ['Axe'],
  crowbar: ['Crowbar'],
  guitar: ['Guitar'],
  shovel: ['Shovel'],
  katana: ['Katana'],
  frying_pan: ['Pan'],
  '/pan/': ['Pan'],
  golf_club: ['Golf Club'],
  tonfa: ['Tonfa'],
  pitchfork: ['Pithcfork'],

  pipebomb: ['Pipebomb'],
  pipe_bomb: ['Pipebomb'],
  molotov: ['Molotov'],
  bile_flask: ['Bile'],

  incendiary_ammopack: ['Incendiary Ammo Pack'],
  explosive_ammopack: ['Explosive Ammo Pack'],
  laser_pack: ['Laser Pack'],

  'pistol/': ['Pistol'],
  'magnum/': ['Deagle'],
  'desert_eagle/': ['Deagle'],
  'sniper_military/': ['Military Sniper'],
  'hunting_rifle/': ['Hunting Sniper'],
  'awp/': ['CSS AWP'],
  'rifle_desert/': ['SCAR'],
  'desert_rifle/': ['SCAR'],
  'ak47/': ['AK-47'],
  'rifle_ak47/': ['AK-47'],
  'shotgun_chrome/': ['Shotgun Chrome'],
  'shotgun/': ['Shotgun Pump'],
  'sg552/': ['SG552'],
  'auto_shotgun_spas/': ['SPAS'],
  'shotgun_spas/': ['SPAS'],
  '/rifle/': ['M16'],
  'rifle_m16a2/': ['M16'],
  'smg_silenced/': ['UZI Silenced'],
  smg_a: ['UZI Silenced'],
  'smg/': ['UZI'],
  'smg_uzi/': ['UZI'],
  'mp5/': ['CSS MP5'],
  'smg_mp5/': ['CSS MP5'],
  'scout/': ['CSS Scout'],
  'snip_scout/': ['CSS Scout'],
  'grenade_launcher/': ['Grenade Launcher'],
  'auto_shotgun/': ['Auto Shotgun'],
  'autoshot_m4super/': ['Auto Shotgun'],
  'machinegun_m60/': ['M60'],

  defibrillator: ['Defibrillator'],
  adrenaline: ['Adrenaline'],
  pain_pills: ['Pills'],
  painpills: ['Pills'],
  medkit: ['Medkit'],

  gnome: ['Gnome']
}

// Common files found in VPKs that should not result in mod conflictions
const commonVpkAddonFiles = ['addoninfo.txt', 'addonimage.jpg']

const cacheDir = path.join(app.getPath('userData'), 'manifest.json')

function verifyGameDir(gameDir: string) {
  if (!gameDir) return false
  if (!gameDir.includes('Left 4 Dead 2')) return false

  return true
}

export async function buildManifest() {
  console.log('WE ARE BUILDING THE MANIFEST')

  const gameDir = '/home/kry/.local/share/Steam/steamapps/common/Left 4 Dead 2/left4dead2/'
  // Verify we have a proper gameDir
  if (!verifyGameDir(gameDir)) {
    console.log('Invalid gameDir')
    return {}
  }

  const addonsDir = path.join(gameDir, 'addons/workshop')
  console.log('------------reading addons dir----------')
  console.log(addonsDir)

  const cache = {}

  try {
    let files = fs.readdirSync(addonsDir)

    files.forEach((file) => {
      // Only look through .vpks
      if (!file.endsWith('.vpk')) return
      const pakPath = path.join(addonsDir, file)

      console.log(' ----------- parsing ' + pakPath + ' ----------')

      let modInfo = {
        files: <string[]>[],
        categories: <string[]>[]
      }

      function addCategory(category: string) {
        if (modInfo.categories.includes(category)) return
        modInfo.categories.push(category)
      }

      try {
        const stats = fs.statSync(pakPath)
        modInfo['timeModified'] = stats.mtime

        // Open the VPK
        const vpk = new VPK(pakPath)
        vpk.load()

        // Get a list of all the files the mod supplies and provide appropriate categories
        //   based on said files
        for (let includedFile of vpk.files) {
          // We skip common addon files because they should not cause conflicts with other files
          if (commonVpkAddonFiles.includes(includedFile)) continue
          modInfo.files.push(includedFile)

          for (let categoryTest in fileToCategoryMap) {
            if (includedFile.includes(categoryTest)) {
              let categoriesToAdd = fileToCategoryMap[categoryTest]
              for (let catToAdd of categoriesToAdd) {
                addCategory(catToAdd)
              }
            }
          }
        }

        let addonId = file.split('.')[0]
        modInfo['id'] = addonId

        try {
          let addoninfoFile = vpk.getFile('addoninfo.txt')
          if (!addoninfoFile) throw new Error('Missing addoninfo.txt')
          let addoninfo = addoninfoFile.toString('utf-8')

          // Read the file buffer and turn it into a string our VDF parser can read
          let addoninfoData = vdf.parse(addoninfo).AddonInfo

          // Take a look at the addoninfo.txt file and see what useful information we can snatch
          for (let item in addoninfoData) {
            let key = item.toLocaleLowerCase()
            let value = addoninfoData[item].toString()

            // If the value of the key is 0 we don't care about it
            if (value == '0') continue

            if (acceptedMetaKeys.includes(key)) {
              // Just copy over certain keys
              modInfo[key] = value
            } else if (addonContentToCategoryMap.hasOwnProperty(key)) {
              // Map the contentAddon property into a category
              addCategory(addonContentToCategoryMap[key])
            }
          }
        } catch (e) {
          console.log('error parsing addoninfo for mod ' + addonId)
          modInfo['error'] = 'Error parsing addoninfo.txt'
          //console.log(addoninfo);
          //console.log(addoninfo);
        }

        cache[addonId] = modInfo
      } catch (e) {
        let err = e as Error
        console.log(err.message)
      }
    })
  } catch (e) {
    console.log((e as Error).message)

    console.log('error building cache')
  }

  //console.log(cache);
  console.log('------------end addon cache ----------------')

  // TODO: remove indent for final version?
  const f = fs.writeFileSync(cacheDir, JSON.stringify(cache, null, 4))

  return cache
}

export function requestManifest(forceNewBuild: boolean = false) {
  const cacheExists = fs.existsSync(cacheDir)
  return buildManifest()

  if (forceNewBuild || !cacheExists) {
    console.log('building new cache')
    return buildManifest()
  }

  if (!cacheExists) {
    console.log('no cache detected... aborting')
    return {}
  }

  console.log('reading cache')
  return JSON.parse(fs.readFileSync(cacheDir))
}
