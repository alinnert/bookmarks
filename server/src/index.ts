import * as express from 'express'
import { configureApp } from './configure'
import { setupRoutes } from './routes'
import { handleErrors } from './errors'

const port = 3000
const app = express()

configureApp(app)
setupRoutes(app)
app.use(handleErrors)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${String(port)}`)
})
