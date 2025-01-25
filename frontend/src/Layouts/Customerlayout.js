import { Navigate, Outlet, NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

function Customerlayout() {
    const customer = useSelector((state) => state.customer);

 
    const navLinkStyle = ({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "white" : "rgba(255, 255, 255, 0.7)",
        padding: "10px 15px",
        borderRadius: "8px",
        backgroundColor: isActive ? "rgba(255, 255, 255, 0.3)" : "transparent",
        display: "block",
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
                    justifyContent : "flex-start",
                    flexDirection: 'column',
                    overflow: 'hidden',
                    alignItems: 'center',
                }}>
                    <Box>
                        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                           {customer.firstname} {customer.lastname}
                        </Typography>


                        <Box sx={{ padding: "10px" }}>
                            <NavLink
                                to="/customer/profile"
                                style={navLinkStyle}
                            >
                                Profil
                            </NavLink>
                            <NavLink
                                to="/customer/orders"
                                style={navLinkStyle}
                            >
                                Bestellungen
                            </NavLink>
                            <NavLink
                                to="/customer/addresses"
                                style={navLinkStyle}
                            >
                                Adressen
                            </NavLink>
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
