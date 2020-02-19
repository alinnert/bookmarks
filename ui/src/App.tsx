import React, { FC, useEffect, useState } from 'react'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { loadCurrentUser, useCurrentUser } from './modules/auth'
import { Home } from './views/Home'
import { Login } from './views/Login'

export const App: FC = () => {
  const { error, ready } = useInit()
  useAuthRedirects(ready)

  return (
    <div className="App">
      {ready ? (
        <>
          <Navigation/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </>
      ) : error ? (
        <div>Oops! An error occured while loading the app.</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

function useInit (): { ready: boolean, error: boolean } {
  const [ready, setReady] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    loadCurrentUser()
      .then(() => { setReady(true) })
      .catch((error) => {
        setError(true)
        console.error(error)
      })
  }, [])

  return { ready, error }
}

function useAuthRedirects (ready: boolean): void {
  const location = useLocation()
  const history = useHistory()
  const { currentUser } = useCurrentUser()

  useEffect((): void => {
    if (!ready) { return }

    if (location.pathname === '/login' && currentUser !== null) {
      history.replace('/')
      return
    }

    if (location.pathname !== '/login' && currentUser === null) {
      history.replace('/login')
    }
  })
}
