import { useState } from 'react';
import CustomerContent from '../../Components/CustomerContent';
import { Typography } from '@mui/material';
import { createCustomer } from '../../api/customers';

function AddCustomer() {
    return (
        <>
            <Typography variant="h4" sx={{ paddingBottom : 3 }}>Neuen Kunden anlegen</Typography>
            <CustomerContent onSave={createCustomer} />
        </>

    )
}

export default AddCustomer;