import { createStore, createReactHook } from '../lib/createStore'
import { api } from '../api'
import { AxiosError } from 'axios'

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

const paths = {
  login: '/auth/login',
  logout: '/auth/logout',
  info: '/auth/info'
} as const

export async function login (
  username: string, password: string
): Promise<void> {
  authStore.set({ loading: true, error: false })

  try {
    const body = { username, password }
    const response = await api.post(paths.login, body)
    const currentUser = { username: response.data.user.username as string }

    authStore.set({ currentUser, loading: false, error: false })
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response === undefined) {
      authStore.update(state => {
        state.loading = false
        state.currentUser = null
        state.error = true
      })
      return
    }

    if (axiosError.response.status === 401) {
      authStore.update(state => {
        state.loading = false
        state.currentUser = null
        state.error = true
      })
      return
    }

    if (axiosError.response.status >= 500) {
      authStore.update(state => {
        state.loading = false
        state.currentUser = null
        state.error = true
      })
      return
    }

    authStore.update(state => {
      state.loading = false
      state.currentUser = null
      state.error = true
    })
  }
}

export async function logout (): Promise<void> {
  authStore.update(state => {
    state.loading = true
    state.error = false
  })

  try {
    await api.post(paths.logout)
    authStore.update(state => {
      state.currentUser = null
      state.loading = false
      state.error = false
    })
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response === undefined) {
      authStore.update(state => {
        state.loading = false
        state.error = true
      })
    }

    authStore.update(state => {
      state.loading = false
      state.error = true
    })
  }
}

export async function loadCurrentUser (): Promise<void> {
  authStore.update(state => {
    state.currentUser = null
    state.loading = true
    state.error = false
  })

  try {
    const response = await api.get(paths.info)

    if (response.data.username !== undefined) {
      const currentUser = response.data as User

      authStore.update(state => {
        state.currentUser = currentUser
        state.loading = false
        state.error = false
      })

      return
    }

    authStore.update(state => {
      state.currentUser = null
      state.loading = false
      state.error = false
    })
  } catch {
    authStore.update(state => {
      state.currentUser = null
      state.loading = false
      state.error = false
    })
  }
}
