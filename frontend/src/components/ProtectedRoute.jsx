import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authcontext'; // adjust path if needed

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isLoggedIn } = useContext(AuthContext);
  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If role is not allowed, redirect to home
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected content
  return children;
};

export default ProtectedRoute;
