import { useState } from 'react';
import CustomerForm from '../../Components/Forms/CustomerForm';
import { Typography } from '@mui/material';
import { createCustomer } from '../../api/customers';
import { useSnackbar } from "../../Context/SnackbarContext";
import { redirect } from 'react-router-dom';

function AddCustomer() {
    const { showSnackbar } = useSnackbar();
    const [customer, setCustomer] = useState({
        firstname : "",
        lastname : "", 
        email : "", 
        is_disabled : false
    })

    const handleCreate = async (newCustomer)=> {
        const response = await createCustomer(newCustomer);

        if(response.status === 200)
            {
              showSnackbar(response.data.message, "success");
            }
            else if(response.status === 400)
            {
              showSnackbar(response.data.message, "error");
            }
    };

    return (
        <>
            <Typography variant="h4" sx={{ paddingBottom : 3 }}>Neuen Kunden anlegen</Typography>
            <CustomerForm onSave={handleCreate} customer={customer} setCustomer={setCustomer} />
        </>

    )
}

export default AddCustomer;