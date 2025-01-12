import { Box, Input, TextField, Typography } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

function BackendLayout() {

    const navLinks = [
        { to: "/backend/dashboard", label: "Dashboard" },
        { to: "/backend/customers", label: "Kunden" },
        { to: "/backend/orders", label: "Bestellungen" },
        { to: "/backend/products", label: "Produkte" },
        { to: "/backend/categories", label: "Kategorien" },
        { to: "/backend/users", label: "Benutzer" }
    ];

    const navLinkStyle = ({ isActive }) => ({
        textDecoration: "none",
        borderRadius: "8px",
        width: "100%",
        fontSize: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: "border-box",
        padding: "10px",
        textAlign: "center",
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
                paddingTop: "50px",
                boxShadow: "10px 0 10px -5px rgba(0, 0, 0, 0.3)",
                borderRight: "1px solid black",
            }}>
                {navLinks.map((link) => (
                    <Box key={link.to} sx={{ '&:hover': { backgroundColor: "rgba(45, 89, 235, 0.1)" } }}>
                        <NavLink to={link.to} style={({ isActive }) => navLinkStyle({ isActive })}>
                            {link.label}
                        </NavLink>
                    </Box>
                ))}
            </Box>
            <Box sx={{ flex: 12 }}>
                <Box sx={{
                    height: "5vh",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    padding: 2,
                  
                    boxSizing: "border-box",
                }}>
                    <AccountCircleIcon sx={{ fontSize: 25 }} />

                </Box>
                <Box sx={{ height: "95vh", display: "flex", flexDirection: "column", padding: "15px", boxSizing: "border-box" }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}




export default BackendLayout; 