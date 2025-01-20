import {
    Button,
    Select,
    MenuItem,
    CircularProgress,
    Divider,
    TextField, 
    Checkbox, 
    FormControlLabel, 
    FormControl, 
    InputLabel,
    Typography,
    Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { createUser } from "../../api/users";
import { fetchRoles } from "../../api/roles";
import { useSnackbar } from "../../Context/SnackbarContext";
import { useNavigate } from 'react-router-dom';

function AddUser() {
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const [user, setUser] = useState({
        name: "",
        email: "",
        is_active: true
    });
    const [roles, setRoles] = useState([]);
    const [isloading, setisLoading] = useState(true);

    useEffect(() => {
        const fetchAndSetRoles = async () => {
            try {
                const response = await fetchRoles();
                setRoles(response.data);
            } catch (error) {
                console.error("Fehler beim Abrufen der Rollen:", error);
            }
        };

        Promise.all([fetchAndSetRoles()]).finally(() => {
            setisLoading(false);
        });
    }, []);



    const handleUpdate = async () => {
        if (!user.name || !user.email || !user.role_id) {
            showSnackbar("Alle Felder müssen gesetzt sein", "info");
            return;
        }

        const response = await createUser(user);
        console.log(response);
        if (response.status === 201) {
            showSnackbar(response.data.message, "success");
            navigate('/backend/users/' + response.data.user.id);
        }
        else  {
            showSnackbar(response.data.message, "error");
        }

    };

    if (isloading) {
        return (
            <CircularProgress />
        )
    }

    return (
        <>
            <Box sx={{ marginBottom: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, }}>
                    <Typography
                        variant="h4">
                        neuen Benutzer anlegen
                    </Typography>
                </Box>
                <Divider />
            </Box>
            <Box sx={{ display : "flex", flexDirection : "column" }}>
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
                <TextField
                    value={user?.password || ""}
                    label="Password"
                    type="password"
                    sx={{ width: "20%", marginTop: "1rem" }}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
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
                <Button variant="contained" color="success" sx={{ width: "10%", marginTop: "1rem" }} onClick={handleUpdate}>
                    Speichern
                </Button>
            </Box>
        </>
    );
}

export default AddUser;
