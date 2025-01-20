import { TextField, Button, Typography, Modal, Paper, FormControlLabel, Checkbox, Box, CircularProgress, Divider, } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchCustomer, updateCustomer } from "../../api/customers";
import { getStatusColor } from "../../utils/getStatusColor";
import { useSnackbar } from "../../Context/SnackbarContext";
import Table from "../../Components/Table";
import { getFormattedDatetime } from "../../utils/getFormattedDatetime";

function Customer() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState({});
    const emptyAddress = {
        street: "",
        city: "",
        country: "",
        state: "",
        postalCode: ""
    }
    const [newAddress, setNewAddress] = useState(emptyAddress)
    const [modalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    const { showSnackbar } = useSnackbar();

    const columns = [
        { field: 'col1', headerName: 'ID', headerAlign: "center", flex: 1, },
        {
            field: 'col3', headerName: 'Status', renderCell: (params) => {
                const status = params.row.col3;
                return (
                    <Paper
                        sx={{
                            backgroundColor: getStatusColor(status?.id),
                            padding: 1,
                            lineHeight: 1,
                            display: "inline-block",
                            height: "auto",
                        }}
                    >
                        {status.name}
                    </Paper>
                );
            }, headerAlign: "center", flex: 1, padding: 0, margin: 0, valueGetter: (status) => status?.name,
        },
        { field: 'col4', headerName: 'Erstellt am', headerAlign: "center", flex: 1 },
        { field: 'col5', headerName: 'Preis', headerAlign: "center", flex: 1 },
    ];


    const transformData = (apiData) => {
        return apiData.map((item, index) => ({
            id: index + 1,
            col1: item.id,
            col3: item.status,
            col4: getFormattedDatetime(item.createdAt),
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
                setLoading(false)
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            }
        };

        fetchAndSetCustomer();
    }, [id, loading]);

    const handleUpdate = async () => {
        const response = await updateCustomer(customer);
        console.log(response);
        if (response.status === 200) {
            showSnackbar(response.data.message, "success");
        } else if (response.status === 400) {
            showSnackbar(response.data.message, "error");
        }
    };

    const DeleteAddress = () => {

    };

    const addAddress = () => {
        const updatedAddresses = [...customer.addresses, newAddress];
        setCustomer({ ...customer, addresses: updatedAddresses });
        setNewAddress(emptyAddress);
    };

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);





    if (loading) {
        return (<CircularProgress />);

    }
    return (

        <Box sx={{ height: "100%", width: "100%", overflow: "auto" }}>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: "8px",
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        gutterBottom
                        sx={{
                            textAlign: "center", // Zentriert den Text horizontal
                            fontWeight: "bold", // Optional: Fett für bessere Sichtbarkeit
                            marginBottom: "16px", // Abstand zum nächsten Element
                        }}
                    >
                        Adresse erstellen
                    </Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Straße"
                        name="street"
                        value={newAddress.street}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, street: e.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Stadt"
                        name="city"
                        value={newAddress.city}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, city: e.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="PLZ"
                        name="zip"
                        value={newAddress.postalCode}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, postalCode: e.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Land"
                        name="country"
                        value={newAddress.country}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, country: e.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Bundesstaat"
                        name="state"
                        value={newAddress.state}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, state: e.target.value })
                        }
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => {
                            addAddress();
                            handleClose();
                        }}
                    >
                        hinzufügen
                    </Button>
                </Box>
            </Modal>



            <Box sx={{ paddingBottom: 3 }}>
                <Box sx={{ display: 'flex', gap : 3, alignItems: 'center'  }}>
                    <Typography variant="h4" sx={{}}>Kunden {customer.id}</Typography>
                    <Typography variant='body2' sx={{ color: "gray", }}>
                        Erstellt am: {getFormattedDatetime(customer.createdAt)}
                    </Typography>

                    <Typography variant='body2' sx={{ color: "blue",}}>
                        Aktualisiert am: {getFormattedDatetime(customer.updatedAt)}
                    </Typography>
                </Box>

                <Divider />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, }}>
                <Box sx={{ width: "30%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
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
                            sx={{ marginBottom: 2, width: "40%" }}
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
                            sx={{ marginBottom: 2, width: "40%" }}
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
                            sx={{ marginBottom: 2, width: "70%" }}
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

                    <Button
                        variant="contained"
                        color="success"
                        sx={{ marginTop: 2, width : 200 }}
                        onClick={handleUpdate}
                    >
                        User speichern
                    </Button>

                </Box>

                <Box
                    sx={{
                        width: "40%",
                        height: "400px",
                        border: "2px solid #1976d2",
                        borderRadius: "8px",
                        marginRight: 2,
                        display: "flex",
                        flexDirection: "column", // Ermöglicht, dass die Überschrift oben bleibt und der Rest darunter
                    }}
                >
                    {/* Überschrift und Button oben */}
                    <Box
                        sx={{
                            flex: "0 0 auto", // Verhindert, dass die Box in den scrollbaren Bereich aufgenommen wird
                            height: "50px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px",
                            borderBottom: "1px solid #ccc", // Optional: Trennlinie für bessere Abgrenzung
                        }}
                    >
                        <Typography sx={{ fontWeight: "bold" }} variant="h4">
                            Adressen ({customer?.addresses?.length || 0})
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={handleOpen}
                        >
                            Adresse hinzufügen
                        </Button>
                    </Box>

                    {/* Scrollbarer Inhalt */}
                    <Box
                        sx={{
                            flex: "1 1 auto", // Scrollbarer Bereich nimmt den Restplatz ein
                            overflowY: "auto", // Ermöglicht vertikales Scrollen
                            padding: "8px", // Innenabstand für die Karten
                        }}
                    >
                        {customer?.addresses?.length > 0 ? (
                            customer.addresses.map((address, index) => (
                                <Paper key={index} sx={{ padding: 2, margin: 2 }}>
                                    <Typography sx={{ paddingBottom: 2 }} variant="h6">
                                        Adresse {index + 1}
                                    </Typography>

                                    {/* Erste Zeile: Straße und Stadt */}
                                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
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

                                    {/* Zweite Zeile: Bundesstaat und PLZ */}
                                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                                        <TextField
                                            label="Bundesstaat"
                                            variant="outlined"
                                            value={address.state}
                                            onChange={(e) => {
                                                const newAddresses = [...customer.addresses];
                                                newAddresses[index].state = e.target.value;
                                                setCustomer({ ...customer, addresses: newAddresses });
                                            }}
                                            size="small"
                                            sx={{ marginBottom: 2, flex: 1 }}
                                        />
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
                                    </Box>

                                    {/* Dritte Zeile: Land */}
                                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
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

                                    {/* Löschen-Button */}
                                    <Box>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => {
                                                const newAddresses = customer.addresses.filter(
                                                    (_, addrIndex) => addrIndex !== index
                                                );
                                                setCustomer({ ...customer, addresses: newAddresses });
                                            }}
                                        >
                                            löschen
                                        </Button>
                                    </Box>
                                </Paper>
                            ))
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: "center", marginTop: 2 }}>
                                Keine Adressen gefunden. Fügen Sie eine Adresse hinzu, um sie hier zu sehen.
                            </Typography>
                        )}


                    </Box>
                </Box>

            </Box>
            <Box sx={{}}>
                <Typography variant="h5">Bestellungen</Typography>
                <Box sx={{ height: "100px" }}>
                    <Table rows={rows} columns={columns} handleCellClick={handleCellClick} />
                </Box>
            </Box>
        </Box>
    );
}

export default Customer;
