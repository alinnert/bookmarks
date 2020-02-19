export type ShortId = string

export interface User {
  id: ShortId
  username: string
  password: string
  groups: ShortId[]
}

export interface Group {
  id: ShortId
  links: ShortId[]
  title: string
  color?: string
}

export interface Link {
  id: ShortId
  url: string
  title?: string
  note?: string
  created: number
}  

export interface DataSchema {
  users: User[],
  links: Link[],
  groups: Group[]
}
