import * as fs from 'fs'
import { ModId } from 'shared'
const VPK = require('vpk')
const path = require('path')

export async function exportVpkFiles(
  gameDir: string,
  exportDir: string,
  modId: ModId,
  files: string[]
): Promise<void> {
  console.log('Exporting VPK files to disk...')

  try {
    const vpkPath = gameDir + '/left4dead2/addons/workshop/' + modId + '.vpk'
    const vpk = new VPK(vpkPath)
    vpk.load()

    for (const file of files) {
      const fileData = vpk.getFile(file)

      const fileName = file.split(/(\\|\/)/g).pop()
      const filePath = path.join(exportDir, fileName)
      const fileDir = exportDir

      console.log('Exporting file: ' + fileName)

      if (fs.existsSync(fileDir)) {
        await fs.promises.writeFile(filePath, fileData)
      }
    }
  } catch {
    console.log('Error exporting VPK files to disk.')
  }
}
