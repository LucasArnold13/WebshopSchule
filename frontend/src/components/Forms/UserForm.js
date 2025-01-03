import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useEffect } from 'react';
import { useSnackbar } from '../../Context/SnackbarContext';

function UserForm({ user, setUser, onSave, roles }) {

    const { showSnackbar } = useSnackbar();

    const handleClick = () => {
        if (!user.name || !user.email || !user.role_id) {
            showSnackbar("Alle Felder müssen gesetzt sein", "info");
            return;
        }
        onSave(user);
    };

    return (
        <>
            <TextField
                value={user?.name || ""}
                label="Username"
                sx={{ width: "20%", marginTop: "1rem" }}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <TextField
                value={user?.email || ""}
                label="Email"
                sx={{ width: "20%", marginTop: "1rem" }}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <FormControl
                sx={{ width: "20%", marginTop: "1rem" }}
                variant="outlined" // oder "standard"/"filled"
            >
                <InputLabel id="role-label">Rolle</InputLabel>
                <Select
                    labelId="role-label"         // Verknüpft Select mit dem Label
                    id="role-select"
                    label="Rolle"
                    value={user?.role_id || ""}
                    onChange={(e) =>
                        setUser((prev) => ({ ...prev, role_id: e.target.value }))
                    }
                >
                    {roles?.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                            {role.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={user?.is_active}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                is_active: e.target.checked,
                            })
                        }
                    />
                }
                label="Ist aktiv"
            />
            <Button variant="contained" sx={{ width: "10%", marginTop: "1rem" }} onClick={handleClick}>
                Speichern
            </Button>
        </>
    );
}

export default UserForm;
