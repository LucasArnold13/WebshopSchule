import { TextField, Checkbox, FormControlLabel, Button, Divider, Box, Typography, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { data, NavLink, useParams, useNavigate } from "react-router-dom";
import { fetchOrder } from "../../api/orders";
import { fetchStatus } from "../../api/status";
import { Avatar, IconButton } from "@mui/material";
import StatusBox from "../../Components/StatusBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


function EditBackendorder() {
    const [order, setOrder] = useState({});
    const [status, setStatus] = useState([]);
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

    useEffect(() => {
        fetchAndSetStatus();
        fetchAndSetOrder();
    }, [id]);
    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="h4" sx={{ paddingBottom: 1 }}>
                    Bestellung {order.id}
                </Typography>
                <StatusBox status={order?.status} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, gap: 3 }}>
                <Box>
                    <Typography variant="body1" sx={{ paddingBottom: 0.1 }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, marginRight: 1 }} />
                        Bestelldatum: {new Date(order.order_date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" sx={{ paddingBottom: 0.5 }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, marginRight: 1 }} />
                        Lieferdatum: {new Date(order.delivery_date).toLocaleDateString()}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <Box sx={{ display: 'flex', }}>
                        <Button variant="contained" onClick={() => { navigate("/backend/orders/" + order?.id + "/edit") }} color="success">speichern</Button>
                    </Box>
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
                    {/* Überschrift */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            padding: 1,
                            paddingLeft: 2,
                        }}
                    >
                        Bestellungsdetails
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />

                    {/* Spaltenüberschriften */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr 1fr 1fr  1fr", // Definiert die Breiten der Spalten
                            alignItems: "center",
                            padding: 2,
                            borderBottom: "1px solid #e0e0e0",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        <Typography variant="subtitle2">Produkt</Typography>
                        <Typography variant="subtitle2" sx={{ textAlign: "right" }}>
                            Preis
                        </Typography>
                        <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                            Menge
                        </Typography>

                    </Box>

                    {/* Artikel-Details */}
                    {order?.orderitems?.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                                alignItems: "center",
                                padding: 2,
                                borderBottom: "1px solid #e0e0e0",
                            }}>
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
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        {item.product.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        <span style={{ color: "gray" }}>SKU:</span>
                                        <span style={{ color: "black" }}> {item.product.sku}</span>
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Einzelpreis */}
                            <Typography variant="body1" sx={{ textAlign: "right" }}>
                                {item.product.price.toFixed(2)}€
                            </Typography>

                            {/* Menge */}
                            <Typography variant="body1" sx={{ textAlign: "center" }}>
                                {item.quantity}
                            </Typography>

                            {/* Gesamtpreis */}
                            <Typography variant="body1" sx={{ textAlign: "right", fontWeight: "bold" }}>
                                {(item.product.price * item.quantity).toFixed(2)}€
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex", // Aktiviert Flexbox
                                    justifyContent: "center", // Horizontale Zentrierung
                                    alignItems: "center", // Vertikale Zentrierung
                                }}
                            >
                                <Button variant="contained"
                                  onClick={() => handleDeleteItem(item.id)} // Aufruf der Löschfunktion
                                 color="error">
                                    löschen
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
                    <Box
                        sx={{
                            paddingLeft: 2,
                        }}
                    >
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

                </Box>
            </Box>
        </Box>
    );
};

export default EditBackendorder;