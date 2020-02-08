import * as Router from '@koa/router'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { getUserById } from '../data/userData'
import { getGroupsByIds } from '../data/groupsData'
import { User } from '../schema'

const router = new Router()
export { router as groupsRouter }

router.get('/', isAuthenticated, ctx => {
  const currentUser = getUserById(ctx.session.userId) as User
  const groups = getGroupsByIds(currentUser.groups)

  ctx.response.body = groups
})