import * as cors from '@koa/cors'
import * as Koa from 'koa'
import * as koaBody from 'koa-body'
import * as compress from 'koa-compress'
import * as session from 'koa-session'
import { fetchCurrentUser } from './middleware/fetchCurrentUser'
import { router } from './routes'
import { User } from './schema'
import { setupEnvironment } from './setupEnv'

setupEnvironment()

interface ApplicationState {
  session: { userId?: string }
  sessionHandler: { regenerateId (): void }
  user: User
}

const app = new Koa<ApplicationState>()

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
  key: 'SID'
}, app as Koa))
app.use(fetchCurrentUser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8000)
