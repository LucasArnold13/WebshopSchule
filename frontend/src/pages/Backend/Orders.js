import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Orders() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'col1', headerName: 'ID', width: 150, headerAlign: "center",   cellClassName: 'super-app-theme--header',},
        { field: 'col2', headerName: 'Kunde', width: 150,  headerAlign: "center" },
        { field: 'col3', headerName: 'Status', width: 150,  headerAlign: "center" },
        { field: 'col4', headerName: 'Erstellt am', width: 150,  headerAlign: "center" },
        { field: 'col5', headerName: 'Preis', width: 150,  headerAlign: "center" },
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

        navigate(`/backend/order/${params.row.col1}`);
      };

    useEffect(() => {
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
            <p>Bestellungen</p>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    disableRowSelectionOnClick 
                    rows={rows}
                    columns={columns}
                    onCellClick={handleCellClick}
                    sx={{
                        cursor: 'pointer',
'& .super-app-theme--header': {
     backgroundColor: '#7BF3A4',
 },
                    }} />
            </div>
        </>

    );
}

export default Orders; 