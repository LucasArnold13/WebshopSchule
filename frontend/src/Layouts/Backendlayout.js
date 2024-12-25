import { Box, Input, TextField, Typography } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

function BackendLayout() {

    const navLinkStyle = ({ isActive }) => ({
        textDecoration: "none",
        borderRadius: "8px",
        width: "100%",
        fontSize: '1.5rem', // Schriftgröße anpassen
        display: 'flex',
        justifyContent: 'center',
        boxSizing: "border-box",
        padding: "10px",
        textaling: "center",
        color: 'black',
        backgroundColor: isActive ? "rgba(45, 89, 235, 0.3)" : "transparent",
        transition: "background-color 0.3s ease",
    });

    return (
        <>
            <Box sx={{
                flex: 2,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: "white",
                paddingTop : "50px",
                boxShadow: "10px 0 10px -5px rgba(0, 0, 0, 0.3)",
                borderRight: "1px black",
                minHeight: "100vh",
            }}>
                <NavLink
                    to="/backend/dashboard"
                    style={navLinkStyle}

                >
                    Dashboard

                </NavLink>
                <NavLink
                    to="/backend/customers"
                    style={navLinkStyle}
                    textAlign="center"
                >
                    Kunden
                </NavLink>
                <NavLink
                    to="/backend/orders"
                    style={navLinkStyle}
                >
                    Bestellungen
                </NavLink>
                <NavLink
                    to="/backend/products"
                    style={navLinkStyle}
                >
                    Produkte
                </NavLink>
                <NavLink
                    to="/backend/categories"
                    style={navLinkStyle}
                >
                    Kategorien
                </NavLink>
                <NavLink
                    to="/backend/users"
                    style={navLinkStyle}
                >
                    Benutzer
                </NavLink>
            </Box>
            <Box sx={{ flex: 12 }}>
                <Box sx={{
                    height: "50px", 
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    padding: 2,
                    boxSizing: "border-box",
                }}>
                    <NotificationsIcon />
                    <AccountCircleIcon />
                </Box>
                <Box >
                    <Outlet />
                </Box>
            </Box>
        </>

    );

}


/*
   <Box sx={{
                flex: 2,
                paddingTop: "50px",
                flexDirection: "column",
            }}>
                <Box sx={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    flexDirection: "column", // Elemente vertikal stapeln
                    display: "flex",
                    margin: "10px",
                    Fontsize : "48px",
                }}>
                  
                </Box>

            </Box>
            <Box sx={{ flex: 12, display: "flex", flexDirection: "column" }} >
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    padding: 2,
                    boxSizing: "border-box"
                }}>
                    <NotificationsIcon/> 
                    <AccountCircleIcon/> 
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Outlet />
                </Box>
            </Box>
        </>

*/

export default BackendLayout; 