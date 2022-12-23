const VPK = require('vpk')
import fetch from 'electron-fetch'
import FormData from 'form-data'
import * as fs from 'fs'
import { IMod, IModManifest, ModId, RequestManifestOptions } from 'shared'
import { fileOccurrencesToCategoryMap } from './manifest_maps'
const path = require('path')
const vdf = require('node-vdf')
const { app } = require('electron')
const fsp = fs.promises

// TODO: Find a way to update the manifest for updated mods without completely getting rid of the current manifest
export type CategoryFiles = string[]

export type GenericFilesBuilderReturn = {
  [key: string]: CategoryFiles
}

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

async function buildManifest(options: RequestManifestOptions) {
  let tempManifest: IModManifest = {}

  // ----------------------------------------------------------------
  // Verify we have a proper gameDir
  if (!options.gameDir || !options.gameDir.includes('common/Left 4 Dead 2')) {
    throw new Error('Invalid gameDir')
  }

  const ADDONS_WORKSHOP_DIR = path.join(options.gameDir, '/left4dead2/addons/workshop')
  const MANIFEST_PATH = path.join(app.getPath('userData'), 'manifest.json')

  // ----------------------------------------------------------------
  // 1. Check for new mods that are not in the manifest
  // ----------------------------------------------------------------
  let idsInAddonsDir: ModId[] = []
  let newIds: ModId[] = []
  let newIdCount = 0
  let existingManifest: IModManifest = {}

  try {
    if (!options.forceNewBuild) {
      await fsp.access(MANIFEST_PATH)
      let data: IModManifest = JSON.parse(await fsp.readFile(MANIFEST_PATH, 'utf8'))
      existingManifest = data
      idsInAddonsDir = Object.keys(data)
      console.log('Found ' + idsInAddonsDir.length + ' existing mods in the manifest')
    }
  } catch (e) {
    console.log('Failed to access manifest.json')
    return {}
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
          categories: [],
          timemodified: '',
          vpksize: 0
        }

        function addCategory(category: string) {
          if (modInfo.categories!.includes(category)) return
          modInfo.categories!.push(category)
        }

        const stats = await fsp.stat(pakPath)
        modInfo.timemodified = stats.mtime
        modInfo.vpksize = stats.size // in bytes

        // Open the VPK
        const vpk = new VPK(pakPath)
        vpk.load()

        // Get a list of all the files the mod supplies and provide appropriate categories
        //   based on said files
        for (let includedFile of vpk.files) {
          // We skip common addon files because they should not cause conflicts with other files
          if (commonVpkAddonFiles.includes(includedFile)) continue
          modInfo.files.push(includedFile)

          for (const [key, tests] of Object.entries(fileOccurrencesToCategoryMap)) {
            for (const test of tests) {
              if (includedFile.includes(test)) {
                addCategory(key)
              }
            }
          }

          // for (let categoryTest in fileToCategoryMap) {
          //   if (includedFile.includes(categoryTest)) {
          //     let categoriesToAdd = fileToCategoryMap[categoryTest]
          //     for (let catToAdd of categoriesToAdd) {
          //       addCategory(catToAdd)
          //     }
          //   }
          // }
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

  // Merge the existing manifest with the new one
  let mergedManifest: IModManifest = { ...tempManifest, ...existingManifest }

  // ----------------------------------------------------------------
  // 3. Fetch missing mod titles from the Steam Workshop
  // ----------------------------------------------------------------

  let modIdsWithoutValidAddonInfo: ModId[] = []

  // Check for mods that are missing a title
  for (let mod in mergedManifest) {
    if (!mergedManifest[mod].addontitle) {
      console.log('Missing mod title for mod ' + mod)

      modIdsWithoutValidAddonInfo.push(mod)
    }
  }

  if (!options.disableOnlineFetchingOfModData && modIdsWithoutValidAddonInfo.length > 0) {
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
      let data: IOnlineAddoninfoResponse = await res.json()

      for (let publishedFile of data.response.publishedfiledetails) {
        let id = publishedFile.publishedfileid.toString()
        if (modIdsWithoutValidAddonInfo.includes(id))
          mergedManifest[id].addontitle = publishedFile.title
      }

      console.log('Successfully retrieved online mod info')
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

  // TODO: remove indent for final version?
  const f = fs.writeFileSync(MANIFEST_PATH, JSON.stringify(mergedManifest, null, 4))

  return mergedManifest
}

export async function requestManifest(options: RequestManifestOptions) {
  try {
    return await buildManifest(options)
  } catch (e) {
    console.log('Failed to build manifest', e)
    return {}
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
  addoncontent_backgroundmovie: 'background_movie',
  addoncontent_bossinfected: 'special_infected',
  addoncontent_campaign: 'campaign',
  addoncontent_commoninfected: 'common_infected',
  addoncontent_map: 'map',
  addoncontent_music: 'music',
  addoncontent_prefab: 'prefab',
  addoncontent_prop: 'prop',
  addoncontent_script: 'script',
  addoncontent_skin: 'skin',
  addoncontent_sound: 'sound',
  addoncontent_spray: 'spray',
  addoncontent_survivor: 'survivor',
  addoncontent_weapon: 'weapon',
  addoncontent_weaponmodel: 'viewmodel'
}

// Common files found in VPKs that should not result in mod conflictions
const commonVpkAddonFiles = ['addoninfo.txt', 'addonimage.jpg']
