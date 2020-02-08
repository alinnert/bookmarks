import React, { FC } from 'react'

interface IfProps {
  condition: boolean
}

export const If: FC<IfProps> = ({ condition, children }) => {
  return condition ? <>{children}</> : null
}
