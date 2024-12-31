import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import CustomSnackbar from "./Feedback/CustomSnackbar";

function CustomerContent({ initialCustomer, onSave }) {
  // Lokaler State für den Kunden
  const [customer, setCustomer] = useState(initialCustomer || {});
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    console.log("Initial customer:", initialCustomer);
    setCustomer(initialCustomer || {});
  }, [initialCustomer]);

  const handleClose = (event, reason) => {
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
      <CustomSnackbar open={snackbarState.open} message={snackbarState.message} severity={snackbarState.severity} handleClose={handleClose} />

      <TextField
        id="firstname"
        label="Vorname"
        variant="outlined"
        value={customer.firstname || ''}
        onChange={(e) => {
          const updatedCustomer = { ...customer, firstname: e.target.value };
          console.log("Updated customer:", updatedCustomer);
          setCustomer(updatedCustomer);
        }}
      />
      <TextField
        id="lastname"
        label="Nachname"
        variant="outlined"
        value={customer.lastname || ''}
        onChange={(e) => {
          const updatedCustomer = { ...customer, lastname: e.target.value };
          console.log("Updated customer:", updatedCustomer);
          setCustomer(updatedCustomer);
        }}
      />
      <TextField
        id="email"
        label="E-Mail"
        variant="outlined"
        value={customer.email || ''}
        onChange={(e) => {
          const updatedCustomer = { ...customer, email: e.target.value };
          console.log("Updated customer:", updatedCustomer);
          setCustomer(updatedCustomer);
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={customer.is_disabled || false}
            onChange={(e) => {
              const updatedCustomer = { ...customer, is_disabled: e.target.checked };
              console.log("Updated customer:", updatedCustomer);
              setCustomer(updatedCustomer);
            }}
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