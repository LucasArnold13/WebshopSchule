import React, { useState, useEffect} from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";




function ProtectedCustomerRoutes() {
  const [sessionExists, setSessionExists] = useState(false);
  const checkSession = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/frontend/auth', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setSessionExists(true); // Session existiert
        console.log("Authentifzierung wird durchgeführt")



      } else {
        console.log('nicht eingeloggt');
        setSessionExists(false); // Keine Session
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen der Session:', error);
    } finally {
    }
  };


  useEffect(() => {
    checkSession();
  });


  const location = useLocation();

  if (!sessionExists){
    return <Navigate to="/customer/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedCustomerRoutes;



