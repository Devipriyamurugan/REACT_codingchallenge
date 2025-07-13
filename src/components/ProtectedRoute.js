import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token || token.split('.').length !== 3) {
    // Redirect to login if token is missing or invalid
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
