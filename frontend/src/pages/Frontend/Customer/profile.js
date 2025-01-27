import { Typography, Box, Divider, useTheme, Container, TextField } from "@mui/material";
import { fetchCustomerFrontend } from "../../../api/customers";
import { useEffect, useState } from "react";
import LoadingCircle from "../../../Components/Feedback/LoadingCricle";

function Profile() {
    const theme = useTheme();
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchAndSetCustomer = async () => {
        const response = await fetchCustomerFrontend();
        if (response.status === 200) {
            setCustomer(response.data);
        }
    };
    useEffect(() => {
        Promise.all([fetchAndSetCustomer()]).finally(() => {
            setLoading(false);
        });
    }, [loading])

    if (loading) {
        return (
            <LoadingCircle />
        );

    }
    return (
        <Container maxWidth="lg" sx={{ py: 4, overflowY: "auto" }}>
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        [theme.breakpoints.up('md')]: { fontSize: '2rem' }
                    }}
                >
                    Ihr Profil
                </Typography>
                <Divider sx={{ mt: 2 }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth : "400px" }}>
                <TextField label="Vorname" value={customer?.firstname} />
                <TextField label="Nachname" value={customer?.lastname} />
                <TextField label="Email" value={customer?.email} />
            </Box>
            
        </Container>
    );
}

export default Profile; 