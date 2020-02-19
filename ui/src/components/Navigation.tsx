import React, { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { logout, useAuthStore } from '../stores/authStore'

export const Navigation: FC = () => {
  const { currentUser } = useAuthStore()

  async function handleLogoutClick (
    event: MouseEvent<HTMLDivElement>
  ): Promise<void> {
    await logout()
  }

  return (
    <div className="navigation">
      <Link className="navigation__link" to="/">Startseite</Link>
      {currentUser === null ? (
        <>
          <Link className="navigation__link" to="/login">Login</Link>
          <div className="navigation__user">not logged in</div>
        </>
      ) : (
        <>
          <div className="navigation__link" onClick={handleLogoutClick}>
          Logout
          </div>
          <div className="navigation__user">{currentUser.username}</div>
        </>
      )}
    </div>
  )
}
