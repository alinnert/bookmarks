import { db } from '../db'
import { Group, ShortId } from '../schema'

export function getGroupsByIds (ids: ShortId[]): Group[] {
  return db.get('groups')
    .filter(group => ids.includes(group.id))
    .value()
}