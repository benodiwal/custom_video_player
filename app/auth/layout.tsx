import React from 'react'
import AuthContext from '../../context/AuthContext'

interface LayoutProps {
    children : React.ReactNode
}

const layout = ({children} : LayoutProps) => {
  return (
    <AuthContext>
        {children}
    </AuthContext>
  )
}

export default layout