import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const token = localStorage.getItem('token');
  let isAuthenticated = false;
  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAuthenticated = true;
      userRole = decoded.role;
    } catch (error) {
      console.error('Token decoding failed:', error);
    }
  }

  // Check if authenticated and if userRole is among the allowed roles
  return isAuthenticated && roles.includes(userRole) ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default ProtectedRoute;
