import * as Koa from 'koa'
import { getFullUserById } from "../data/userData";

export async function fetchCurrentUser (ctx: Koa.BaseContext, next: Koa.Next) {
  const user = getFullUserById(ctx.session.userId)

  if (user === undefined) {
    ctx.session = {}
    ctx.sessionHandler.regenerateId()
  } else {
    ctx.user = user
  }

  await next()
}