
import { TextField, Checkbox, FormControlLabel, Button, Snackbar, Box, Typography, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { data, NavLink, useParams } from "react-router-dom";
import { fetchOrder } from "../../api/orders";
import { fetchStatus } from "../../api/status";

function Customer() {
    const [order, setOrder] = useState({});
    const [status, setStatus] = useState([]);
    const { id } = useParams();

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

    useEffect(() => {
        fetchAndSetStatus();
        fetchAndSetOrder();
    }, [id]);





    return (
        <>
            <Box sx={{ padding: "2rem" }}>
                <Typography variant='h4' sx={{ marginBottom: "1rem" }}>Bestellungen {order?.id}</Typography>
                <Select
                    label="Status"
                    value={order?.status_id || ""}
                    sx={{ width: "20%", marginBottom: "1rem" }}
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
                <Box sx={{ marginBottom: "1rem" }}></Box>
                <Typography variant='h6'>{order.customer?.firstname} {order.customer?.lastname}</Typography>
                <Typography variant="body1">{new Date(order.createdAt).toLocaleDateString()}</Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
                <Typography variant="h6">Lieferdatum</Typography>
                <Typography variant="body1">11.1.2025</Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
                <Typography variant="h6">Bestelldatum</Typography>
                <Typography variant="body1">11.1.2025</Typography>
            </Box>
            <Box>
                {order?.orderitems?.map((item) => (
                    <Box key={item.id} sx={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
                        <Typography variant='h6'>{item.name}</Typography>
                        <Typography>Quantity: {item.quantity}</Typography>
                        <Typography>Price: {item.price}€</Typography>
                        <Typography>SKU: {item.product.sku}</Typography>
                    </Box>
                ))}
            </Box>
        </>
    );
}

export default Customer;