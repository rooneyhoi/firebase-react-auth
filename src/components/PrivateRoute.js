import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  // determine if authorized, from context or however you're doing it
  const { currentUser } = useAuth()

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;