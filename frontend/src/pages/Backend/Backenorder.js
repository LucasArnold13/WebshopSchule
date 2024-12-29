
import { TextField, Checkbox, FormControlLabel, Button, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function Customer() {
    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/backend/orders/' + id, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    setOrder(data);
                } else {
                    console.error("Fehler bei der API-Anfrage:", response.statusText);
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            }
        };

        const fetchActiveProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/backend/products/active', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    setProducts(data);
                } else {
                    console.error("Fehler bei der API-Anfrage:", response.statusText);
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            }
        };

        fetchCustomer();
        fetchActiveProducts();
    }, [id]);

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/backend/orders/' + id, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            if (response.ok) {
                setOpenSnackbar(true);
                console.log("Kunde wurde erfolgreich gespeichert");
            } else {
                console.error("Fehler bei der API-Anfrage:", response.statusText);
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    };

    const handleAdd = async () => 
    {
        
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return; // Snackbar bleibt geöffnet, wenn der Benutzer außerhalb klickt
        }
        setOpenSnackbar(false); // Schließt die Snackbar
    };


    return (
        <>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose} >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    This is a success Alert inside a Snackbar!
                </Alert>
            </Snackbar>
            <NavLink to="/backend/customers">{order?.customer?.lastname}</NavLink>
            <TextField label="Produktnummer" />
            <Button variant="contained" color="primary" onClick={handleAdd}>hinzufügen</Button>

            {order.orderitems && order.orderitems.length > 0 ? (
                <ul>
                    {order.orderitems.map((item) => (
                        <li key={item.id}>
                            {item.product?.name}: {item.quantity} Stück - {item.price.toFixed(2)} €
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Es sind keine Artikel in der Bestellung enthalten.</p>
            )}


            <Button variant="contained" color="primary" onClick={handleClick}>Speichern</Button>
        </>
    );
}

export default Customer;