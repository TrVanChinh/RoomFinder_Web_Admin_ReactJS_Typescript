import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

export const PrivateRoute = () => {
  const token = useSelector((state: AppState) => state.account.token);

  // Xác định isAuthenticated dựa trên sự tồn tại của token
  return token ? <Outlet /> : <Navigate to="/login" />;
};





