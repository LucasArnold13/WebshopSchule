import {
  Box,
  Typography,
  Divider,
  Chip,
  Grid2,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  useTheme,
  Paper,
  Card
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { fetchOrderFrontend } from '../../../api/orders';
import { useState, useEffect } from 'react';
import { getStatusColor } from '../../../utils/getStatusColor';
import LoadingCircle from '../../../Components/Feedback/LoadingCricle';
import { getFormattedDatetime } from '../../../utils/getFormattedDatetime';

function Order() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);


  const fetchAndSetOrder = async () => {
    const response = await fetchOrderFrontend(id);
    console.log(response.status);
    if (response.status === 200) {
      setOrder(response.data);
    }
    else if (response.status === 401) {
      setOrder(null);
      return false;
    }
  };
  useEffect(() => {
    Promise.all([fetchAndSetOrder()])
      .then(() => setLoading(false))

    if (order === null) {
      window.dispatchEvent(
        new CustomEvent("snackbar", {
            detail: { message: "Zugriff auf Bestellung ist nicht berechtigt", severity: "error" },
        })
    );
      navigate("/customer/orders");
    }
  }, [loading])

  if (loading) {
    return (
      <LoadingCircle />
    );
  }

  return (

    
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
    
      {/* Zurück-Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color: 'black', textTransform: 'none',  fontSize: '1.2rem' }}
      >
        Zurück zur Übersicht
      </Button>
    
      {/* Header Section */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Bestellung #{order?.id}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={order?.status?.name}
               //{}
            icon={<CheckCircleOutlineIcon />}
            sx={{ fontSize: '0.875rem', fontWeight: 500, backgroundColor : getStatusColor(order?.status.id)  }}
          />
          <Typography variant="body1" color="text.secondary">
            Bestelldatum: {getFormattedDatetime(order?.order_date)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Lieferdatum: {getFormattedDatetime(order?.delivery_date)}
          </Typography>
        </Box>
      </Card>
    
      {/* Main Content Section */}
      <Grid container spacing={4}>
        {/* Lieferadresse Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Lieferadresse
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {order?.street}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {order?.postalCode} {order?.city}
            </Typography>
            <Typography variant="body1">
              {order?.country}
            </Typography>
          </Card>
        </Grid>
    
        {/* Bestellartikel Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Bestellartikel
            </Typography>
            
            {/* Scrollable Order Items */}
            <Box sx={{ flex: 1, overflowY: 'auto', mb: 2, maxHeight: 350 }}>
              {order?.orderitems?.map((item, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2, 
                    gap: 2 
                  }}
                >
                  <Box
                    component="img"
                    src={item.product.image_url}
                    alt={item.product.name}
                    sx={{
                      width: 60, 
                      height: 60,
                      borderRadius: 1,
                      objectFit: 'cover' 
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SKU: {item.product.sku}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.quantity} x {item.price} €
                  </Typography>
                </Box>
              ))}
            </Box>
    
            {/* Fixed Total Price Section */}
            <Box 
              sx={{ 
                borderTop: '1px solid #e0e0e0', 
                pt: 2, 
                textAlign: 'right' 
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Endsumme: {order?.total_price_float} €
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
    
  );
}

export default Order;