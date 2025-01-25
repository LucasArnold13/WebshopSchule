import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


function ProtectedFrontendRoutes() {
  const customer = useSelector((state) => state.customer);
  const location = useLocation();





  if (customer.isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;


}

export default ProtectedFrontendRoutes;
