import React, { FC, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { loadCurrentUser } from './modules/auth'
import { Home } from './views/Home'
import { Login } from './views/Login'

export const App: FC = () => {
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    loadCurrentUser()
      .then(() => { setReady(true) })
      .catch((error) => { console.error(error) })
  }, [])

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
      ) : (
        <>
          <div>App wird geladen...</div>
        </>
      )}
    </div>
  )
}
