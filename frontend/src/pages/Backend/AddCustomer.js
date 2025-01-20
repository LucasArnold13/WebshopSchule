import { useState } from 'react';
import CustomerForm from '../../Components/Forms/CustomerForm';
import { Typography, TextField, Button, Checkbox, FormControlLabel, Snackbar, Alert } from '@mui/material';
import { createCustomer } from '../../api/customers';
import { useSnackbar } from "../../Context/SnackbarContext";

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


    const handleClick = () => {
      if (!customer.firstname || !customer.lastname || !customer.email) {
        showSnackbar("Alle Felder müssen gesetzt sein", "info");
        return;
      }
      handleCreate(customer);
    };
  

    return (
        <>
            <Typography variant="h4" sx={{ paddingBottom : 3 }}>Neuen Kunden anlegen</Typography>
            <TextField
        id="firstname"
        label="Vorname"
        variant="outlined"
        
        value={customer?.firstname}
        onChange={(e) => setCustomer({
          ...customer,
          firstname: e.target.value,
        })}
      />
      <TextField
        id="lastname"
        label="Nachname"
        variant="outlined"
        value={customer?.lastname}
        onChange={(e) => setCustomer({
          ...customer,
          lastname: e.target.value,
        })}
      />
      <TextField
        id="email"
        label="E-Mail"
        type="email"
        variant="outlined"
        value={customer?.email}
        onChange={(e) => setCustomer({
          ...customer,
          email: e.target.value,
        })}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={customer?.is_disabled}
            onChange={(e) =>
              setCustomer({
                ...customer,
                is_disabled: e.target.checked,
              })
            }
          />
        }
        label="Ist deaktiviert"
      />

      <Button variant="contained" color="primary" onClick={handleClick}>
        Speichern
      </Button>
        </>

    )
}

export default AddCustomer;