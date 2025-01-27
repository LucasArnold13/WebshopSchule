import { Navigate, Outlet, NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

function Customerlayout() {
    const customer = useSelector((state) => state.customer);
    const navLinks = [
        { to: "/customer/profile", label: "Profil" },
        { to: "/customer/orders", label: "Bestellungen" },
    ];

    const navLinkStyle = ({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "white" : "rgba(255, 255, 255, 0.7)",
        padding: "10px 15px",
        borderRadius: "8px",
        justifyContent: "center",
        display : "flex",
        backgroundColor: isActive ? "rgba(255, 255, 255, 0.3)" : "transparent",
    });
    useEffect(() => {

    });

    return (
        <Box sx={{
            display: 'flex',
            backgroundColor: "transparent"
        }}>
            <Box sx={{
                flex: 1,
                background: "transparent",
                height: "100vh",
                display: 'flex',
                borderRight: 1,
                borderColor: 'divider',
                justifyContent: "flex-start",
                flexDirection: 'column',
                overflow: 'hidden',
                alignItems: 'center',

            }}>
                <Box sx={{  }}>
                    <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                        {customer.firstname} {customer.lastname}
                    </Typography>


                    <Box sx={{ padding: "10px" }}>
                    {navLinks.map((link) => (
                    <Box key={link.to} sx={{ '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.3)",  borderRadius: "8px", } }}>
                        <NavLink to={link.to} style={({ isActive }) => navLinkStyle({ isActive })}>
                            {link.label}
                        </NavLink>
                    </Box>
                ))}
                    </Box>

                </Box>
            </Box>

            <Box sx={{
                flex: 4,
            }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Customerlayout;
