import React, { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { useCurrentUser, logout } from '../modules/auth'
import { If } from './If'

export const Navigation: FC = () => {
  const { currentUser } = useCurrentUser()

  async function handleLogoutClick (
    event: MouseEvent<HTMLDivElement>
  ): Promise<void> {
    await logout()
  }

  return (
    <div className="navigation">
      <Link className="navigation__link" to="/">Startseite</Link>
      <If condition={currentUser === null}>
        <Link className="navigation__link" to="/login">Login</Link>
      </If>
      <If condition={currentUser !== null}>
        <div className="navigation__link" onClick={handleLogoutClick}>
          Logout
        </div>
      </If>
      {currentUser === null ? (
        <div className="navigation__user">not logged in</div>
      ) : (
        <div className="navigation__user">{currentUser.username}</div>
      )}
    </div>
  )
}
