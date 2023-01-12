import * as fs from 'fs'
const path = require('path')

export async function writeAddonList(gameDir: string, addons: string) {
  console.log('Writing addonlist.txt to disk...')

  try {
    fs.promises.writeFile(path.join(gameDir, 'left4dead2/addonlist.txt'), addons)
    console.log('File succesfully saved to disk.')

    return true
  } catch {
    return false
  }
}
