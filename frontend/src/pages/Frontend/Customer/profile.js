import { Typography, Box, Divider, useTheme, Container, TextField } from "@mui/material";
import { fetchCustomerFrontend } from "../../../api/customers";
import { useEffect, useState } from "react";
import LoadingCircle from "../../../Components/Feedback/LoadingCricle";

function Profile() {
    const theme = useTheme();
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);

    // Address State
    const [newAddress, setNewAddress] = useState({
        street: customer?.address?.street || '',
        city: customer?.address?.city || '',
        postalCode: customer?.address?.postalCode || '',
        country: customer?.address?.country || '',
        state: customer?.address?.state || ''
    });

    // Fetch customer data
    useEffect(() => {
        const fetchAndSetCustomer = async () => {
            try {
                const response = await fetchCustomerFrontend();
                console.log("Fetched Customer Response: ", response); // Debugging

                if (response.status === 200) {
                    setCustomer(response.data);

                    // If there are addresses in the customer data, set them to the state
                    if (response.data?.addresses && response.data.addresses.length > 0) {
                        setNewAddress({
                            street: response.data.addresses[0]?.street || '',
                            city: response.data.addresses[0]?.city || '',
                            postalCode: response.data.addresses[0]?.postalCode || '',
                            country: response.data.addresses[0]?.country || '',
                            state: response.data.addresses[0]?.state || ''
                        });
                    }
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndSetCustomer();
    }, []);  // Empty dependency array to run only once on mount

    if (loading) {
        return <LoadingCircle />;
    }

    // Handle input change for address fields
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({ ...prev, [name]: value }));
    };

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

            {/* User Information */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: "400px" }}>
                <TextField label="Vorname" value={customer?.firstname} fullWidth size="small" onChange={(e) => {
            setCustomer({ ...customer, firstname: e.target.value }); // Update firstname in the state
}} />
                <TextField label="Nachname" value={customer?.lastname} fullWidth size="small" onChange={(e) => {
            setCustomer({ ...customer, lastname: e.target.value }); // Update lastname in the state
        }}/>
                <TextField label="Email" value={customer?.email} fullWidth size="small" onChange={(e) => {
            setCustomer({ ...customer, email: e.target.value }); // Update email in the state
        }} />
                <TextField
                        label="Straße"
                        name="street"
                        value={newAddress.street}
                        onChange={handleAddressChange}
                        fullWidth
                        size="small"
                        sx={{ marginBottom: 2 }}
                    />
            
                    <TextField
                        label="Stadt"
                        name="city"
                        value={newAddress.city}
                        onChange={handleAddressChange}
                        fullWidth
                        size="small"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="PLZ"
                        name="postalCode"
                        value={newAddress.postalCode}
                        onChange={handleAddressChange}
                        fullWidth
                        size="small"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Land"
                        name="country"
                        value={newAddress.country}
                        onChange={handleAddressChange}
                        fullWidth
                        size="small"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Bundesstaat"
                        name="state"
                        value={newAddress.state}
                        onChange={handleAddressChange}
                        fullWidth
                        size="small"
                        sx={{ marginBottom: 2 }}
                    />

                
            </Box>
        </Container>
    );
}

export default Profile;
