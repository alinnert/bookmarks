import * as Router from '@koa/router'
import * as bcrypt from 'bcryptjs'
import { getFullUserByUsername } from '../data/userData'
import { User } from '../schema'
import { isAuthenticated } from '../middleware/isAuthenticated'

const router = new Router()
export { router as authRouter }

router.get('/info', isAuthenticated, ctx => {
  ctx.response.body = {
    username: ctx.user.username
  }
})

router.post('/login', ctx => {
  interface body {
    username: string
    password: string
  }

  const { username, password }: body = ctx.request.body

  const user = getFullUserByUsername(username)
  ctx.assert(user, 401)

  const safeUser = user as User
  const passwordsMatch = bcrypt.compareSync(password, safeUser.password)
  ctx.assert(passwordsMatch, 401)

  ctx.state.sessionHandler.regenerateId()
  ctx.state.session.userId = safeUser.id
  ctx.response.body = { status: 'ok', user: { username } }
})

router.post('/logout', ctx => {
  ctx.state.session = {}
  ctx.response.body = { status: 'ok' }
})
