import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import { authUser } from "../api/users";

function ProtectedBackendRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  const checkSession = async () => {
    try {
      const response = await authUser();
      if (response.status === 200) {
        dispatch(login(response.data));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, [location]);

  if (isLoading) {
    return <></>;
  }


  if (!isAuthenticated) {
    return <Navigate to="/backend/login" state={{ from: location }} replace />;
  }


  return <Outlet />;
}

export default ProtectedBackendRoutes;