import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';

const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          columnHeaders: {
            backgroundColor: "rgba(45, 89, 235, 0.9)  !important", // Hintergrund global anpassen
            color: "black", // Textfarbe
          },
          root: {
            '--DataGrid-containerBackground': 'rgba(45, 89, 235, 0.9)',
          },
        },
      },
    },
  });


function Orders() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'col1', headerName: 'ID', headerAlign: "center",  flex: 1,   },
        { field: 'col2', headerName: 'Kunde',  headerAlign: "center", flex: 1,    },
        { field: 'col3', headerName: 'Status',  headerAlign: "center", flex: 1    },
        { field: 'col4', headerName: 'Erstellt am',  headerAlign: "center", flex: 1    },
        { field: 'col5', headerName: 'Preis',  headerAlign: "center", flex: 1    },
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
      console.log("test");
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/backend/orders', {
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

        fetchOrders();
    }, []);






    return (
        <>
            <Typography variant='h4' sx={{padding : "10,10,10,10"}}>Bestellungen</Typography>
            <ThemeProvider theme={theme}>
            <div style={{ height: "100vh", width: '100%'}}>
                <DataGrid
                    disableRowSelectionOnClick 
                    rows={rows}
                    columns={columns}
                    onCellClick={handleCellClick}
                    sx={{
                        "& .MuiDataGrid-cell:focus": {
                            outline: "none", 
                          },
                          "& .MuiDataGrid-columnHeader:focus": {
                            outline: "none",
                          },
                        "& .MuiDataGrid-columnHeaders": {
                        },
                        '& .MuiDataGrid-cell': {
                            backgroundColor:  "rgba(255, 255, 255, 0.9) !important", 
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                          },
                        }} />
            </div>
            </ThemeProvider>
        </>

    );
}

export default Orders; 