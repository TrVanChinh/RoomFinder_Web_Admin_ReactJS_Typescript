import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../store';



export const AccountRoute: React.FC = () => {
  
  const token = useSelector((state: AppState) => state.account.token);
    
  // Xác định isAuthenticated dựa trên sự tồn tại của token
  const isAuthenticated = !!token;
  return isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />;
};

