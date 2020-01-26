import { db } from '../db'
import { ShortId, User } from '../schema'

const safeProps: Array<keyof User> = ['username', 'groups', 'defaultGroup']

export function getUserById (id: ShortId) {
  return db.get('users').find({ id }).pick(...safeProps).value()
}

export function getUserByUsername (username: string, allProps = false) {
  const user = db.get('users').find({ username })

  if (allProps) return user.value()
  
  return user.pick(...safeProps).value
}