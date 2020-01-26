import * as lowdb from 'lowdb'
import { DataSchema } from "./schema"
import FileSync = require("lowdb/adapters/FileSync")

const adapter = new FileSync<DataSchema>('./storage/data.json')
export const db = lowdb(adapter)
