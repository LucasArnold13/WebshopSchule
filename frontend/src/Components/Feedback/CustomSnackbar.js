import React from "react";
import { Snackbar, Alert } from "@mui/material";

function CustomSnackbar({ open, message, severity, handleClose }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        severity={severity} 
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
