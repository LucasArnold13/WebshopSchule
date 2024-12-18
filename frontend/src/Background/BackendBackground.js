import { Box } from "@mui/material";
import {Outlet } from "react-router-dom";

function BackendBackground()
{
    return (
        <Box sx={{   height: '100vh', backgroundColor : "#f0f0f0", display: 'flex'}}>
              <Outlet />
        </Box>
    )
}

export default BackendBackground;
