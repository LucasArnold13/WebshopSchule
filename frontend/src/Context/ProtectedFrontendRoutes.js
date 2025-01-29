import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { authCustomer } from "../api/customers";

function ProtectedFrontendRoutes() {
  const customer = useSelector((state) => state.customer);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = async () => {
    try {
      const response = await authCustomer();
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    checkSession();
  },);
  if (isLoading) {
    return <></>;
  }

  if (!isAuthenticated) {
    window.dispatchEvent(
      new CustomEvent("snackbar", {
          detail: { message: "Logge dich bitte ein um fortzufahren", severity: "info" },
      })
  );
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;



}

export default ProtectedFrontendRoutes;
