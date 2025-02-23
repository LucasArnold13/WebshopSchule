import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Paper, Modal, TextField } from '@mui/material';
import { fetchOrders } from '../../../api/orders';
import Table from "../../../Components/Table";
import { getStatusColor } from '../../../utils/getStatusColor';
import { getFormattedDatetime } from '../../../utils/getFormattedDatetime';
import SearchCustomerModal from '../../../Components/Modals/SearchCustomerModal';




function Orders() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState([]);

  const columns = [
    { field: 'col1', headerName: 'ID', headerAlign: "center", flex: 1, },
    { field: 'col2', headerName: 'Kunde', headerAlign: "center", flex: 1, },
    {
      field: 'col3', headerName: 'Status', renderCell: (params) => {
        const status = params.row.col3;
        return (
          <Paper
            sx={{
              backgroundColor: getStatusColor(status?.id),
              padding: 1,
              lineHeight: 1,
              display: "inline-block",
              height: "auto",
            }}
          >
            {status.name}
          </Paper>
        );
      }, headerAlign: "center", flex: 1, padding: 0, margin: 0, valueGetter: (status) => status?.name,
    },
    { field: 'col4', headerName: 'Bestelldatum', headerAlign: "center", flex: 1 },
    { field: 'col5', headerName: 'Lieferdatum', headerAlign: "center", flex: 1 },
    { field: 'col6', headerName: 'Preis', headerAlign: "center", flex: 1 },
  ];


  const transformData = (apiData) => {
    return apiData.map((item, index) => ({
      id: index + 1,
      col1: item.id,
      col2: item.customer.firstname + " " + item.customer.firstname,
      col3: item.status,
      col4: getFormattedDatetime(item.order_date),
      col5: getFormattedDatetime(item.delivery_date),
      col6: item.total_price_float + "€"
    }));
  };


  const handleCellClick = (params) => {
    navigate(`/backend/orders/${params.row.col1}`);
  };

  useEffect(() => {
    const fetchAndSetOrders = async () => {
      try {
        const response = await fetchOrders();
        setRows(transformData(response.data))
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };

    fetchAndSetOrders();
  }, []);






  return (
    <>
      <SearchCustomerModal open={openModal} setOpen={setOpenModal} />
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
      }}>
        <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Bestellungen</Typography>
        <Button variant="contained" onClick={() => setOpenModal(true)}>Bestellungen hinzufügen</Button>
      </Box>
      <Box sx={{ overflow: "auto", }}>
        <Table rows={rows} columns={columns} handleCellClick={handleCellClick} />
      </Box>
    </>

  );
}

export default Orders; 