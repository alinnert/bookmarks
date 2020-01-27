export type ShortId = string

export type User = {
  id: ShortId
  username: string
  password: string
  groups: ShortId[]
}

export type Group = {
  id: ShortId
  links: ShortId[]
  title: string
  color?: string
}

export type Link = {
  id: ShortId
  url: string
  title?: string
  note?: string
  created: number
}  

export type DataSchema = {
  users: User[],
  links: Link[],
  groups: Group[]
}