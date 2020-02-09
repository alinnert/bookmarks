import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { If } from './components/If'
import { Navigation } from './components/Navigation'
import { Home } from './views/Home'
import { Login } from './views/Login'

export const App: FC = () => {
  return (
    <div className="App">
      <If condition={false}>
        <div>App wird geladen...</div>
      </If>
      <If condition={true}>
        <Navigation/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </If>
    </div>
  )
}
