import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrderFromCustomer } from "../../../api/orders";
import { Box, Typography, Grid2, Container, Skeleton, useTheme, Divider } from "@mui/material";
import Ordercard from "../../../Components/Ordercard";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    fetchAndSetOrders();
  }, []);

  const fetchAndSetOrders = async () => {
    try {
      setLoading(true);
      const response = await fetchOrderFromCustomer();
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      setError("Bestellungen konnten nicht geladen werden");
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <Container maxWidth="lg" sx={{ py: 4, overflowY : "auto"}}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
            [theme.breakpoints.up('md')]: { fontSize: '2rem' }
          }}
        >
          Ihre Bestellungen ({orders.length})
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>

      {loading ? (
        <Grid2 container spacing={3}>
          {[...Array(3)].map((_, index) => (
            <Grid2 item xs={12} key={index}>
              <Skeleton 
                variant="rounded" 
                width="100%" 
                height={120} 
                sx={{ borderRadius: 2 }} 
              />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Grid2 container spacing={3}>
          {orders.map((order) => (


                <Ordercard order={order} key={order.id}/>

          ))}
        </Grid2>
      )}

      {!loading && orders.length === 0 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 200,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: theme.shadows[1]
        }}>
          <Typography variant="body1" color="text.secondary">
            Keine Bestellungen vorhanden
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Orders;