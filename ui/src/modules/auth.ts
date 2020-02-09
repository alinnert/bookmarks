import { api } from './api'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

export type Subscriber = (store: AuthStore) => void
export type UserLoading = boolean

export enum userStatus {
  ok = 'ok',
  unauthorized = 'unauthorized',
  networkError = 'network error',
  serverError = 'server error',
  unknownError = 'unknown error'
}

export interface Subscription {
  unsubscribe(): void
}

export interface User {
  username: string
}

export interface AuthStore {
  currentUser: User | null
  loading: UserLoading
  status: userStatus
}

const paths = {
  login: '/auth/login',
  logout: '/auth/logout',
  info: '/auth/info'
} as const

const store: AuthStore = {
  currentUser: null,
  loading: false,
  status: userStatus.ok
}

const subscriptions: Subscriber[] = []

function setStore (newStore: Partial<AuthStore>): void {
  Object.assign(store, newStore)

  for (const callback of subscriptions) {
    callback(store)
  }
}

export async function login (
  username: string, password: string
): Promise<void> {
  setStore({ loading: true, status: userStatus.ok })

  try {
    const response = await api.post(paths.login, { username, password })
    const currentUser = { username: response.data.user.username }
    setStore({ loading: false, currentUser, status: userStatus.ok })
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response === undefined) {
      setStore({
        loading: false, currentUser: null, status: userStatus.networkError
      })
      return
    }

    if (axiosError.response.status === 401) {
      setStore({
        loading: false, currentUser: null, status: userStatus.unauthorized
      })
      return
    }

    if (axiosError.response.status >= 500) {
      setStore({
        loading: false, currentUser: null, status: userStatus.serverError
      })
      return
    }

    setStore({
      loading: false, currentUser: null, status: userStatus.unknownError
    })
  }
}

export async function logout (): Promise<void> {
  setStore({ loading: true, status: userStatus.ok })

  try {
    await api.post(paths.logout)
    setStore({ loading: false, currentUser: null, status: userStatus.ok })
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response === undefined) {
      setStore({ loading: false, status: userStatus.networkError })
    }

    setStore({ loading: false, status: userStatus.unknownError })
  }
}

export async function loadCurrentUser (): Promise<void> {
  setStore({ loading: true })

  try {
    const response = await api.get(paths.info)
    if (response.data.username !== undefined) {
      const currentUser = response.data as User
      setStore({ loading: false, status: userStatus.ok, currentUser })
      return
    }
  } finally {
    setStore({ loading: false, currentUser: null, status: userStatus.ok })
  }
}

export function subscribe (callback: Subscriber): Subscription | undefined {
  if (subscriptions.includes(callback)) { return }
  const callbackWrapper = (data: AuthStore): void => {
    console.log('callback with', JSON.stringify(data))
    callback(data)
  }

  subscriptions.push(callbackWrapper)
  callbackWrapper(store)

  return {
    unsubscribe () {
      subscriptions.splice(subscriptions.indexOf(callbackWrapper), 1)
    }
  }
}

export function useInitAuth (): { init: boolean } {
  // If the app is still initializing
  const [init, setInit] = useState<boolean>(true)
  // If the function ran already. It must only run once.
  const [ran, setRan] = useState<boolean>(false)

  if (ran) { return { init } }
  setRan(true)

  loadCurrentUser()
    .then(() => { setInit(false) })
    .catch(error => {
      console.error(error)

      logout()
        .then(() => { setInit(false) })
        .catch(error => {
          console.error(error)
          setInit(false)
        })
    })

  return { init }
}

export function useCurrentUser (): Pick<AuthStore, 'currentUser'> {
  const [currentStore, setCurrentStore] = useState<AuthStore>(store)

  useEffect(() => {
    function handleChange (store: AuthStore): void {
      setCurrentStore({ ...store })
    }
    const subscription = subscribe(handleChange)
    if (subscription === undefined) { return }
    return subscription.unsubscribe
  }, [])

  return { currentUser: currentStore.currentUser }
}

export function useUserStatus (): Pick<AuthStore, 'loading'> {
  return { loading: store.loading }
}
