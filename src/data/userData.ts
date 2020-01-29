import { db } from '../db'
import { ShortId, User } from '../schema'

const safeProps: Array<keyof User> = ['username', 'groups']

export function getFullUserById (id: ShortId): User {
  return db.data.get('users').find({ id }).value()
}

export function getFullUserByUsername (username: string) {
  return db.data.get('users').find({ username }).value()
}

export function getUserById (id: ShortId) {
  const user = db.data.get('users').find({ id })
  if (user.value() === undefined) { return null }
  return user.pick(...safeProps).value()
}

export function getUserByUsername (username: string) {
  const user = db.data.get('users').find({ username })
  if (user.value() === undefined) { return null }
  return user.pick(...safeProps).value()
}
