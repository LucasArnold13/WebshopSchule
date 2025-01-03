import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import { fetchCustomers } from '../../api/customers';
import Table from '../../Components/Table';

function Customers() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'col1', headerName: 'ID', headerAlign: "center", flex: 1, },
    { field: 'col2', headerName: 'firstname', headerAlign: "center", flex: 1, },
    { field: 'col3', headerName: 'lastname', headerAlign: "center", flex: 1 },
    { field: 'col4', headerName: 'email', headerAlign: "center", flex: 1 },
  ];


  const transformData = (apiData) => {
    return apiData.map((item, index) => ({
      id: index + 1,
      col1: item.id,
      col2: item.firstname,
      col3: item.lastname,
      col4: item.email,
    }));
  };
  const handleCellClick = (params) => {

    navigate(`/backend/customers/${params.row.col1}`);
  };


  useEffect(() => {
    const fetchAndSetCustomers = async () => {
      try {
        const response = await fetchCustomers();
        setRows(transformData(response.data));
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };

    fetchAndSetCustomers();
  }, []);

  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
      }}>
        <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Kunden</Typography>
        <Button variant="contained" onClick={() => navigate('/backend/customers/new')}>Kunden hinzufügen</Button>
      </Box>
      <Box sx={{ overflow: "auto", }}>
        <Table rows={rows} columns={columns} handleCellClick={handleCellClick} />
      </Box>
    </>

  );
}

export default Customers;