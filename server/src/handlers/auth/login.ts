import { RequestHandler } from 'express'
import { check, validationResult } from 'express-validator'
import { ApplicationError } from '../../errors'
import { users } from '../../dummyData'
import { compareSync } from 'bcryptjs'

interface RequestUser {
  username: string
  password: string
}

export const handlePostLogin: RequestHandler[] = [
  check('username').isEmail(),
  check('password').isLength({ min: 3 }),

  (req, res) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      throw new ApplicationError(401, [
        'Validation errors occurred:',
        ...validationErrors.array().map(error => error.msg)
      ])
    }

    const requestUser: RequestUser = req.body
    const dbUser = users.find(user => user.username === requestUser.username)
    if (dbUser === undefined) {
      throw new ApplicationError(401, 'User not found')
    }

    const passwordsMatch = compareSync(requestUser.password, dbUser.password)
    if (!passwordsMatch) {
      throw new ApplicationError(401, 'Passwords do not match')
    }

    res.send('logged in! \\öö/')
  }
]
