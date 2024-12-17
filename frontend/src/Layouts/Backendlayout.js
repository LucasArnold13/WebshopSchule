import { Box, Input, TextField, Typography } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";

function BackendLayout() {

    const navLinkStyle = ({ isActive }) => ({
        textDecoration: "none",
        padding: "10px 15px",
        borderRadius: "8px",
        width : "100%",
        boxSizing: "border-box",
        color: 'black',
       backgroundColor: isActive ? "rgba(45, 89, 235, 0.3)" : "transparent",
        display: "block",
        transition: "background-color 0.3s ease", // Optional: weicher Übergang
        "&:hover": {
            backgroundColor: "rgba(45, 89, 235, 0.8) !important", // Müll
        },
    });

    return (
        <Box sx={{ display: 'flex', backgroundColor : "#f0f0f0" }}>
            <Box sx={{
                flex: 2,
             //  backgroundColor: "green",
                paddingTop :"50px",
                height: "100vh", // Volle Bildschirmhöhe
                flexDirection: "column", 
            }}>
                <Box sx={{
                    height : "300px",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    alignItems: 'center',
                    flexDirection: "column", // Elemente vertikal stapeln
                    display: "flex",
                    margin: "10px"
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
                        to="/backend/users"
                        style={navLinkStyle}
                    >
                        Users
                    </NavLink>
                </Box>

            </Box>
            <Box sx={{ flex: 12,  display: "flex", flexDirection: "column" }} >
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    padding: 2,
                    boxSizing: "border-box"
                }}>
                    <TextField label="Suche" />
                    <Typography sx={{ marginRight: 2 }}>Bell</Typography>
                    <Typography sx={{ marginRight: 2 }}>Profileavatar</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );

}

export default BackendLayout; 