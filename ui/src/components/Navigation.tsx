import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useCurrentUser } from '../modules/auth'

export const Navigation: FC = () => {
  const { currentUser } = useCurrentUser()

  return (
    <div className="navigation">
      <Link className="navigation__link" to="/">Startseite</Link>
      <Link className="navigation__link" to="/login">Login</Link>
      {currentUser === null ? (
        <div className="navigation__user">not logged in</div>
      ) : (
        <div className="navigation__user">{currentUser.username}</div>
      )}
    </div>
  )
}
