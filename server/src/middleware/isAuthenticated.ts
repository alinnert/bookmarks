import { BaseContext, Next } from 'koa'

export async function isAuthenticated (
  ctx: BaseContext, next: Next
): Promise<void> {
  if (!ctx.user) { ctx.throw(401) }
  await next()
}
