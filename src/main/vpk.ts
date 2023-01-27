import * as fs from 'fs'
import { ModId } from 'shared'
const path = require('path')

export async function removeVpkFile(gameDir: string, modId: ModId): Promise<boolean> {
  try {
    const vpkPath = path.join(gameDir, '/left4dead2/addons/workshop/' + modId + '.vpk')
    const jpgPath = path.join(gameDir, '/left4dead2/addons/workshop/' + modId + '.jpg')

    if (await fs.promises.stat(vpkPath)) {
      await fs.promises.unlink(vpkPath)
    }

    if (await fs.promises.stat(jpgPath)) {
      await fs.promises.unlink(jpgPath)
    }

    return true
  } catch {
    console.log('Error exporting VPK files to disk.')
    return false
  }
}
