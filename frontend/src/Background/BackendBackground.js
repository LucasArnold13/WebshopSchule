import { Box } from "@mui/material";
import {Outlet } from "react-router-dom";

function BackendBackground()
{
    return (
        <Box sx={{ backgroundColor : "#f0f0f0", display: 'flex', height : "100vh"}}>
              <Outlet />
        </Box>
    )
}

export default BackendBackground;
