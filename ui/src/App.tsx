import React, { FC, useEffect, useState } from 'react'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { loadCurrentUser, useCurrentUser } from './modules/auth'
import { Home } from './views/Home'
import { Login } from './views/Login'

export const App: FC = () => {
  useAuthRedirects()
  const { error, ready } = useInit()

  const errorContent = <div>Oops! An error occured while loading the app.</div>

  const loadingContent = <div>Loading...</div>

  const appContent = <>
    <Navigation/>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </>

  return (
    <div className="App">
      {ready ? appContent : error ? errorContent : loadingContent}
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

function useAuthRedirects (): void {
  const location = useLocation()
  const history = useHistory()
  const { currentUser } = useCurrentUser()

  useEffect((): void => {
    if (location.pathname === '/login' && currentUser !== null) {
      history.replace('/')
      return
    }

    if (location.pathname !== '/login' && currentUser === null) {
      history.replace('/login')
    }
  })
}
