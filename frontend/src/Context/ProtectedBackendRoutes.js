import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function ProtectedBackendRoutes()
{
    return (
        <Outlet/>
    );
}

export default ProtectedBackendRoutes;