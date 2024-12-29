import Table from "../../Components/Table";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Products()
{
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
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/backend/products', {
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
      <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Produkte</Typography>
      <Table rows={rows} columns={columns} handleCellClick={handleCellClick} />
    </>
    );
}

export default Products;