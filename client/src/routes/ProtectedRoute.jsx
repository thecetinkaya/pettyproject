import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "../features/auth/authSlice";

const ProtectedRoute = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/user-login" replace />;
  }

  // Token varsa ama geçersizse kontrolü
  (async () => {
    try {
      await authService.getCurrentUser();
    } catch (error) {
      authService.logout();
      window.location.href = "/user-login";
    }
  })();

  return <Outlet />;
};

export default ProtectedRoute;
