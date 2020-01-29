export async function isAuthenticated (ctx, next) {
  if (!ctx.user) { ctx.throw(401) }
  await next()
}
