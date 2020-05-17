import * as express from 'express'
import * as session from 'express-session'

type ConfigureApp = (app: express.Express) => void

export const configureApp: ConfigureApp = app => {
  app.use(express.json())

  app.use((req, res, next) => {
    res.header('Content-Type', 'application/json')
    next()
  })

  app.use(session({
    secret: 'pwoeifjwijfpojiwefpoi'
  }))
}
