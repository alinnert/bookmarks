import { RequestHandler } from 'express'
import { getSessionValue } from '../session'

type IsAuthenticated = () => RequestHandler

export const isAuthenticated: IsAuthenticated = () => {
  return (req, res, next) => {
    const user = getSessionValue(req, 'user')
    
  }
}
