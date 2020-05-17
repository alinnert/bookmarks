import { RequestHandler } from 'express'
import { ApplicationError } from '../errors'

export const handleGetIndex: RequestHandler = (req, res) => {
  res.send({ message: 'henlo' })
}

export const handleGetError: RequestHandler = (req, res, next) => {
  throw new ApplicationError(401, 'hui')
}
