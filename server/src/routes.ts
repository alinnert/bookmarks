import * as Router from '@koa/router'
import { indexRouter } from './routes/indexRouter'
import { authRouter } from './routes/authRouter'
import { groupsRouter } from './routes/groupsRouter'

const router = new Router()

function addRouter (base: Router, name: string, subRouter: Router) {
  base.use(name, subRouter.routes(), subRouter.allowedMethods())
}

addRouter(router, '/api', indexRouter)
addRouter(router, '/api/auth', authRouter)
addRouter(router, '/api/groups', groupsRouter)
// addRouter(router, '/api/links', linksRouter)

export { router }
