import {
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function User() {
  const [user, setUser] = useState(null); // Initialisiere als null
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true); // Ladezustand
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/backend/users/" + id,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          console.error("Fehler bei der API-Anfrage:", response.statusText);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/backend/roles",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setRoles(data);
        } else {
          console.error("Fehler bei der API-Anfrage:", response.statusText);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Rollen:", error);
      }
    };

    // Beide API-Aufrufe starten und Ladezustand beenden
    Promise.all([fetchUser(), fetchRoles()]).finally(() => {
      setLoading(false);
    });
  }, [id]);

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/backend/users/" + id,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        console.log("Benutzerdaten erfolgreich gespeichert");
      } else {
        console.error("Fehler bei der API-Anfrage:", response.statusText);
      }
    } catch (error) {
      console.error("Fehler beim Speichern der Benutzerdaten:", error);
    }

  };

  // Zeige Ladezustand an, bis die Daten verfügbar sind
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
