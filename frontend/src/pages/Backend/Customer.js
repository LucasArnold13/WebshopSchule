
import { TextField, Checkbox, FormControlLabel, Button, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomer, updateCustomer } from "../../api/customers";
import CustomerContent from "../../Components/CustomerContent";
function Customer() {
    const [customer, setCustomer] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

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

    const updateCustomer = async (customer) => {
        try {
         //   await updateCustomer(customer);
        } catch (error) {
            console.error('Fehler beim Speichern der Daten:', error);
        }
    };



    return (
      <CustomerContent initialCustomer={customer} onSave={updateCustomer}/>
    );
}

export default Customer;