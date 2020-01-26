import { Express } from 'express'
import { indexRouter } from './routes/indexRoutes'
import { authRouter } from './routes/authRoutes'
import { groupsRouter } from './routes/groupsRoutes'
import { linksRouter } from './routes/linksRoutes'

export function routes(app: Express) {
  app.use('/api', indexRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/groups', groupsRouter)
  app.use('/api/links', linksRouter)
}
