import React from "react";
import { Box, Typography } from '@mui/material';
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Background() {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(to right, #8e44ad, #3498db)',
            }}>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 10, // Damit die Navbar über anderen Elementen bleibt
                }}
            >
                <Navbar />
            </Box>
            <Box
                sx={{
                    marginTop: '64px', // Platz für die Navbar (Höhe anpassen)
                    flexGrow: 1,
                    height: "1000px",
                    overflowY: 'auto', // Scrollbar für den Hauptinhalt
                }}
            >
                <Outlet />
                <Footer />
            </Box>

        </Box>

    );
}

export default Background; 