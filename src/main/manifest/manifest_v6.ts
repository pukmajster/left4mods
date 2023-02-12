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

type DirectoryMode = 'local' | 'workshop'

interface IModsList {
  [id: string]: IMod
}

async function buildManifest(options: RequestManifestOptions): Promise<IModManifest> {
  const defaultReturn: IModManifest = {
    metadata: {
      lastUpdated: new Date().toISOString()
    },
    mods: {}
  }

  // Prep a dummy manifest
  const tempManifest: IModManifest = {
    metadata: {
      lastUpdated: new Date().toISOString()
    },
    mods: {}
  }

  // ----------------------------------------------------------------
  // TODO: Verify we have a proper game directory
  // ----------------------------------------------------------------
  // if (!options.gameDir || !options.gameDir.includes('common/Left 4 Dead 2')) {
  //   throw new Error('Invalid gameDir')
  // }

  const ADDONS_WORKSHOP_DIR = path.join(options.gameDir, '/left4dead2/addons/workshop')
  const ADDONS_LOCAL_DIR = path.join(options.gameDir, '/left4dead2/addons/')
  const MANIFEST_PATH = path.join(app.getPath('userData'), 'manifest.json')

  // ----------------------------------------------------------------
  // If possible, read the existing manifest we'll be building on top of
  // ----------------------------------------------------------------
  let existingModIds: ModId[] = []

  try {
    if (!options.forceNewBuild) {
      console.log('Attempting to read existing manifest.json')

      await fsp.access(MANIFEST_PATH)
      const data: IModManifest = JSON.parse(await fsp.readFile(MANIFEST_PATH, 'utf8'))

      tempManifest.mods = data.mods
      tempManifest.metadata = data.metadata

      existingModIds = Object.keys(data.mods)

      console.log('Found ' + existingModIds.length + ' existing mods in the manifest')
    }
  } catch (e) {
    console.log('Failed to access manifest.json')
    return defaultReturn
  }

  // ----------------------------------------------------------------
  // Look for new mods
  // ----------------------------------------------------------------
  const newWorkshopMods = await getModsFromDirectory(
    ADDONS_WORKSHOP_DIR,
    'workshop',
    existingModIds
  )
  const newLocalMods = await getModsFromDirectory(ADDONS_LOCAL_DIR, 'local', existingModIds)

  // ----------------------------------------------------------------
  // Update our dummy manifest with the new data
  // ----------------------------------------------------------------
  tempManifest.metadata.lastUpdated = new Date().toISOString()
  tempManifest.mods = { ...tempManifest.mods, ...newWorkshopMods, ...newLocalMods }

  // ----------------------------------------------------------------
  // Fetch online workshop mod metadata
  // ----------------------------------------------------------------
  const modIdsWithoutValidAddonInfo: ModId[] = []

  // Check for mods that are missing a title
  for (const mod in tempManifest.mods) {
    if (!tempManifest.mods[mod].addontitle && tempManifest.mods[mod].fromworkshop) {
      console.log('Missing mod title for mod ' + mod)
      modIdsWithoutValidAddonInfo.push(mod)
    }
  }

  if (!options.disableOnlineFetchingOfModData && modIdsWithoutValidAddonInfo.length > 0) {
    const fd = new FormData()
    let i = 0
    fd.append('itemcount', `${modIdsWithoutValidAddonInfo.length}`)
    for (const id of modIdsWithoutValidAddonInfo) {
      fd.append(`publishedfileids[${i}]`, id)
      i++
    }

    console.log('Fetching mod titles from Steam Workshop...')

    try {
      const res = await fetch(
        'https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1',
        {
          // @ts-ignore
          body: fd,
          method: 'POST'
        }
      )
      const data: IOnlineAddoninfoResponse = await res.json()

      for (const publishedFile of data.response.publishedfiledetails) {
        const id = publishedFile.publishedfileid.toString()
        if (modIdsWithoutValidAddonInfo.includes(id))
          tempManifest.mods[id].addontitle = publishedFile.title

        // TODO: get rid of this
        // @ts-ignore:
        tempManifest.mods[id].fullonlinemeta = publishedFile
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
  // Write the manifest to disk
  // ----------------------------------------------------------------

  // TODO: remove indent for final version
  fsp.writeFile(MANIFEST_PATH, JSON.stringify(tempManifest, null, 2))

  return tempManifest
}

async function getModsFromDirectory(
  directory: string,
  mode: DirectoryMode,
  existingIds: ModId[]
): Promise<IModsList> {
  const newIds: ModId[] = []
  let newIdCount = 0
  const mods = {}

  try {
    const files = await fsp.readdir(directory)
    for (const file of files) {
      if (!file.endsWith('.vpk')) continue
      const id = file.split('.')[0]

      if (existingIds.includes(id)) continue

      newIdCount++
      newIds.push(id)

      // ----------------------------------------------------------------
      // 2. Open up the vpk and read the addoninfo.txt
      // ----------------------------------------------------------------

      const modInfo: IMod = {
        id: id,
        files: [],
        categories: [],
        timemodified: '',
        vpksize: 0,
        pureId: id,
        fromworkshop: mode === 'workshop' ? true : false,
        uninstalled: false
      }

      const pakPath = path.join(directory, file)
      console.log(' ----------- parsing ' + pakPath + ' ----------')

      try {
        function addCategory(category: string) {
          if (modInfo.categories!.includes(category)) return
          modInfo.categories!.push(category)
        }

        const stats = await fsp.stat(pakPath)

        stats.size == 0 && console.log(stats)

        modInfo.timemodified = stats.mtime.toDateString()
        modInfo.vpksize = stats.size // in bytes

        // Open the VPK
        const vpk = new VPK(pakPath)
        vpk.load()

        // Get a list of all the files the mod supplies and provide appropriate categories
        //   based on said files
        for (const includedFile of vpk.files) {
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
        }

        try {
          const addoninfoFile = vpk.getFile('addoninfo.txt')
          if (!addoninfoFile) {
            throw new Error('Missing addoninfo.txt')
          }

          const addoninfo = addoninfoFile.toString('utf-8')
          const cleanedUpAddonInfo = addoninfo.replace(/^\/\/.*$/gm, '')

          // Read the file buffer and turn it into a string our VDF parser can read
          const addoninfoData = vdf.parse(cleanedUpAddonInfo)?.AddonInfo

          if (!addoninfoData) {
            throw new Error('Missing AddonInfo object in addoninfo.txt')
          }

          // Take a look at the addoninfo.txt file and see what useful information we can snatch
          for (const item in addoninfoData) {
            const key = item.toLocaleLowerCase()
            const value = addoninfoData[item].toString()

            if (acceptedMetaKeys.includes(key)) {
              // Just copy over certain keys
              modInfo[key] = value
            } else if (addonContentToCategoryMap.hasOwnProperty(key)) {
              // If the value of the key is 0 we don't care about it
              if (value == '0') continue

              // Map the contentAddon property into a category
              addCategory(addonContentToCategoryMap[key])
            }
          }
        } catch (e) {
          console.log('error parsing addoninfo for mod ' + id)
          modInfo['error'] = 'Error parsing addoninfo.txt'
        }

        mods[id] = modInfo
      } catch (e) {
        // If the mod is present in the manifest, label it as uninstalled
        if (existingIds.includes(id)) {
          mods[id].uninstalled = true
        }

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

  console.log('Found ' + newIdCount + ' new mods')

  return mods
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
