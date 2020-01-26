import * as express from 'express'

export function isAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.user) return next()
  res.status(403).send('not logged in')
}