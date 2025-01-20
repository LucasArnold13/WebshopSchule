import { useState } from 'react';
import { Typography, Box, Divider, TextField,Checkbox,Button, FormControlLabel  } from '@mui/material';
import { createCustomer } from '../../api/customers';
import { useSnackbar } from "../../Context/SnackbarContext";

function AddCustomer() {
    const { showSnackbar } = useSnackbar();
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        email: "",
        is_disabled: false
    })

    const handleCreate = async (newCustomer) => {
        if (!customer.firstname || !customer.lastname || !customer.email) {
            showSnackbar("Alle Felder müssen gesetzt sein", "info");
            return;
          }
        const response = await createCustomer(newCustomer);

        if (response.status === 200) {
            showSnackbar(response.data.message, "success");
        }
        else if (response.status === 400) {
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
            <Box sx={{ paddingBottom: 3 }}>
                <Typography variant="h4">Neuen Kunden anlegen</Typography>
                <Divider />
            </Box>
            <Box sx={{ display : "flex", flexDirection : "column", gap : 2 }}>
                <TextField
                    id="firstname"
                    label="Vorname"
                    variant="outlined"
                    sx={{width : "20%"}}
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
                    sx={{width : "20%"}}
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
                    sx={{width : "20%"}}
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

                <Button color="success" sx={{width : "20%"}} variant="contained" onClick={handleCreate}>
                    Speichern
                </Button>
            </Box>

        </>

    )
}

export default AddCustomer;