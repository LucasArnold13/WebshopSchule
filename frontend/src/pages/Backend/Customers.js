import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
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
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/backend/customers', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        console.log(data);
        setRows(transformData(data));
        if (response.ok) {

        } else {
          console.error("Fehler bei der API-Anfrage:", response.statusText);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Kunden</Typography>
      <Table rows={rows} columns={columns} handleCellClick={handleCellClick} />
    </>

  );
}

export default Customers;