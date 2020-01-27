import * as fs from 'fs'

const requiredDirectories = [
  'storage/sessions',
]

function ensureDirectories () {
  for (const directory of requiredDirectories) {
    const mkdirOptions = { recursive: true, mode: 0o755 }
    fs.mkdirSync(`${__dirname}/../${directory}`, mkdirOptions)
  }
}

export function setupEnvironment () {
  ensureDirectories()
}