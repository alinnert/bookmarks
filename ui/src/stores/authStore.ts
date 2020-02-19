import { createStore, createReactHook } from '@alinnert/tstate'
import { api } from '../services/apiService'
import { AxiosError } from 'axios'

// #region store
export interface User {
  username: string
}

export interface AuthStore {
  currentUser: User | null
  loading: boolean
  error: boolean
}

const initialState: AuthStore = {
  currentUser: null,
  loading: false,
  error: false
}

const authStore = createStore<AuthStore>(initialState)
export const useAuthStore = createReactHook(authStore)

const mutations = {
  startLoading () {
    authStore.set({ currentUser: null, loading: true, error: false })
  },

  setCurrentUser (currentUser: AuthStore['currentUser']) {
    authStore.set({ currentUser, loading: false, error: false })
  },

  setError (error: AuthStore['error']) {
    authStore.set({ loading: false, error })
  }
}
// #endregion store

// #region functions
const paths = {
  login: '/auth/login',
  logout: '/auth/logout',
  info: '/auth/info'
} as const

export async function login (
  username: string, password: string
): Promise<void> {
  mutations.startLoading()

  try {
    const body = { username, password }
    const response = await api.post(paths.login, body)
    const currentUser = { username: response.data.user.username as string }

    mutations.setCurrentUser(currentUser)
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response === undefined) {
      mutations.setError(true)
      return
    }

    if (axiosError.response.status === 401) {
      mutations.setError(true)
      return
    }

    if (axiosError.response.status >= 500) {
      mutations.setError(true)
      return
    }

    mutations.setError(true)
  }
}

export async function logout (): Promise<void> {
  mutations.startLoading()

  try {
    await api.post(paths.logout)
    mutations.setCurrentUser(null)
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response === undefined) {
      mutations.setError(true)
    }

    mutations.setError(true)
  }
}

export async function loadCurrentUser (): Promise<void> {
  mutations.startLoading()

  try {
    const response = await api.get(paths.info)

    if (response.data.username !== undefined) {
      const currentUser = response.data as User

      mutations.setCurrentUser(currentUser)
      return
    }

    mutations.setCurrentUser(null)
  } catch {
    mutations.setError(true)
  }
}
// #endregion functions
