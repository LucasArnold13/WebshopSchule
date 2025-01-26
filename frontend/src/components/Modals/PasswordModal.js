import { Box, Typography, Modal, Stack, Button, TextField } from "@mui/material";
import { useState } from "react";

function PasswordModal({ open, setOpen, id, updatePassword }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            updatePassword(password, id);
            onClose();
        } else {
            alert("Die Passwörter stimmen nicht überein.");
        }
    };


    const onClose = () => {
        setOpen(false);
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Passwort ändern
                </Typography>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="Neues Passwort"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Passwort bestätigen"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            required
                        />
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setOpen(false)}
                            >
                                Abbrechen
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Speichern
                            </Button>
                        </Stack>
                    </Stack>
            </Box>
        </Modal>
    );
}

export default PasswordModal; 