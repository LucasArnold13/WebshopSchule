import React from 'react';
import { Typography,Box, Divider, Avatar } from '@mui/material';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { data, NavLink, useParams, useNavigate } from "react-router-dom";

export function CustomerBox({customer, children}) {
    const navigate = useNavigate();
    return (
        <Box sx={{
            flex: 2,
            overflow: "auto",
            height: "400px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid grey",
        }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", padding: 1, paddingLeft: 2 }}>
                Kunde
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Box
              onClick={() => { window.open("/backend/customers/" + customer?.id, "_blank") }}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: 2,
                    cursor: "pointer",
                    "&:hover": {
                        color: "rgba(22, 139, 248, 0.9)"
                    },
                }}
            >

                {/* Avatar und Name */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <Avatar
                        sx={{ width: 50, height: 50, marginRight: 2 }}
                    />
                    <Typography>
                        {customer?.firstname} {customer?.lastname}
                    </Typography>
                </Box>
                <Box sx={{ marginLeft: 2 }}>
                    <ArrowForwardIosIcon />
                </Box>

            </Box>
            <Divider sx={{ marginTop: 2 }} />
            <Box
                sx={{
                    paddingLeft: 2,
                    paddingTop: 1
                }}
            >
                <Typography variant="h8" sx={{ padding: 1, fontWeight: "bold" }}>
                    Kontaktinfo
                </Typography>
                <Typography variant="subtitle1" sx={{ padding: 1 }}>
                    {customer?.email}
                </Typography>
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <Box sx={{ paddingLeft: 2, display: 'flex', flexDirection: "column", justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
                    Lieferadresse
                </Typography>

                {children}

            </Box>

        </Box>
    )
}

export default CustomerBox;