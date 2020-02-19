import React, { FC, useEffect, useState } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { ignore } from './lib/functions'
import { loadCurrentUser, useAuthStore } from './stores/authStore'
import { Home } from './views/Home'
import { Login } from './views/Login'

export const App: FC = () => {
  const location = useLocation()
  const { currentUser } = useAuthStore()
  const { error, ready } = useInit()
  const url = location.pathname

  const mustLogin = (): boolean => url !== '/login' && currentUser === null
  const mustNotLogin = (): boolean => url === '/login' && currentUser !== null

  function getContent (): JSX.Element {
    return <>
      <Navigation/>
      <Switch>
        {mustLogin() ? <Redirect from="/" to="/login" /> : null}
        {mustNotLogin() ? <Redirect from="/login" to="/" exact /> : null}
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </>
  }

  function getError (): JSX.Element {
    return <div>Oops! An error occured while loading the app.</div>
  }

  function getLoading (): JSX.Element {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      {ready ? getContent() : error ? getError() : getLoading()}
    </div>
  )
}

function useInit (): { ready: boolean, error: boolean } {
  const [ready, setReady] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        await loadCurrentUser()
        setReady(true)
      } catch {
        setError(true)
      }
    })().catch(ignore)
  }, [])

  return { ready, error }
}
