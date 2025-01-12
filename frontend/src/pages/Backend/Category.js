import { TextField, Checkbox, FormControlLabel, Button, Snackbar, Alert, Typography, Box, CircularProgress } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Table from "../../Components/Table";

import { useSnackbar } from "../../Context/SnackbarContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCategory, updateCategory } from "../../api/categories";
import Textarea from '@mui/joy/Textarea';

function Category() {
  const [category, setCategory] = useState({});
  const [rows, setRows] = useState([]);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const columns = [
    { field: 'col1', headerName: 'SKU', headerAlign: "center", flex: 1, },
    { field: 'col2', headerName: 'Name', headerAlign: "center", flex: 1, },
    { field: 'col3', headerName: 'Anzahl', headerAlign: "center", flex: 1 },
    { field: 'col4', headerName: 'Preis', headerAlign: "center", flex: 1 },
    { field: 'col5', headerName: 'ist aktiv', headerAlign: "center", flex: 1 },
  ];


  const transformData = (apiData) => {
    return apiData.map((item, index) => ({
      id: index + 1,
      col1: item.sku,
      col2: item.name,
      col3: item.quantity,
      col4: item.price,
      col5: item.is_active ? 'Ja' : 'Nein',
    }));
  };

  const handleCellClick = (params) => {

    navigate(`/backend/products/${params.row.id}`);
  };
  const { id } = useParams();


  useEffect(() => {
    console.log('reload', reload);
    const fetchAndSetCategory = async () => {
      try {
        const response = await fetchCategory(id);
        setCategory(response.data);
        setRows(transformData(response.data.products));
        setReload(false);
        setLoading(false);
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };

    fetchAndSetCategory();
  }, [reload, loading]);

  const handleSave = async () => { 

    if (!category.name || !category.description) {
      showSnackbar("Alle Felder müssen gesetzt sein", "info");
      return;
    }
    const response = await updateCategory(category);
    if (response.status === 200) {
      showSnackbar(response.data.message, "success");
      setReload(true);
    } else if (response.status === 400) {
      showSnackbar(response.data.message, "error");
    }
  };

  if (loading){
    return <CircularProgress/>
  }

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: '2rem' }}>Kategorie {category?.id}</Typography>
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
      <Box sx={{overflow: "auto", }}>
      <Table rows={rows} columns={columns} handleCellClick={handleCellClick} />
      </Box>
    </>
  )
}

export default Category;