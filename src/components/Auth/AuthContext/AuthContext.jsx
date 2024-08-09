import React, { createContext, useState, useContext, useEffect } from "react"
import { fetchWithToken } from "../../../../api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchUtente()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUtente = async () => {
    try {
      const user = await fetchWithToken("/utente/me")
      setUser(user)
      setUserRole(user.role)
      setIsAuthenticated(true)
    } catch (error) {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setUserRole(null)
    setUser(null)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, user, loading, logout }}>{children}</AuthContext.Provider>
  )
}
