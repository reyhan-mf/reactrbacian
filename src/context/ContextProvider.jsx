import { useEffect, useState } from 'react'
import Context from './context'

const ContextProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    return localStorage.getItem('userRole') || null
  })
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
  })

  useEffect(() => {
    if (role) {
      localStorage.setItem('userRole', role)
    } else {
      localStorage.removeItem('userRole')
    }
  }, [role])

  useEffect(() => {
    localStorage.setItem('isAuthenticated', authenticated.toString())
  }, [authenticated])

  const login = (newRole) => {
    setRole(newRole)
    setAuthenticated(true)
  }

  const logout = () => {
    setRole(null)
    setAuthenticated(false)
  }

  return (
    <Context.Provider value={{ role, authenticated, login, logout }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider