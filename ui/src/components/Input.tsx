import React, { FC } from 'react'
import { If } from './If'

interface InputProps {
  label: string
  type?: string
  id: string
  name: string
  value: string
  error?: string
  autocomplete?: string
  onChange(value: string): void
}

export const Input: FC<InputProps> = (
  {
    id, name, label, value, onChange, autocomplete,
    type = 'text', error = ''
  }
) => {
  return (
    <div className="input">
      <div className="input__description">
        <label htmlFor={id} className="input__label">{label}</label>
        <If condition={error !== ''}>
          <span className="input__error">{error}</span>
        </If>
      </div>
      <input
        type={type}
        value={value}
        id={id}
        name={name}
        onChange={e => onChange(e.currentTarget.value)}
        autoComplete={autocomplete}
      />
    </div>
  )
}
