import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Paper, Modal, TextField } from '@mui/material';
import { fetchOrders } from '../../../api/orders';
import Table from "../../../Components/Table";
import { getStatusColor } from '../../../utils/getStatusColor';
import { getFormattedDatetime } from '../../../utils/getFormattedDatetime';
import { searchCustomers } from '../../../api/customers';
import _ from "lodash";



function Orders() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [customers, setCustomers] = useState([]); 
  const [rows, setRows] = useState([]);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleChange = (event) => {
    const query = event.target.value;
    console.log(query);
    setSearchQuery(query);
    debouncedSearch(query);
};

const handleSearch = async (query) => {
  try {

      const response = await searchCustomers(query);
      setCustomers(response.data)

  } catch (error) {
      console.error('Fehler bei der Suche:', error);
  }
};
const debouncedSearch = useCallback(
  _.debounce((query) => {
      handleSearch(query);
  }, 500), 
  []
);


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};


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
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              sx={{ width: "100%" }}
              value={searchQuery}
              onChange={handleChange}

            />
          </Box>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "0.5rem",
            }}
          >

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 2fr",
                alignItems: "center",
                backgroundColor: "rgba(22, 139, 248, 0.9)",
                padding: 2,
                fontWeight: "bold",
                borderBottom: "2px solid #ccc",
              }}
            >
              <Typography variant="body1">ID</Typography>
              <Typography variant="body1">Vorname</Typography>
              <Typography variant="body1">Nachname</Typography>
              <Typography variant="body1">Email</Typography>
            </Box>

            {/* Produktliste */}
            {customers?.length > 0 ? (
              customers.map((item) => (
                <Paper
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 2fr",
                    alignItems: "center",
                    padding: 2,
                    marginTop: 1,
                    marginBottom: 1,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(22, 139, 248, 0.27)",
                    },
                  }}
                  onClick={() =>   navigate(`/backend/orders/new?customerId=${item.id}`)}
                  key={item.id}
                >
                  <Typography variant="body1">{item.id}</Typography>
                  <Typography variant="body1">{item.firstname}</Typography>
                  <Typography variant="body1">{item.lastname}</Typography>
                  <Typography variant="body1">{item.email}</Typography>
                </Paper>
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  color: "gray",
                  marginTop: "1rem",
                }}
              >
                Keine Kunden gefunden.
              </Typography>
            )}
          </Box>


        </Box>
      </Modal>

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