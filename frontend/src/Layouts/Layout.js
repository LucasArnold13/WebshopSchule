import React from "react";
import { Box, Typography } from '@mui/material';
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import  { customerLogin } from '../store/slices/customerSlice';
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
      });
    


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