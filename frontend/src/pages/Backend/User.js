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
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser, updateUser } from "../../api/users";
import { fetchRoles } from "../../api/roles";
import { useSnackbar } from "../../Context/SnackbarContext";
import { format } from 'date-fns';
import { getFormattedDatetime } from "../../utils/getFormattedDatetime";

function User() {
  const { showSnackbar } = useSnackbar();
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const response = await fetchUser(id);
        setUser(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten:", error);
      }
    };

    const fetchAndSetRoles = async () => {
      try {
        const response = await fetchRoles();
        setRoles(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Rollen:", error);
      }
    };


    Promise.all([fetchAndSetUser(), fetchAndSetRoles()]).finally(() => {
      setLoading(false);
    });
  }, [id, reload]);

  const handleSave = async () => {

    const response = await updateUser(user);
    if (response.status === 200) {
      showSnackbar(response.data.message, "success");
      setReload(true);
    }
    else  {
      showSnackbar(response.data.message, "error");
    }


  };

  if (loading) {
    console.log("lädt");
    return (
      
      <CircularProgress />
    );
  }

  return (
    <>
      <Box sx={{ marginBottom: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, }}>
          <Typography
            variant="h4">
            Benutzer {user?.id}
          </Typography>
          <Typography variant='body2' sx={{ color: "gray", }}>
            Erstellt am: {getFormattedDatetime(user?.createdAt)}
          </Typography>

          <Typography variant='body2' sx={{ color: "blue", }}>
            Aktualisiert am: {getFormattedDatetime(user?.updatedAt)}
          </Typography>
        </Box>
        <Divider />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
        <Button variant="contained" color="success" sx={{ width: "10%", marginTop: "1rem" }} onClick={handleSave}>
          Speichern
        </Button>
      </Box>
    </>
  );
}

export default User;
