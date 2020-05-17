import { Next, ParameterizedContext } from 'koa'
import { getFullUserById } from '../data/userData'
import { User } from '../schema'

interface ApplicationState {
  session: { userId?: string }
  sessionHandler: { regenerateId (): void }
  user: User
}

export function fetchCurrentUser () {
  return async function fetchCurrentUserMiddleware (
    ctx: ParameterizedContext<ApplicationState>,
    next: Next
  ): Promise<void> {
    const user = getFullUserById(ctx.state.session.userId as string)

    if (user === undefined) {
      ctx.state.session = {}
      ctx.state.sessionHandler.regenerateId()
    } else {
      ctx.state.user = user
    }

    await next()
  }
}
