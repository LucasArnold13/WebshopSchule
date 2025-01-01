
import { TextField, Checkbox, FormControlLabel, Button, Snackbar, Alert, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomer, updateCustomer } from "../../api/customers";
import CustomerContent from "../../Components/CustomerContent";
function Customer() {
    const [customer, setCustomer] = useState({});
    const { id } = useParams();

    
    useEffect(() => {
        const fetchAndSetCustomer = async () => {
            try {
                const data = await fetchCustomer(id);
                setCustomer(data);
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            }
        };

        fetchAndSetCustomer();
    }, [id]);



    return (
        <>
            <Typography variant="h4" sx={{ paddingBottom : 3 }}>Kunde {customer.id}</Typography>
            <CustomerContent initialCustomer={customer} onSave={updateCustomer}/>
        </>

    );
}

export default Customer;