import { ErrorRequestHandler } from 'express'

interface ResultObject {
  status: number
  message: string
  details?: string | string[]
}

const errorMessages: Record<number, string> = {
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  500: 'Server error'
}

export class ApplicationError extends Error {
  status: number
  details?: string | string[]

  constructor (status: number, details?: string | string[]) {
    super(errorMessages[status])
    this.status = status
    this.details = details
  }
}

export const handleErrors: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    const resultObject: ResultObject = {
      status: err.status,
      message: errorMessages[err.status]
    }

    if (err.details !== undefined) {
      resultObject.details = err.details
    }

    res.status(err.status).send(resultObject)
    return
  }

  const resultObject: ResultObject = {
    status: 500,
    message: 'Unknown server error occurred',
    details: err
  }

  res.status(resultObject.status).send(resultObject)
}
