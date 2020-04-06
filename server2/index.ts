import { createServer, IncomingMessage, ServerResponse } from 'http'

type Middleware = (req: IncomingMessage, res: ServerResponse) => void

interface ServerError {
  status: number
  message?: string
}

function serverError (
  status: ServerError['status'],
  message?: ServerError['message']
): ServerError {
  return <ServerError>{ status, message }
}


function initServer () {
  const server = createServer((req, res) => {
    function handleError (error: ServerError): void {
      const response: Record<string, unknown> = {
        status: 'error',
        message: error.message
      }
      
      res.statusCode = error.status ?? 500
      res.write(JSON.stringify(response))
    }

    for (const mw of middlewares) {
      try {
        mw(req, res)
      } catch (e) {
        const error = e as ServerError
        handleError(error)
        res.end()
        break
      }
    }
  })

  const middlewares: Middleware[] = []

  return {
    use (middleware: Middleware) {
      middlewares.push(middleware)
    },

    start (port: number) {
      server.listen(port, () => {
        console.log(`Server running on port ${port}`)
      })
    }
  }
}

const app = initServer()

app.use((req, res) => {
  res.setHeader('Content-Type', 'application/json')
})

app.use((req, res) => {
  if (req.url === '/error') {
    throw serverError(404, 'nix gibs!')
  }
  if (req.url === '/no') {
    throw serverError(403)
  }
})

app.use((req, res) => {
  res.write('henlo!')
  res.end()
})

app.start(8000)
