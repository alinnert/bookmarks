import React, { FC } from 'react'
import { Link } from 'react-router-dom'

export const Navigation: FC = () => {
  return (
    <div className="navigation">
      <Link to="/">Startseite</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}
