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
import { useSnackbar } from "../../Context/SnackbarContext";
import UserForm from "../../Components/Forms/UserForm";
import { format } from 'date-fns';
 
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
    else if (response.status === 400) {
      showSnackbar(response.data.message, "error");
    }


  };

  if (loading) {
    return (
      <CircularProgress/>
    )
  }

  return (
    <>
      <Typography variant='h4'>Benutzer {user?.id}</Typography>
      <Typography variant='body2' sx={{ color: "gray", marginBottom: "0.25rem" }}>
        Erstellt am: {format(new Date(user.createdAt), 'dd.MM.yyyy HH:mm:ss')}
      </Typography>

      <Typography variant='body2' sx={{ color: "blue", marginBottom: "1rem" }}>
        Aktualisiert am: {format(new Date(user.updatedAt), 'dd.MM.yyyy HH:mm:ss')}
      </Typography>
      <UserForm user={user} setUser={setUser} onSave={handleSave} roles={roles} />
    </>
  );
}

export default User;
