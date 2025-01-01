import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Snackbar, Alert } from '@mui/material';
import CustomSnackbar from "./Feedback/CustomSnackbar";
import { useEffect } from 'react';

function CustomerContent({ initialCustomer, onSave }) {
  // Lokaler State für den Kunden
  const [customer, setCustomer] = useState(initialCustomer || {
    firstname: "",
    lastname: "",
    email: "",
    is_disabled: false,
  });
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    setCustomer(initialCustomer);
    console.log(customer);
  }, [initialCustomer]);

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  const handleClick = () => {
    if (!customer.firstname || !customer.lastname || !customer.email) {
      setSnackbarState({
        open: true,
        message: "Bitte fülle alle Felder aus.",
        severity: "warning",
      });
      return;
    }
    onSave(customer);
  };

  return (
    <>
      <CustomSnackbar open={snackbarState.open} message={snackbarState.message} severity={snackbarState.severity} handleClose={closeSnackbar} />

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
        email
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
  );
}

export default CustomerContent;
