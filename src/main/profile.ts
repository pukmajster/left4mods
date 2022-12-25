import { app, shell } from 'electron'
import * as fs from 'fs'
import { IUserProfile } from 'shared'
const path = require('path')

const PROFILE_PATH = path.join(app.getPath('userData'), 'profile.json')

export async function readProfile() {
  try {
    let data = JSON.parse(await fs.promises.readFile(PROFILE_PATH, 'utf8'))
    console.log('successfully read profile')
    return data as IUserProfile
  } catch (err) {
    console.log('ERROR READING PROFILE', err)
    return {}
  }
}

export async function writeProfile(data: IUserProfile) {
  try {
    let stringified = JSON.stringify(data, null, 4)
    console.log('writing profile')

    await fs.promises.writeFile(PROFILE_PATH, stringified)
  } catch (err) {
    console.log('ERROR WRITING PROFILE', err)
  }
}

export async function openWorkingDirectory() {
  try {
    await shell.openPath(app.getPath('userData'))
  } catch (err) {
    console.log('ERROR OPENING WORKING DIRECTORY', err)
  }
}
