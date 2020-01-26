import * as express from 'express'
import { getGroupsByIds } from '../data/groupsData'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { User } from '../schema'

const router = express.Router()
export { router as groupsRouter }

router.get('/', isAuthenticated, (req, res) => {
  const currentUser = (req.user as User)
  const groupIds = currentUser.groups
  const groups = getGroupsByIds(groupIds)

  res.json(groups)
})

router.post('/', isAuthenticated, (req, res) => {
  
})
