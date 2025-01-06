import { TextField, Button, Typography, Grid, Paper, FormControlLabel, Checkbox, Box,   CircularProgress, } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchCustomer, updateCustomer } from "../../api/customers";
import CustomerForm from "../../Components/Forms/CustomerForm";
import { useSnackbar } from "../../Context/SnackbarContext";
import Table from "../../Components/Table";

function Customer() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState({});
    const { id } = useParams();
    const { showSnackbar } = useSnackbar();

    const columns = [
        { field: 'col1', headerName: 'ID', headerAlign: "center", flex: 1, },
        { field: 'col3', headerName: 'Status', headerAlign: "center", flex: 1 },
        { field: 'col4', headerName: 'Erstellt am', headerAlign: "center", flex: 1 },
        { field: 'col5', headerName: 'Preis', headerAlign: "center", flex: 1 },
    ];


    const transformData = (apiData) => {
        return apiData.map((item, index) => ({
            id: index + 1,
            col1: item.id,
            col3: item.status.name,
            col4: item.createdAt,
            col5: item.total_price_float + "€"
        }));
    };


    const handleCellClick = (params) => {
        navigate(`/backend/orders/${params.row.col1}`);
    };

    useEffect(() => {
        const fetchAndSetCustomer = async () => {
            try {
                const response = await fetchCustomer(id);
                setCustomer(response.data);
                setRows(transformData(response.data.orders))
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            }
        };
        setLoading(false)

        fetchAndSetCustomer();
    }, [id, loading]);

    const handleUpdate = async (updatedCustomer) => {
        const response = await updateCustomer(updatedCustomer);
        console.log(response);
        if (response.status === 200) {
            showSnackbar(response.data.message, "success");
        } else if (response.status === 400) {
            showSnackbar(response.data.message, "error");
        }
    };
    if (loading) {
        return (<CircularProgress/>);

    }
    return (
        <Box sx={{  height: "100vh", overflow: "auto",}}>
            <Typography variant="h4" sx={{ paddingBottom: 3 }}>Kunden {customer.id}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, gap: 2, }}>
                <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        id="firstname"
                        label="Vorname"
                        variant="outlined"
                        value={customer?.firstname}
                        onChange={(e) => setCustomer({
                            ...customer,
                            firstname: e.target.value,
                        })}
                        size="small"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        id="lastname"
                        label="Nachname"
                        variant="outlined"
                        value={customer?.lastname}
                        onChange={(e) => setCustomer({
                            ...customer,
                            lastname: e.target.value,
                        })}
                        size="small"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        id="email"
                        label="E-Mail"
                        type="email"
                        variant="outlined"
                        value={customer?.email}
                        onChange={(e) => setCustomer({
                            ...customer,
                            email: e.target.value,
                        })}
                        size="small"
                        sx={{ marginBottom: 2 }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={customer?.is_disabled}
                                onChange={(e) =>
                                    setCustomer({
                                        ...customer,
                                        is_disabled: e.target.checked,
                                    })
                                }
                            />
                        }
                        label="Ist deaktiviert"
                    />
                </Box>

                {/* Rechte Box */}
                <Box sx={{ flex: 5, overflow: "auto", height: "400px" }}>
                    {customer?.addresses?.map((address, index) => (
                        <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
                            <Typography variant="h6">Adresse {index + 1}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                                <TextField
                                    label="Strasse"
                                    variant="outlined"
                                    value={address.street}
                                    onChange={(e) => {
                                        const newAddresses = [...customer.addresses];
                                        newAddresses[index].street = e.target.value;
                                        setCustomer({ ...customer, addresses: newAddresses });
                                    }}
                                    size="small"
                                    sx={{ marginBottom: 2, flex: 1 }}
                                />
                                <TextField
                                    label="Stadt"
                                    variant="outlined"
                                    value={address.city}
                                    onChange={(e) => {
                                        const newAddresses = [...customer.addresses];
                                        newAddresses[index].city = e.target.value;
                                        setCustomer({ ...customer, addresses: newAddresses });
                                    }}
                                    size="small"
                                    sx={{ marginBottom: 2, flex: 1 }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                                <TextField
                                    label="PLZ"
                                    variant="outlined"
                                    value={address.postalCode}
                                    onChange={(e) => {
                                        const newAddresses = [...customer.addresses];
                                        newAddresses[index].postalCode = e.target.value;
                                        setCustomer({ ...customer, addresses: newAddresses });
                                    }}
                                    size="small"
                                    sx={{ marginBottom: 2, flex: 1 }}
                                />
                                <TextField
                                    label="Land"
                                    variant="outlined"
                                    value={address.country}
                                    onChange={(e) => {
                                        const newAddresses = [...customer.addresses];
                                        newAddresses[index].country = e.target.value;
                                        setCustomer({ ...customer, addresses: newAddresses });
                                    }}
                                    size="small"
                                    sx={{ marginBottom: 2, flex: 1 }}
                                />
                            </Box>
                            <Box>
                                <Button>löschen</Button>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5">Bestellungen</Typography>
                <Table rows={rows} columns={columns} handleCellClick={handleCellClick} />
            </Box>
        </Box>
    );
}

export default Customer;
