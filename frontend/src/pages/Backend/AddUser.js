import {
    TextField,
    Button,
    Select,
    MenuItem,
    CircularProgress,
    Skeleton,
    Typography,
    Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createUser } from "../../api/users";
import { fetchRoles } from "../../api/roles";
import { useSnackbar } from "../../Context/SnackbarContext";
import { useNavigate } from 'react-router-dom';
import UserForm from "../../Components/Forms/UserForm";

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
        const response = await createUser(user);
        console.log(response.data.message);
        if (response.status === 201) {
            showSnackbar(response.data.message, "success");
            navigate('/backend/users/' + response.data.user.id);
        }
        else if (response.status === 400) {
            showSnackbar(response.data.message, "error");
        }

    };

    if (isloading) {
        return (
            <Box>
                <Skeleton width="10%" height={56} />
                <Skeleton variant="rectangular" width="20%" height={56} sx={{ marginTop: "1rem" }} />
                <Skeleton variant="rectangular" width="20%" height={56} sx={{ marginTop: "1rem" }} />
                <Skeleton variant="rectangular" width="20%" height={56} sx={{ marginTop: "1rem" }} />
                <Skeleton variant="rectangular" width="10%" height={40} sx={{ marginTop: "1rem" }} />
            </Box>
        )
    }

    return (
        <>
            <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>neuen Benutzer anlegen</Typography>
            <UserForm user={user} setUser={setUser} onSave={handleUpdate} roles={roles} />
        </>
    );
}

export default AddUser;
