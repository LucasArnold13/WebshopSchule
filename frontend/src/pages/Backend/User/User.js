import {
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser, updateUser } from "../../../api/users";
import { fetchRoles } from "../../../api/roles";
import { useSnackbar } from "../../../Context/SnackbarContext";
import BackendHeader from "../../../Components/Backend/ItemHeader";
import LoadingCircle from "../../../Components/Feedback/LoadingCricle";
import { useNavigate } from "react-router-dom";
import PasswordModal from "../../../Components/Modals/PasswordModal";
import { updateUserPassword } from "../../../api/users";

function User() {
  const { showSnackbar } = useSnackbar();
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    Promise.all([fetchAndSetUser(), fetchAndSetRoles()]).finally(() => {
      setLoading(false);
    });
  }, [id]);

  const handleSave = async () => {
    const response = await updateUser(user);
    if (response.status === 200) {
      showSnackbar(response.data.message, "success");
      //navigate(0);
    }
    else {
      showSnackbar(response.data.message, "error");
    }


  };


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
    borderRadius: 1, // Abgerundete Ecken
  };

  if (loading) {
    return (
      <LoadingCircle />
    );
  }

  return (
    <>

      <PasswordModal open={openModal} setOpen={setOpenModal} id={user.id} updatePassword={updateUserPassword} />
      <BackendHeader item={user} name={"Benutzer"}>

        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}>
          Passwort ändern
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleSave}>
          Speichern
        </Button>
      </BackendHeader>
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

        <FormControl
          sx={{ width: "20%", marginTop: "1rem" }}
          variant="outlined"
        >
          <InputLabel id="role-label">Rolle</InputLabel>
          <Select
            labelId="role-label"
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

      </Box>
    </>
  );
}

export default User;
