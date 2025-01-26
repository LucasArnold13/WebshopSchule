import React from "react";
import { Box } from '@mui/material';
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import { customerLogin } from '../store/slices/customerSlice';
import { authCustomer } from "../api/customers";
import { useDispatch } from "react-redux";

function Background() {
    const dispatch = useDispatch();
    
    const checkSession = async () => {
        const response = await authCustomer();
        if (response.status === 200) {
          dispatch(customerLogin(response.data));
        }
    }

    useEffect(() => {
        checkSession();
    }, [dispatch]); // Füge dispatch als Abhängigkeit hinzu

    return (
        <Box
            sx={{
                minHeight: '100vh', // Mindesthöhe des Containers
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(to right, #8e44ad, #3498db)',
            }}
        >
            {/* Fixierte Navbar */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 1000, // Stelle sicher, dass die Navbar über anderen Inhalten liegt
                }}
            >
                <Navbar />
            </Box>

            {/* Hauptinhalt (Outlet) mit fester Mindesthöhe */}
            <Box
                sx={{
                    flexGrow: 1, // Nimmt den verfügbaren Platz ein
                    marginTop: '72px', // Platz für die Navbar (Höhe anpassen)
                    minHeight: 'calc(100vh - 72px)', // Mindesthöhe: 100vh minus Navbar-Höhe
                    overflowY: 'auto', // Scrollbar für den Hauptinhalt
                }}
            >
                <Outlet />
            </Box>

            {/* Footer unter dem Hauptinhalt */}
            <Box
                sx={{
                    width: '100%',
                    marginTop: '32px', // Abstand nach oben
                }}
            >
                <Footer />
            </Box>
        </Box>
    );
}

export default Background;