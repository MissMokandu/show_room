import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <AuthModal />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Role not authorized
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
