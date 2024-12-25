import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function ProtectedFrontendRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/frontend/auth", {
        method: "GET",
        credentials: "include", 
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true); 
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Fehler beim Überprüfen der Session:", error);
      setIsAuthenticated(false); 
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    checkSession(); 
  }, []);

console.log("so oft wird die Komponente neu gerendert")
  if (isLoading) {
    return <></>;
  }


  if (!isAuthenticated) {
    localStorage.setItem("isLoggedIn", "false");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  localStorage.setItem("isLoggedIn", "true");
  return <Outlet />;
}

export default ProtectedFrontendRoutes;
