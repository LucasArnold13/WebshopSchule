import {
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser, updateUser } from "../../api/users";
import { fetchRoles } from "../../api/roles";

function User() {
  const [user, setUser] = useState(null); // Initialisiere als null
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true); // Ladezustand
  const { id } = useParams();

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const data = await fetchUser(id);
        setUser(data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten:", error);
      }
    };

    const fetchAndSetRoles = async () => {
      try {
        const data = await fetchRoles();
        setRoles(data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Rollen:", error);
      }
    };


    Promise.all([fetchAndSetUser(), fetchAndSetRoles()]).finally(() => {
      setLoading(false);
    });
  }, [id]);

  const handleSave = async () => {
    try {
      await updateUser(id, user);
    } catch (error) {
      console.error("Fehler beim Speichern der Benutzerdaten:", error);
    }

  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h1>User {user?.id}</h1>
      <TextField
        value={user?.name || ""}
        label="Username"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <TextField
        value={user?.email || ""}
        label="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <Select
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

      <Button variant="contained" onClick={handleSave}>
        Speichern
      </Button>
    </div>
  );
}

export default User;
