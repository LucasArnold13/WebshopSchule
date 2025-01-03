import React, { createContext, useState, useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import CustomSnackbar from "../Components/Feedback/CustomSnackbar";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export function SnackbarProvider({ children }) {
    const [snackbarState, setSnackbarState] = useState({
      open: false,
      message: "",
      severity: "info"
    });

    const showSnackbar = (message, severity = "info") => {
        setSnackbarState({
          open: true,
          message,
          severity
        });
      };
    
      const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarState({ ...snackbarState, open: false });
      };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }} >
          {children}
         <CustomSnackbar open={snackbarState.open} message={snackbarState.message} severity={snackbarState.severity} handleClose={closeSnackbar} />
        </SnackbarContext.Provider>
      );
    }