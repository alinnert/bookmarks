import * as bcrypt from 'bcryptjs'
import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { getFullUserById, getUserByUsername } from './data/userData'
import { ShortId, User } from './schema'

export function initPassport () {
  passport.serializeUser((user: User, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id: ShortId, done) => {
    const user = getFullUserById(id)
    if (user === undefined) { done('user not found') }
    done(null, user)
  })

  const localStrategy = new LocalStrategy(
    (username, password, done) => {
      const user = getUserByUsername(username, true)
      if (user === undefined) { return done('user not found') }

      const passwordsMatch = bcrypt.compareSync(password, user.password)
      if (!passwordsMatch) { return done('wrong password') }

      done(null, user)
    }
  )

  passport.use(localStrategy)
}
