import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


function ProtectedFrontendRoutes() {
  const customer = useSelector((state) => state.customer);
  const location = useLocation();



  return <Outlet />;
  console.log(customer.isAuthenticated);
  if (customer.isAuthenticated) {

  }
  return <Navigate to="/login" state={{ from: location }} replace />;


}

export default ProtectedFrontendRoutes;
