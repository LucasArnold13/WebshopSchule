import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, Box, Button } from '@mui/material';
import { fetchOrders } from '../../api/orders';
import Table from "../../Components/Table";




function Orders() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'col1', headerName: 'ID', headerAlign: "center", flex: 1, },
    { field: 'col2', headerName: 'Kunde', headerAlign: "center", flex: 1, },
    { field: 'col3', headerName: 'Status', headerAlign: "center", flex: 1 },
    { field: 'col4', headerName: 'Erstellt am', headerAlign: "center", flex: 1 },
    { field: 'col5', headerName: 'Preis', headerAlign: "center", flex: 1 },
  ];


  const transformData = (apiData) => {
    return apiData.map((item, index) => ({
      id: index + 1,
      col1: item.id,
      col2: item.customer.firstname + " " + item.customer.firstname,
      col3: item.status.name,
      col4: item.createdAt,
      col5: item.total_price_float + "€"
    }));
  };


  const handleCellClick = (params) => {
    navigate(`/backend/orders/${params.row.col1}`);
  };

  useEffect(() => {
    const fetchAndSetOrders = async () => {
      try {
        const response = fetchOrders();
        setRows(transformData(response.data))        
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };

    fetchAndSetOrders();
  }, []);






  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
      }}>
        <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Bestellungen</Typography>
        <Button variant="contained" onClick={() => navigate('/backend/categories/new')}>Bestellungen hinzufügen</Button>
      </Box>
      <Box sx={{overflow: "auto", }}>
      <Table rows={rows} columns={columns} handleCellClick={handleCellClick} />
      </Box>
    </>

  );
}

export default Orders; 