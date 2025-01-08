import { TextField, Modal, FormControl, Button, Divider, Box, Typography, Select, MenuItem, Paper, InputLabel, } from "@mui/material";
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
import dayjs from "dayjs";

import SearchModal from "../../Components/SearchModal";

function EditBackendorder() {
    const { showSnackbar } = useSnackbar();
    const [order, setOrder] = useState({});
    const [status, setStatus] = useState([]);
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
            console.log(response.data)
            setStatus(response.data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    };

    const handleDeleteItem = (itemId) => {
        const updatedOrder = {
            ...order,
            orderitems: order.orderitems.filter((item) => item.id !== itemId),
        };
        setOrder(updatedOrder);
    };

    const handleAddressChange = (event) => {
        const selectedAddressId = event.target.value;
        const selectedAddress = order.customer.addresses[selectedAddressId];

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
        const response = await updateOrder(order);
        if (response.status === 200) {
            showSnackbar(response.data.message, "success");
          }
          else if (response.status === 400) {
            showSnackbar(response.data.message, "error");
          }
          navigate("/backend/orders/" + order?.id)
      
    }





    useEffect(() => {
        fetchAndSetStatus();
        fetchAndSetOrder();
        console.log("Aktualisierter Zustand:", order);
    }, [id,]);


    return (
        <Box sx={{ width: "100%", height: "100%" }}>

            <SearchModal
                open={openModal}
                setOpen={setOpenModal}
                order={order} // Order direkt übergeben
                setOrder={setOrder} // Setter direkt übergeben
            />




            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="h4" sx={{ paddingBottom: 1 }}>
                    Bestellung {order.id}
                </Typography>
                <StatusBox status={order?.status} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, gap: 3 }}>
                <Box>
                    <Typography variant="body1" sx={{ paddingBottom: 1 }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, marginRight: 1 }} />
                        Bestelldatum: {new Date(order.order_date).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2, }}>
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
                                <TextField
                                    value={item.product.price.toString()} // Zeigt die Roh-Eingabe an
                                    size="small"
                                    onChange={(e) => {
                                        const inputValue = e.target.value.replace(",", "."); // Komma durch Punkt ersetzen
                                        const regex = /^[0-9]*[.,]?[0-9]*$/; // Nur Zahlen mit optionalem Dezimalpunkt/Komma

                                        // Eingabe validieren
                                        if (regex.test(inputValue) || inputValue === "") {
                                            const updatedOrderItems = order.orderitems.map((orderItem) => {
                                                if (orderItem.id === item.id) {
                                                    return {
                                                        ...orderItem,
                                                        product: {
                                                            ...orderItem.product,
                                                            price: inputValue === "" ? "" : inputValue, // Eingabe direkt speichern
                                                        },
                                                    };
                                                }
                                                return orderItem;
                                            });
                                            setOrder({ ...order, orderitems: updatedOrderItems });
                                        }
                                    }}
                                    onBlur={() => {
                                        // Formatierung anwenden, wenn das Feld verlassen wird
                                        const updatedOrderItems = order.orderitems.map((orderItem) => {
                                            if (orderItem.id === item.id) {
                                                return {
                                                    ...orderItem,
                                                    product: {
                                                        ...orderItem.product,
                                                        price: parseFloat(orderItem.product.price) || 0, // In Zahl umwandeln
                                                    },
                                                };
                                            }
                                            return orderItem;
                                        });
                                        setOrder({ ...order, orderitems: updatedOrderItems });
                                    }}
                                    sx={{
                                        width: 80,
                                        "& .MuiInputBase-input": {
                                            textAlign: "center",
                                            padding: "4px 8px",
                                        },
                                    }}
                                    input={{
                                        inputMode: "decimal", // Virtuelle Tastatur für Dezimalzahlen
                                        pattern: "[0-9]*[.,]?[0-9]*", // Nur gültige Zahlen erlauben
                                    }}
                                />

                            </Box>


                            <Box sx={{ textAlign: "center" }}>
                                <TextField
                                    value={item.quantity}
                                    size="small"
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        if (!isNaN(value)) {
                                            const updatedOrderItems = order.orderitems.map((orderItem) => {
                                                if (orderItem.id === item.id) {
                                                    return {
                                                        ...orderItem,
                                                        quantity: value,
                                                    };
                                                }
                                                return orderItem;
                                            });
                                            setOrder({ ...order, orderitems: updatedOrderItems });
                                        }
                                    }}
                                    sx={{
                                        width: 80,
                                        "& .MuiInputBase-input": {
                                            textAlign: "center",
                                            padding: "4px 8px",
                                        },
                                    }}
                                />
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
                                    onClick={() => handleDeleteItem(item.id)}
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
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingLeft: 2
                        }}
                    >
                        {/* Avatar und Name */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                                alt="bAmanda Harvey"
                                sx={{ width: 50, height: 50, marginRight: 2 }}
                            />
                            <Typography
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                        color: "blue",
                                    },
                                }}
                                onClick={() => { navigate("/backend/customers/" + order?.customer?.id) }}
                            >
                                {order?.customer?.firstname} {order?.customer?.lastname}
                            </Typography>

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
                    <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{
                            paddingLeft: 2,
                            flex: 1
                        }}>
                            <Typography variant="h8" sx={{ padding: 1, fontWeight: "bold" }}>
                                Lieferadresse
                            </Typography>
                            <Typography variant="subtitle1" sx={{ paddingLeft: 1 }}>
                                {order?.street}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ paddingLeft: 1 }}>
                                {order?.city}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ paddingLeft: 1 }}>
                                {order?.postalCode}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ paddingLeft: 1 }}>
                                {order?.country}
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1, marginRight: 2 }}>
                            <FormControl fullWidth sx={{ marginTop: 1 }}>
                                <InputLabel id="address-select-label">Adresse auswählen</InputLabel>
                                <Select
                                    labelId="address-select-label"
                                    onChange={handleAddressChange}
                                >
                                    {order?.customer?.addresses.map((address, index) => (
                                        <MenuItem key={index} value={index}>
                                            {`${address.street}, ${address.city}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                    </Box>

                </Box>
            </Box>
        </Box >
    );
};

export default EditBackendorder;