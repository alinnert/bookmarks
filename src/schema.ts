export type ShortId = string

export type User = {
  id: ShortId
  username: string
  password: string
  defaultGroup: string
  groups: ShortId[]
}

export type Group = {
  id: ShortId
  links: ShortId[]
  name?: string
  color?: string
}

export type Link = {
  id: ShortId
  url: string
  title?: string
  note?: string
}  

export type DataSchema = {
  users: User[],
  links: Link[],
  groups: Group[]
}