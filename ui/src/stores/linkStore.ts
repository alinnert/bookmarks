import { createReactHook, createStore } from '@alinnert/tstate'
import { api } from '../services/apiService'

// #region store
export type ShortId = string

export interface Link {
  id: ShortId
  url: string
  title?: string
  note?: string
  created: number
}

export interface Group {
  id: ShortId
  links: ShortId[]
  title: string
  color?: string
}

export interface LinkStore {
  groups: Group[]
  loading: boolean
  error: boolean
}

const initialState: LinkStore = {
  groups: [],
  loading: false,
  error: false
}

const linkStore = createStore(initialState)
export const useLinkStore = createReactHook(linkStore)

const mutations = {
  startLoading () {
    linkStore.set({ loading: true, error: false })
  },

  setGroups (groups: LinkStore['groups']) {
    linkStore.set({ groups, loading: false, error: false })
  },

  setError (error: LinkStore['error']) {
    linkStore.set({ loading: false, error: error })
  }
}
// #endregion store

// #region functions
const paths = {
  getAll: '/groups'
} as const

export async function loadLinks (): Promise<void> {
  mutations.startLoading()

  try {
    const result = await api.get(paths.getAll)
    const groups = result.data as Group[]
    mutations.setGroups(groups)
  } catch {
    mutations.setError(true)
  }
}
// #endregion functions
