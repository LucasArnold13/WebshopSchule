import { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography, Select, MenuItem, Snackbar, Alert } from "@mui/material";
import { fetchRoles } from "../../api/roles";
import { createUser } from "../../api/users";
import CustomSnackbar from "../Feedback/CustomSnackbar";

function UserModal({ isOpen, onClose }) {
    const [newUser, setNewUser] = useState({});
    const [roles, setRoles] = useState([]);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "success", 
    });


    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const fetchAndSetRoles = async () => {
        try {
            const data = await fetchRoles();
            setRoles(data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Rollen:", error);
        }
    };

    const saveNewUser = async () => {
        try {

            if (!newUser.name || !newUser.email || !newUser.role_id) {
                setSnackbarState({
                    open: true,
                    message: "Bitte fülle alle Felder aus.",
                    severity: "warning", 
                });
                return; 
            }


            await createUser(newUser,
                (message) => {
                    setSnackbarState({ open: true, message: message, severity: "success" });
                },
                (message) => {
                    setSnackbarState({ open: true, message: message, severity: "error" });
                }

            );
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarState({ ...snackbarState, open: false });
    };

    useEffect(() => {
        fetchAndSetRoles();
    }, []);

    return (
        <>
            <Modal open={isOpen} onClose={onClose}>
                <Box sx={style}>
                    <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
                        Neuen Benutzer anlegen
                    </Typography>

                    <TextField
                        value={newUser?.name || ""}
                        label="Name"
                        fullWidth
                        sx={{ marginBottom: "1rem" }}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />

                    <TextField
                        value={newUser?.email || ""}
                        label="Email"
                        email
                        fullWidth
                        sx={{ marginBottom: "1rem" }}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />

                    <Select
                        value={newUser?.role_id || ""}
                        fullWidth
                        sx={{ marginBottom: "1rem" }}
                        displayEmpty
                        onChange={(e) => setNewUser((prev) => ({ ...prev, role_id: e.target.value }))}
                    >
                        <MenuItem value="" disabled>
                            Wähle eine Rolle
                        </MenuItem>
                        {roles?.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <Button variant="contained" onClick={saveNewUser} fullWidth sx={{ marginTop: 2 }}>
                        Speichern
                    </Button>
                </Box>
            </Modal>
            <CustomSnackbar open={snackbarState.open} message={snackbarState.message} severity={snackbarState.severity} handleClose={handleClose} />
        </>
    );
}

export default UserModal;
