import React from "react";
import {Box } from '@mui/material';
import {Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Background({ children })
{
    return (
    <Box
        sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #8e44ad, #3498db)',
        }}>
        <Navbar/>
        <main>
            <Outlet />
        </main>
    </Box>
    ); 
}

export default Background; 