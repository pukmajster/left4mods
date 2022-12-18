const VPK = require('vpk')
import fetch from 'electron-fetch'
import FormData from 'form-data'
import * as fs from 'fs'
import { IMod, IModManifest, ModId } from 'shared'
const path = require('path')
const vdf = require('node-vdf')
const { app } = require('electron')
const fsp = fs.promises

export interface IPublishedFileDetails {
  publishedfileid: string
  creator?: string
  filename?: string
  file_size?: string
  title: string
  description?: string
  tags?: IPublishedFileDetailsTag[]
}

export interface IPublishedFileDetailsTag {
  tag: string
}

export interface IOnlineAddoninfoResponse {
  response: {
    result: number
    resultcount: number
    publishedfiledetails: IPublishedFileDetails[]
  }
}

const gameDir = '/home/kry/.local/share/Steam/steamapps/common/Left 4 Dead 2/left4dead2/'
const ADDONS_WORKSHOP_DIR = path.join(gameDir, 'addons/workshop')
const MANIFEST_PATH = path.join(app.getPath('userData'), 'manifest.json')

async function buildManifest(existingManifest?: IModManifest) {
  let tempManifest: IModManifest = {}

  // ----------------------------------------------------------------
  // 1. Check for new mods that are not in the manifest
  // ----------------------------------------------------------------
  let idsInAddonsDir: ModId[] = []
  let newIds: ModId[] = []
  let newIdCount = 0

  let modIdsWithoutValidAddonInfo: ModId[] = []

  if (existingManifest) {
    idsInAddonsDir = Object.keys(existingManifest)
    console.log('Found ' + idsInAddonsDir.length + ' mods in the manifest')
  }

  try {
    let files = await fsp.readdir(ADDONS_WORKSHOP_DIR)
    for (let file of files) {
      if (!file.endsWith('.vpk')) continue
      let id = file.split('.')[0]

      if (idsInAddonsDir.includes(id)) continue

      newIdCount++
      newIds.push(id)

      // ----------------------------------------------------------------
      // 2. Open up the vpk and read the addoninfo.txt
      // ----------------------------------------------------------------

      try {
        const pakPath = path.join(ADDONS_WORKSHOP_DIR, file)
        console.log(' ----------- parsing ' + pakPath + ' ----------')

        let modInfo: IMod = {
          id: id,
          files: [],
          categories: []
        }

        function addCategory(category: string) {
          if (modInfo.categories!.includes(category)) return
          modInfo.categories!.push(category)
        }

        const stats = await fsp.stat(pakPath)
        modInfo['timemodified'] = stats.mtime

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

        try {
          let addoninfoFile = vpk.getFile('addoninfo.txt')
          if (!addoninfoFile) {
            throw new Error('Missing addoninfo.txt')
          }
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
          modIdsWithoutValidAddonInfo.push(id)
          console.log('error parsing addoninfo for mod ' + id)
          modInfo['error'] = 'Error parsing addoninfo.txt'
        }

        tempManifest[id] = modInfo
      } catch (e) {
        console.log(e as Error)
        console.log('error could not open vpk')
        return {}
      }
    }
  } catch (e) {
    console.log(e as Error)
    console.log("FATAL couldn't read addons dir")
    return {}
  }

  // ----------------------------------------------------------------
  // 3. Fetch missing mod titles from the Steam Workshop
  // ----------------------------------------------------------------

  if (modIdsWithoutValidAddonInfo.length > 0) {
    const fd = new FormData()
    let i = 0
    fd.append('itemcount', `${modIdsWithoutValidAddonInfo.length}`)
    for (let id of modIdsWithoutValidAddonInfo) {
      fd.append(`publishedfileids[${i}]`, id)
      i++
    }

    console.log('Fetching mod titles from Steam Workshop...')

    try {
      let res = await fetch(
        'https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1',
        {
          // @ts-ignore
          body: fd,
          method: 'POST'
        }
      )

      //let blob = await res.buffer()
      //fs.writeFileSync('test.html', blob)

      let data: IOnlineAddoninfoResponse = await res.json()

      for (let publishedFile of data.response.publishedfiledetails) {
        console.log(publishedFile)
        tempManifest[publishedFile.publishedfileid].addontitle = publishedFile.title
      }
    } catch (e) {
      console.log(e as Error)

      console.log('failed to retrieve online mod info')
    }
  } else {
    console.log('No missing mod titles to fetch')
  }

  // ----------------------------------------------------------------
  // 4. Write the manifest to disk
  // ----------------------------------------------------------------

  // Merge the existing manifest with the new one
  let finalManifest: IModManifest = { ...tempManifest, ...existingManifest }

  // TODO: remove indent for final version?
  const f = fs.writeFileSync(MANIFEST_PATH, JSON.stringify(finalManifest, null, 4))

  return finalManifest
}

async function readExistingManifest() {
  try {
    let data: IModManifest = JSON.parse(await fsp.readFile(MANIFEST_PATH, 'utf8'))
    return await buildManifest(data)
  } catch (e) {
    return {}
    console.log(e as Error)
  }
}

export async function requestManifest(forceNewBuild: boolean = false) {
  try {
    await fsp.access(MANIFEST_PATH)

    if (forceNewBuild) return await buildManifest({})
    else return await readExistingManifest()
  } catch (e) {
    console.log('there is no existing manifest')
    return await buildManifest({})
  }
}

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
