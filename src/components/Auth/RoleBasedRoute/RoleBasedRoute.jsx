import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../AuthContext/AuthContext"

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, userRole, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" />
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />
  }

  return children
}

export default RoleBasedRoute
