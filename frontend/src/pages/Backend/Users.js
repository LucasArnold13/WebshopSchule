import Table from "../../Components/Table";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function Users()
{
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const columns = [
      { field: 'col1', headerName: 'ID', headerAlign: "center", flex: 1, },
      { field: 'col2', headerName: 'Name', headerAlign: "center", flex: 1, },
      { field: 'col3', headerName: 'email', headerAlign: "center", flex: 1 },
      { field: 'col4', headerName: 'Rolle', headerAlign: "center", flex: 1 },
      { field: 'col5', headerName: 'ist aktiv', headerAlign: "center", flex: 1 },
    ];
  
  
    const transformData = (apiData) => {
      return apiData.map((item, index) => ({
        id: index + 1,
        col1: item.id,
        col2: item.name,
        col3: item.email,
        col4: item.role.name,
        col5: item.is_active ? 'Ja' : 'Nein',
      }));
    };
    const handleCellClick = (params) => {
  
      navigate(`/backend/users/${params.row.col1}`);
    };
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/backend/users', {
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
  
      fetchProducts();
    }, []);
  
      return (
        <>
        <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Benutzer</Typography>
        <Table rows={rows} columns={columns} handleCellClick={handleCellClick} />
      </>
      );
}
export default Users;