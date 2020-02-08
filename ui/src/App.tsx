import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from './views/Home'
import { Login } from './views/Login'
import { Navigation } from './components/Navigation'

export const App: FC = () => {
  return (
    <div className="App">
      <Navigation/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </div>
  )
}
