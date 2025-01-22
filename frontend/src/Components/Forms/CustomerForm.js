import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Snackbar, Alert } from '@mui/material';
import { useEffect } from 'react';
import { useSnackbar } from '../../Context/SnackbarContext';

function CustomerForm({ customer,setCustomer, onSave }) {

  const { showSnackbar } = useSnackbar();

  const handleClick = () => {
    if (!customer.firstname || !customer.lastname || !customer.email) {
      showSnackbar("Alle Felder müssen gesetzt sein", "info");
      return;
    }
    onSave(customer);
  };

  return (
    <>
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
  );
}

export default CustomerForm;
