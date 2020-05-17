import { Next, ParameterizedContext } from 'koa'
import { User } from '../schema'

interface ApplicationState {
  session: { userId?: string }
  sessionHandler: { regenerateId (): void }
  user: User
}

export async function isAuthenticated (
  ctx: ParameterizedContext<ApplicationState>,
  next: Next
): Promise<void> {
  if (!ctx.state.user) { ctx.throw(401) }
  await next()
}
