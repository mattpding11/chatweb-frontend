import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = sessionStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;