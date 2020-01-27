import * as fs from 'fs'

const baseDir = `${__dirname}/..`

const requiredDirectories = [
  'storage/sessions'
]

const requiredFiles = [
  'storage/data.json'
]

function ensureDirectories () {
  for (const directory of requiredDirectories) {
    const options: fs.MakeDirectoryOptions = { recursive: true, mode: 0o755 }
    const path = `${baseDir}/${directory}`
    fs.mkdirSync(path, options)
  }
}

function ensureFiles () {
  for (const file of requiredFiles) {
    const options: fs.WriteFileOptions = { mode: 0o755, flag: 'wx' }
    const path = `${baseDir}/${file}`
    try { fs.writeFileSync(path, '', options) } catch {}
  }
}

export function setupEnvironment () {
  ensureDirectories()
  ensureFiles()
}