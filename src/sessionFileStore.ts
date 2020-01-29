import * as session from 'koa-session'
import { db } from './db'

export const fileStore: session.stores = {
  async get (key, maxAge, options) {
    const sessionData = db.sessions.get('sessions').find({ key }).value()
    if (sessionData.ttl > Date.now()) return null
    return sessionData.value
  },

  async set (key, value, maxAge, options) {
    if (options.rolling || options.changed) {
      // TODO: implement me!
    }
  },

  async destroy (key) {
    db.sessions.get('sessions').remove({ key }).write()
  }
}