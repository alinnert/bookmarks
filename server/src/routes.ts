import * as express from 'express'
import { handleGetError, handleGetIndex } from './handlers'
import { handlePostLogin } from './handlers/auth/login'
import { handlePostLogout } from './handlers/auth/logout'

type SetupRoutes = (app: express.Express) => void

export const setupRoutes: SetupRoutes = app => {
  app.get('/', handleGetIndex)
  app.get('/error', handleGetError)
  app.post('/auth/login', handlePostLogin)
  app.post('/auth/logout', handlePostLogout)
}
