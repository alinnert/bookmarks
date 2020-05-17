import * as express from 'express'

interface User { username: string }
interface SessionStore { user: User }

type GetSessionValue =
  <K extends keyof SessionStore, V extends SessionStore[K]>
  (req: express.Request, key: K) => V | null

export const getSessionValue: GetSessionValue =
  (req, key) => req.session?.[key] ?? null
