import React from 'react'
import {Navigate} from 'react-router-dom'
import {useData} from './ApiContext'
import { toast, ToastContainer } from 'react-toastify'
const ProtectedRoute = ({ children }) => {
    const {isAuthenticated} = useData()
    if (!isAuthenticated) {
        // Redirect to login page if not authenticated
          return <Navigate to="/" replace />;
      }
  return children;
  
}

export default ProtectedRoute
