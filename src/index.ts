import * as express from 'express'
import * as session from 'express-session'
import * as passport from 'passport'
import * as fileStore from 'session-file-store'
import { initPassport } from './passport'
import { routes } from './routes'
import { setupEnvironment } from './setupEnv'

setupEnvironment()

const port = 8000
const FileStore = fileStore(session)

const fileStoreOptions: fileStore.Options = {
  path: './storage/sessions'
}

const sessionSettings: session.SessionOptions = {
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new FileStore(fileStoreOptions),
  cookie: {
    sameSite: 'strict'
  }
}

initPassport()

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(session(sessionSettings))
app.use(passport.initialize())
app.use(passport.session())

routes(app)

app.listen(port, () => {
  console.log(`Server running on port ${port.toString()}`)
})
