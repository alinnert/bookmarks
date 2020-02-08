import React, { FC, useState, FormEvent } from 'react'
import { Input } from '../components/Input'

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

    if (password.length < 6) {
      Object.assign(
        errors, { password: 'Das Passwort muss mind. 6 Zeichen lang sein' })
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }
    console.log(`${email} / ${password}`)
  }

  return (
    <div className="login-view">
      <form onSubmit={handleSubmit}>
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
