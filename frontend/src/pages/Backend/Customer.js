
import { TextField, Checkbox, FormControlLabel, Button, Snackbar, Alert, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomer, updateCustomer } from "../../api/customers";
import CustomerForm from "../../Components/Forms/CustomerForm";
import { useSnackbar } from "../../Context/SnackbarContext";

function Customer() {
    const [customer, setCustomer] = useState({});
    const { id } = useParams();

    const { showSnackbar } = useSnackbar();
    
    useEffect(() => {
        const fetchAndSetCustomer = async () => {
            try {
                const response = await fetchCustomer(id);
                setCustomer(response.data);
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            }
        };

        fetchAndSetCustomer();
    }, [id]);

    const handleUpdate = async (updatetCustomer)=> {
        const response = await updateCustomer(updatetCustomer)
        console.log(response);
      if(response.status === 200)
      {
        showSnackbar(response.data.message, "success");
      }
      else if(response.status === 400)
      {
        showSnackbar(response.data.message, "error");
      }
    }



    return (
        <>
            <Typography variant="h4" sx={{ paddingBottom : 3 }}>Kunde {customer.id}</Typography>
            <CustomerForm customer={customer}  setCustomer={setCustomer} onSave={handleUpdate}/>
        </>

    );
}

export default Customer;