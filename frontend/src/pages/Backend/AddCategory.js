import { TextField, Checkbox, FormControlLabel, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Table from "../../Components/Table";


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCategory } from "../../api/categories";
import { useSnackbar } from "../../Context/SnackbarContext";
import Textarea from '@mui/joy/Textarea';

function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();




  const handleSave = async () => {
    if (!category.name || !category.description) {
      showSnackbar("Alle Felder müssen gesetzt sein", "info");
      return;
    }
    const response = await createCategory(category);
    if (response.status === 201) {
      showSnackbar(response.data.message, "success");
      navigate('/backend/categories/' + response.data.category.id);
    } else if (response.status === 400) {
      showSnackbar(response.data.message, "error");
    }

  };

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: '2rem' }}>neue Kategorie</Typography>
      <Box style={{ flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          value={category?.name}
          label="Name"
          sx={{ width: "80%", maxWidth: "500px", marginBottom: "1rem" }}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />
        <Textarea
          value={category?.description}
          placeholder="Beschreibung"
          onChange={(e) => setCategory({ ...category, description: e.target.value })}
          style={{ width: '80%', maxWidth: '500px', padding: '8px', fontSize: '16px', marginBottom: "1rem" }}
        />
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ width: "80%", maxWidth: "500px", marginBottom: "2rem" }}
        >
          Speichern
        </Button>
      </Box>
    </>
  )
}

export default AddCategory;