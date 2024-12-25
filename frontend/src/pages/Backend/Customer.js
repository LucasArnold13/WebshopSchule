
import { TextField, Checkbox, FormControlLabel, Button, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Customer() {
    const [customer, setCustomer] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { id } = useParams();
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/backend/customers/' + id, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    setCustomer(data);
                } else {
                    console.error("Fehler bei der API-Anfrage:", response.statusText);
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            }
        };

        fetchCustomer();
    }, [id]);

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/backend/customers/' + id, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
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
            <TextField id="outlined-basic"
                variant="outlined"
                value={customer.firstname || ''}
                onChange={(e) => setCustomer({
                    ...customer,
                    firstname: e.target.value,
                })} />
            <TextField id="outlined-basic"
                variant="outlined"
                value={customer.lastname || ''}
                onChange={(e) => setCustomer({
                    ...customer,
                    lastname: e.target.value,
                })} />
            <TextField id="outlined-basic"
                variant="outlined"
                value={customer.email || ''}
                onChange={(e) => setCustomer({
                    ...customer,
                    email: e.target.value,
                })} />
            <FormControlLabel control={<Checkbox checked={customer.is_disabled || false}
                onChange={(e) =>
                    setCustomer({
                        ...customer,
                        is_disabled: e.target.checked,
                    })
                } />} label="ist deaktiviert" />

            <Button variant="contained" color="primary" onClick={handleClick}>Speichern</Button>
        </>
    );
}

export default Customer;