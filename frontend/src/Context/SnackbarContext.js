import React, { createContext, useState, useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useEffect } from "react";
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

      useEffect(() => {
        const handleSnackbarEvent = (event) => {
          const { message, severity } = event.detail; // Daten aus dem Event abrufen
          showSnackbar(message, severity); // Snackbar anzeigen
        };
    
        window.addEventListener("snackbar", handleSnackbarEvent); // Event-Listener registrieren
        return () => window.removeEventListener("snackbar", handleSnackbarEvent); // Cleanup
      }, []);

    return (
        <SnackbarContext.Provider value={{ showSnackbar }} >
          {children}
         <CustomSnackbar open={snackbarState.open} message={snackbarState.message} severity={snackbarState.severity} handleClose={closeSnackbar} />
        </SnackbarContext.Provider>
      );
    }