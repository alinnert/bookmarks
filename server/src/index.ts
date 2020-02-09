import * as Koa from 'koa'
import * as koaBody from 'koa-body'
import * as compress from 'koa-compress'
import * as session from 'koa-session-minimal'
import * as SQLite3Store from 'koa-sqlite3-session'
import * as cors from '@koa/cors'
import { router } from './routes'
import { setupEnvironment } from './setupEnv'
import { fetchCurrentUser } from './middleware/fetchCurrentUser'

setupEnvironment()

const app = new Koa()

app.use(compress())
app.use(koaBody())
app.use(cors({
  origin: (ctx: Koa.Context) => {
    const devOrigin = 'http://localhost:3000'
    if (ctx.request.get('origin') === devOrigin) { return devOrigin }
    return ''
  },
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Accept'],
  credentials: true,
  keepHeadersOnError: true
}))
app.use(session({
  key: 'SID',
  store: new SQLite3Store('./storage/sessions.db')
}))
app.use(fetchCurrentUser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8000)
