import { Typography, Box, Divider, Button, TextField, Select, InputLabel, MenuItem, FormControl, CircularProgress } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Avatar, IconButton } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchModal from "../../../Components/Modals/SearchProductModal";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { data, NavLink, useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchCustomer } from "../../../api/customers";
import { useSnackbar } from "../../../Context/SnackbarContext";
import { createOrder } from "../../../api/orders";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getFormattedDatetime } from "../../../utils/getFormattedDatetime";
import QuantityTextfield from "../../../Components/Inputs/QuantityTextfield";
import PriceTextfield from "../../../Components/Inputs/PriceTextfield";
import NewItemHeader from "../../../Components/Backend/NewItemHeader";
import CustomerBox from "../../../Components/Backend/CustomerBox";

function AddOrder() {
    const [loading, setLoading] = useState(true);
    const query = new URLSearchParams(useLocation().search);
    const customerId = query.get("customerId");
    console.log("Customer ID:", customerId);
    const [order, setOrder] = useState({
        status_id: 1,
        order_date: dayjs(),
        delivery_date: dayjs().add(2, "day"),
        total_price_float: 0,
        orderitems: [],
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    });

    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const totalCost = order?.orderitems?.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    useEffect(() => {
        Promise.all([fetchAndSetCustomer()]).finally(() => {
            setLoading(false);
        });

    }, [loading]);

    const fetchAndSetCustomer = async () => {
        const response = await fetchCustomer(customerId);
        if (response.status == 200) {
            setOrder((prevOrder) => ({
                ...prevOrder,
                customer: response.data,
                customer_id: customerId
            }));
        }
    };
    const openProductModal = () => {
        setOpenModal(true);
    }

    const handleDeleteItem = (itemId) => {
        console.log(itemId);
        const updatedOrder = {
            ...order,
            orderitems: order.orderitems.filter((item) => item.product_id !== itemId),
        };
        setOrder(updatedOrder);
    };

    const handleAddressClick = (address) => {
        setOrder((prevOrder) => ({
            ...prevOrder,
            street: address.state,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country
        }));
    };



    const handleSave = async () => {
        order.total_price_float = totalCost;
        const response = await createOrder(order);
        if (response.status === 201) {
            navigate("/backend/orders/" + response.data.order.id)
        }



    }

    if (loading) {
        return <CircularProgress />
    }

    return (
        <Box sx={{ width: "100%", height: "100%" }}>

            <SearchModal
                open={openModal}
                setOpen={setOpenModal}
                order={order} // Order direkt übergeben
                setOrder={setOrder} // Setter direkt übergeben
            />


            <NewItemHeader name={"Bestellung hinzufügen"}>
                <Button variant="contained" onClick={() => handleSave()} color="success">speichern</Button>
            </NewItemHeader>

            <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between', gap: 1 }}>
                <Box sx={{ display: "flex" }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, marginRight: 1 }} />
                    <Typography sx={{ paddingBottom: 1, alignItems: "center" }}>
                        Bestelldatum: {getFormattedDatetime(order?.order_date)}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: "center", }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, marginRight: 1 }} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Lieferdatum auswählen"
                            format="DD/MM/YYYY"
                            minDate={dayjs()}
                            value={order?.delivery_date}
                            onChange={(newDate) => {
                                setOrder((prevOrder) => ({
                                    ...prevOrder,
                                    delivery_date: newDate,
                                }));
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, gap: 3, paddingTop: 2 }}>
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
                                <PriceTextfield item={item} order={order} setOrder={setOrder} />
                            </Box>


                            <Box sx={{ textAlign: "center" }}>
                                <QuantityTextfield item={item} order={order} setOrder={setOrder} />
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

                <CustomerBox customer={order.customer}>
                    <FormControl fullWidth sx={{ marginTop: 1 }}>
                        <InputLabel id="address-select-label">Adresse auswählen</InputLabel>
                        <Select
                            sx={{ width: "300px" }}
                            labelId="address-select-label">
                            {order?.customer?.addresses.map((address, index) => (
                                <MenuItem
                                    key={index}
                                    value={index}
                                    onClick={() => handleAddressClick(address)}

                                >
                                    {`${address.street}, ${address.city}, ${address.country}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </CustomerBox>

            </Box>
        </Box >
    );
}

export default AddOrder;