import * as express from 'express'
import * as passport from 'passport'

const router = express.Router()
export { router as authRouter }

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ status: 'ok' })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.json({ status: 'ok' })
})
