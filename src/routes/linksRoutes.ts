import * as express from 'express'
import { getGroupsByIds } from '../data/groupsData'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { User } from '../schema'

const router = express.Router()
export { router as linksRouter }