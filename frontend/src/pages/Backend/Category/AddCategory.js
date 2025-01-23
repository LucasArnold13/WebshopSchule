import { TextField, Divider, FormControlLabel, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Table from "../../../Components/Table";


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCategory } from "../../../api/categories";
import { useSnackbar } from "../../../Context/SnackbarContext";
import Textarea from '@mui/joy/Textarea';
import NewItemHeader from "../../../Components/Backend/NewItemHeader";

function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();




  const handleSave = async () => {
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
      <NewItemHeader name="Kategorie hinzufügen" >
        <Button
          variant="contained"
          color="success"
          onClick={handleSave}
        >
          Speichern
        </Button>
      </NewItemHeader>
      <Box style={{ flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          value={category?.name}
          label="Name"
          sx={{ width: "80%", maxWidth: "500px", marginBottom: "1rem" }}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />
        <Box>
          <Typography
          variant="h5"
          sx={{ paddingBottom: "0.25rem" }}
          >Beschreibung</Typography>
          <Textarea
            value={category?.description}
            onChange={(e) => setCategory({ ...category, description: e.target.value })}
            style={{ height: 100, width: '80%', padding: '8px', fontSize: '16px', marginBottom: "1rem" }}
          />
        </Box>
      </Box>
    </>
  )
}

export default AddCategory;