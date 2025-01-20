import { useState } from 'react';
import { Typography, Box, Divider, TextField,Checkbox,Button, FormControlLabel  } from '@mui/material';
import { createCustomer } from '../../api/customers';
import { useSnackbar } from "../../Context/SnackbarContext";
import { data, NavLink, useParams, useNavigate, useLocation } from "react-router-dom";

function AddCustomer() {
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        email: "",
        is_active: false
    })

    const handleCreate = async () => {
        const response = await createCustomer(customer);
        if (response.status === 200) {
            showSnackbar(response.data.message, "success");
            navigate("/backend/customers/" + response.data.customer.id)
        }
        else if (response.status === 400) {
            showSnackbar(response.data.message, "error");
        }
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