import * as Router from '@koa/router'
import { getFullUserById } from '../data/userData'

const router = new Router()
export { router as indexRouter }

router.get('/', ctx => {
  const currentUser = ctx.session !== null
    ? getFullUserById(ctx.session.userId)
    : undefined
  
  ctx.response.body = {
    api: 'bookmark server',
    version: '1.0.0',
    status: 'ok',
    currentUser
  }
})
