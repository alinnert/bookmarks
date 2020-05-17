import * as lowdb from 'lowdb'
import { DataSchema } from "./schema"
import FileSync = require("lowdb/adapters/FileSync")

interface Instances {
  data: lowdb.LowdbSync<DataSchema>|null
}

const instances: Instances = {
  data: null
}

export const db = {
  get data (): lowdb.LowdbSync<DataSchema> {
    if (instances.data === null) {
      const adapter = new FileSync<DataSchema>('./storage/data.json')
      const defaults: DataSchema = { users: [], links: [], groups: [] }

      instances.data = lowdb(adapter)
      instances.data.defaults(defaults).write()
    }
    return instances.data
  }
}
