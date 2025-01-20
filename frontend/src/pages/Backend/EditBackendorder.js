import { TextField, Modal, FormControl, Button, Divider, Box, Typography, Select, MenuItem, Paper, InputLabel, CircularProgress, } from "@mui/material";
import { useEffect, useState } from "react";
import { data, NavLink, useParams, useNavigate } from "react-router-dom";
import { fetchOrder, updateOrder } from "../../api/orders";
import { fetchStatus } from "../../api/status";
import { Avatar, IconButton } from "@mui/material";
import StatusBox from "../../Components/StatusBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useSnackbar } from "../../Context/SnackbarContext";
import { getFormattedDatetime } from "../../utils/getFormattedDatetime";
import dayjs from "dayjs";
import SearchModal from "../../Components/SearchModal";
import QuantityTextfield from "../../Components/Inputs/QuantityTextfield";
import PriceTextfield from "../../Components/Inputs/PriceTextfield";


function EditBackendorder() {
    const { showSnackbar } = useSnackbar();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState([]);
    const [currentAddress, setCurrentAddress] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const totalCost = order?.orderitems?.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    const fetchAndSetOrder = async () => {
        try {
            const response = await fetchOrder(id);
            setOrder(response.data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    };

    const fetchAndSetStatus = async () => {
        try {
            const response = await fetchStatus();
            setStatus(response.data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    };

    const handleDeleteItem = (itemId) => {
        console.log(itemId);
        const updatedOrder = {
            ...order,
            orderitems: order.orderitems.filter((item) => item.product_id !== itemId),
        };
        setOrder(updatedOrder);
    };

    const handleAddressChange = (event) => {
        const selectedAddressId = event.target.value;
        console.log(selectedAddressId);
        const selectedAddress = order.customer.addresses[selectedAddressId];
        console.log(selectedAddress);

        setOrder((prevOrder) => ({
            ...prevOrder,
            street: selectedAddress.street,
            city: selectedAddress.city,
            state: selectedAddress.state,
            country: selectedAddress.country,
        }));
    };

    const openProductModal = () => {
        setOpenModal(true);
    }




    const handleSave = async () => {
        //lol 
        order.total_price_float = totalCost

        const response = await updateOrder(order);
        if (response.status === 200) {
            showSnackbar(response.data.message, "success");
            navigate("/backend/orders/" + order?.id)
        }
        else if (response.status === 400) {
            showSnackbar(response.data.message, "error");
        }


    }





    useEffect(() => {


        if (order) {
            const currentAddress = {
                street: order?.street,
                city: order?.city,
                country: order?.country,
                state: order?.state,
                postalCode: order?.postalCode
            };

            setCurrentAddress(currentAddress)
        }
        Promise.all([fetchAndSetStatus(), fetchAndSetOrder()]).finally(() => {
            setLoading(false);
        });

    }, [id, loading]);

    if (loading) {
        return (
            <CircularProgress />
        );
    }


    return (
        <Box sx={{ width: "100%", height: "100%" }}>

            <SearchModal
                open={openModal}
                setOpen={setOpenModal}
                order={order} // Order direkt übergeben
                setOrder={setOrder} // Setter direkt übergeben
            />




            <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                        variant="h4">
                        Bestellung {order.id}
                    </Typography>
                    <StatusBox status={order?.status} />
                    <Typography variant='body2' sx={{ color: "gray", }}>
                        Erstellt am: {getFormattedDatetime(order?.createdAt)}
                    </Typography>

                    <Typography variant='body2' sx={{ color: "blue", }}>
                        Aktualisiert am: {getFormattedDatetime(order?.updatedAt)}
                    </Typography>
                </Box>
                <Divider />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, marginTop: 2, gap: 3 }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: "center", marginBottom: 2 }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, marginRight: 1 }} />
                        <Typography variant="body1" >
                            Bestelldatum: {new Date(order.order_date).toLocaleDateString()}
                        </Typography>
                    </Box>


                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginBottom: 2 }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, marginRight: 1 }} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Lieferdatum auswählen"
                                format="DD/MM/YYYY"
                                minDate={dayjs()}
                                value={dayjs(order.delivery_date)}
                                onChange={(newDate) => {
                                    setOrder((prevOrder) => ({
                                        ...prevOrder,
                                        delivery_date: newDate ? newDate.format("YYYY-MM-DD") : null,
                                    }));
                                }}
                            />
                        </LocalizationProvider>
                    </Box>

                    <FormControl
                        sx={{ width: "100px", marginTop: "1rem" }}
                        variant="outlined" // oder "standard"/"filled"
                    >
                        <InputLabel id="role-label">Status</InputLabel>
                        <Select
                            labelId="status-label"         // Verknüpft Select mit dem Label
                            id="status-select"
                            label="Status"
                            value={order.status_id}
                            onChange={(e) =>
                                setOrder((prev) => ({ ...prev, status_id: e.target.value }))
                            }
                        >
                            {status?.map((status) => (
                                <MenuItem key={status.id} value={status.id}>
                                    {status.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <Button variant="contained" onClick={() => handleSave()} color="success">speichern</Button>

                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, gap: 3 }}>
                <Box
                    sx={{
                        flex: 5,
                        background: "white",
                        border: "1px solid grey",
                        borderRadius: "8px",
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Bestellungsdetails
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => openProductModal()} sx={{ minWidth: 80, height: "36px" }}>
                            Produkt hinzufügen
                        </Button>
                    </Box>



                    <Divider sx={{ marginBottom: 2 }} />

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", // Einheitliches Layout
                            padding: "8px 16px",
                            borderBottom: "2px solid #e0e0e0",
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "left" }}>
                            Produkt
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>
                            Preis
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>
                            Menge
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>
                            Gesamtpreis
                        </Typography>
                    </Box>

                    {/* Inhalte */}
                    <Box sx={{ maxHeight: "450px", overflow: "scroll" }}>
                        {order?.orderitems?.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", // Gleiche Spaltenaufteilung
                                    alignItems: "center",
                                    padding: "8px 16px",
                                    borderBottom: "1px solid #e0e0e0",
                                }}
                            >

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <img
                                        src={item.product.image_url}
                                        alt={item.product.name}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            objectFit: "cover",
                                            marginRight: 16,
                                        }}
                                    />
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                            {item.product.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            <span style={{ color: "gray" }}>SKU:</span>
                                            <span style={{ color: "black" }}> {item.product.sku}</span>
                                        </Typography>
                                    </Box>
                                </Box>


                                <Box sx={{ textAlign: "center" }}>
                                    <PriceTextfield item={item} order={order} setOrder={setOrder} />
                                </Box>


                                <Box sx={{ textAlign: "center" }}>
                                    <QuantityTextfield item={item} setOrder={setOrder} order={order} />
                                </Box>


                                <Box sx={{ textAlign: "center" }}>
                                    <Typography
                                        variant="body1"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {(item.product.price * item.quantity).toFixed(2)}€
                                    </Typography>
                                </Box>

                                {/* Löschen-Button */}
                                <Box sx={{ textAlign: "center" }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleDeleteItem(item.product_id)}
                                        color="error"
                                        sx={{
                                            minWidth: 80,
                                            height: "36px",
                                        }}
                                    >
                                        Löschen
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>


                    {/* Gesamtkosten */}
                    <Box
                        sx={{
                            paddingTop: 2,
                            marginTop: 2,
                            borderTop: "2px solid #e0e0e0",
                            textAlign: "right",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold", paddingRight: 1 }}>
                            Gesamtkosten: {totalCost?.toFixed(2)} €
                        </Typography>
                    </Box>
                </Box>


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
                        onClick={() => { navigate("/backend/customers/" + order?.customer?.id) }}
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
                                {order?.customer?.firstname} {order?.customer?.lastname}
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
                            {order?.customer?.email}
                        </Typography>
                    </Box>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Box sx={{ width: "100%",  paddingLeft: 2, display: 'flex', flexDirection: "column", justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
                            Lieferadresse
                        </Typography>

                        <FormControl  sx={{ marginTop: 1 }}>
                            <Select
                                sx={{ width : "60%"}}
                                labelId="address-select-label"
                                value={order.customer.addresses.findIndex(
                                    (address) =>
                                        address.street === currentAddress.street &&
                                        address.city === currentAddress.city &&
                                        address.country === currentAddress.country &&
                                        address.state === currentAddress.state
                                )?? -1}
                                onChange={handleAddressChange}
                            >
                                {order?.customer?.addresses.map((address, index) => (
                                    <MenuItem key={index} value={index}>
                                        {`${address.city}, ${address.street}`}
                                    </MenuItem>
                                ))}
                                <MenuItem key={-1} value={-1}>
                                {`${currentAddress.city}, ${currentAddress.street}`}
                                </MenuItem>
                            </Select>
                        </FormControl>

                    </Box>

                </Box>
            </Box>
        </Box >
    );
};

export default EditBackendorder;