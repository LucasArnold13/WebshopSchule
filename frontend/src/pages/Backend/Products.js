import Table from "../../Components/Table";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/products";

function Products() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
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

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const response = await fetchProducts();
        setRows(transformData(response.data));
      } catch (error) {
        console.error("Fehler beim Abrufen der Produkte:", error);
      }
    };

    fetchAndSetProducts();
  }, []);

  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
      }}>
        <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Produkte</Typography>
        <Button variant="contained" onClick={() => navigate('/backend/categories/new')}>Produkt hinzufügen</Button>
      </Box>
      <Box sx={{overflow: "auto", }}>
      <Table  rows={rows} columns={columns} handleCellClick={handleCellClick} />
      </Box>

    </>
  );
}

export default Products;