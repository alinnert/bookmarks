import React, { FC, useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { If } from './components/If'
import { Navigation } from './components/Navigation'
import { Home } from './views/Home'
import { Login } from './views/Login'
import { loadCurrentUser } from './modules/auth'

export const App: FC = () => {
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    loadCurrentUser()
      .then(() => { setReady(true) })
      .catch((error) => { console.error(error) })
  }, [])

  return (
    <div className="App">
      <If condition={!ready}>
        <div>App wird geladen...</div>
      </If>
      <If condition={ready}>
        <Navigation/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </If>
    </div>
  )
}
