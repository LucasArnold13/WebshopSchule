import {
  Box,
  Typography,
  Divider,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  useTheme,
  Paper
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
    else if( response.status === 401)
    {
      setOrder(null);
      return false;
    }
  };
  useEffect(() => {
    Promise.all([fetchAndSetOrder()])
    .then(() => setLoading(false))

    if (order === null) {
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
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3, color: "black" }}
        >
          Zurück zur Übersicht
        </Button>

        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Bestellung #{order.id}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={order.status.name}
              color={getStatusColor(order.status)}
              icon={<CheckCircleOutlineIcon />}
              sx={{ fontSize: '0.875rem' }}
            />
            <Typography variant="body2" color="text.secondary">
              Bestelldatum: {getFormattedDatetime(order.order_date)}
            </Typography>
          </Box>
        </Box>


      </Box>
    );
  }

  export default Order;