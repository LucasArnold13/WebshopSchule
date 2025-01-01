import {
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser, updateUser } from "../../api/users";
import { fetchRoles } from "../../api/roles";

function User() {
  const [user, setUser] = useState(null); 
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true); 
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
    return (
      <div>
 
        <Skeleton width="10%" height={56} />


      {/* Skeleton für das erste Textfeld */}
      <Skeleton variant="rectangular" width="20%" height={56} sx={{ marginTop: "1rem" }} />

      {/* Skeleton für das zweite Textfeld */}
      <Skeleton variant="rectangular" width="20%" height={56} sx={{ marginTop: "1rem" }} />

      {/* Skeleton für das Dropdown */}
      <Skeleton variant="rectangular" width="20%" height={56} sx={{ marginTop: "1rem" }} />

      {/* Skeleton für die Schaltfläche */}
      <Skeleton variant="rectangular" width="10%" height={40} sx={{ marginTop: "1rem" }} />
    </div>
    )
  }

  return (
    <>
      <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Benutzer {user?.id}</Typography>
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

      <Select
        label="Rolle"
        value={user?.role_id || ""}
        sx={{ width: "20%", marginTop: "1rem" }}
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

      <Button variant="contained"  sx={{ width: "10%", marginTop: "1rem" }} onClick={handleSave}>
        Speichern
      </Button>
    </>
  );
}

export default User;
