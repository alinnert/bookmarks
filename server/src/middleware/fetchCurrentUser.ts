import { BaseContext, Next } from 'koa'
import { getFullUserById } from '../data/userData'

export function fetchCurrentUser () {
  return async function fetchCurrentUser (
    ctx: BaseContext, next: Next
  ): Promise<void> {
    const user = getFullUserById(ctx.session.userId)
  
    if (user === undefined) {
      ctx.session = {}
      ctx.sessionHandler.regenerateId()
    } else {
      ctx.user = user
    }
  
    await next()
  }
}
