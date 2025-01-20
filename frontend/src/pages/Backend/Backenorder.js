
import { TextField, Checkbox, CircularProgress, Button, Divider, Box, Typography, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { data, NavLink, useParams, useNavigate } from "react-router-dom";
import { fetchOrder } from "../../api/orders";
import { fetchStatus } from "../../api/status";
import { Avatar, IconButton } from "@mui/material";
import StatusBox from "../../Components/StatusBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { getFormattedDatetime } from "../../utils/getFormattedDatetime";

function Customer() {
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchAndSetOrder = async () => {
        try {
            const response = await fetchOrder(id);
            setOrder(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    };


    useEffect(() => {
        Promise.all([fetchAndSetOrder()]).finally(() => {
            setLoading(false);
        });

    }, [id, loading]);


    if (loading) {
        console.log("lädt");
        return (
            <CircularProgress />
        );
    }



    return (
        <Box sx={{ width: "100%", height: "100%" }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, gap: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                        variant="body1"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, marginRight: 1 }} />
                        Bestelldatum: {getFormattedDatetime(order.order_date)}</Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, marginRight: 1 }} />
                        Lieferdatum: {getFormattedDatetime(order.delivery_date)}
                    </Typography>
                </Box>


                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, marginTop: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="contained" onClick={() => { navigate("/backend/orders/" + order?.id + "/edit") }} color="primary">Bearbeiten</Button>
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
                            gridTemplateColumns: "2fr 1fr 1fr 1fr", // Definiert die Breiten der Spalten
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
                    <Box sx={{ maxHeight: "450px", overflow: "scroll" }}>
                        {/* Artikel-Details */}
                        {order?.orderitems?.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                                    alignItems: "center",
                                    padding: 2,
                                    borderBottom: "1px solid #e0e0e0",
                                }}
                            >
                                {/* Produktinformationen */}
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
                            Gesamtkosten: {order.total_price_float} €
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
                    <Box
                        sx={{
                            paddingLeft: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
                            Lieferadresse
                        </Typography>
                        <Typography variant="subtitle1" sx={{ marginBottom: 0.5 }}>
                            <strong>Straße:</strong> {order.street}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ marginBottom: 0.5 }}>
                            <strong>Stadt:</strong> {order.city}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ marginBottom: 0.5 }}>
                            <strong>PLZ:</strong> {order.postalCode}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ marginBottom: 0 }}>
                            <strong>Land:</strong> {order.country}
                        </Typography>
                    </Box>


                </Box>
            </Box>
        </Box>
    );
}

export default Customer;