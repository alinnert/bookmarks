import React, { FC, useState, FormEvent } from 'react'
import { Input } from '../components/Input'
import { login } from '../modules/auth'

export const Login: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<{ [name: string]: string }>({})

  function handleSubmit (event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    const errors = {}

    if (email === '') {
      Object.assign(errors, { email: 'Bitte gib eine E-Mail-Adresse ein!' })
    }

    if (password.length < 3) {
      Object.assign(
        errors, { password: 'Das Passwort muss mind. 6 Zeichen lang sein' })
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }

    login(email, password).catch((error) => { console.error(error) })
  }

  return (
    <div className="login-view view">
      <form className="form" onSubmit={handleSubmit}>
        <Input
          id="email" name="email"
          label="E-Mail"
          value={email}
          autocomplete="username"
          onChange={setEmail}
          error={errors.email}
        />
        <Input
          id="password" name="password" type="password"
          label="Passwort"
          value={password}
          autocomplete="current-password"
          onChange={setPassword}
          error={errors.password}
        />
        <button type="submit">Einloggen</button>
      </form>
    </div>
  )
}
