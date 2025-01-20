import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";

function ProtectedBackendRoutes()
{
    const [isAuthenticated, setIsAuthenticated] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const dispatch = useDispatch();
  
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/backend/auth", {
          method: "GET",
          credentials: "include", 
        });
        
        if (response.ok) {
          const data = await response.json();
          dispatch(login(data));
          setIsAuthenticated(true); 
        } else {
          console.error("Fehler bei der API-Anfrage:", response.statusText);
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
      console.log("so oft wird die Komponente neu gerendert");
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