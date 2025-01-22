import Table from "../../../Components/Table";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../../api/categories";

function Categories() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'col1', headerName: 'id', headerAlign: "center", flex: 1, },
    { field: 'col2', headerName: 'Name', headerAlign: "center", flex: 1, },
  ];


  const transformData = (apiData) => {
    return apiData.map((item, index) => ({
      id: index + 1,
      col1: item.id,
      col2: item.name,
    }));
  };
  const handleCellClick = (params) => {

    navigate(`/backend/categories/${params.row.col1}`);
  };

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      try {
        const response = await fetchCategories();
        setRows(transformData(response.data));
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };

    fetchAndSetCategories();
  }, []);

  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 2,
      }}>
        <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Kategorien</Typography>
        <Button variant="contained" onClick={() => navigate('/backend/categories/new')}>Kategorie hinzufügen</Button>
      </Box>

      <Box sx={{overflow: "auto", }}>
      <Table rows={rows} columns={columns} handleCellClick={handleCellClick} />
      </Box>
    </>
  );
}

export default Categories;