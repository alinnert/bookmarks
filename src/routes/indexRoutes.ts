import * as express from 'express'
import { User } from "../schema"

const router = express.Router()
export { router as indexRouter }

router.get('/', (req, res) => {
  const currentUser = req.user as User

  res.json({
    api: 'bookmark server',
    version: '1.0.0',
    status: 'ok',
    currentUser
  })
})