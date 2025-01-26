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
  
  function Order() {
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
  
    // Beispiel-Daten (ersetzten mit deinem API-Call)
    const order = {
      id: id,
      date: '2025-01-25T19:20:00.685Z',
      status: 'Versendet',
      paymentMethod: 'Kreditkarte',
      shippingAddress: {
        name: 'Max Mustermann',
        street: 'Musterstraße 12',
        city: '12345 Berlin',
        country: 'Deutschland'
      },
      items: [
        { id: 1, name: 'Herrenarmband aus Leder', price: 49.99, quantity: 2 },
        { id: 2, name: 'Silberkette mit Anhänger', price: 89.99, quantity: 1 },
      ],
      total: 189.97
    };
  
    const getStatusColor = (status) => {
      switch(status) {
        case 'Versendet': return 'success';
        case 'Storniert': return 'error';
        case 'In Bearbeitung': return 'warning';
        default: return 'primary';
      }
    };
  
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3, backgroundColor : "blue" }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
          sx={{ mb: 3, color : "black" }}
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
              label={order.status}
              color={getStatusColor(order.status)}
              icon={<CheckCircleOutlineIcon />}
              sx={{ fontSize: '0.875rem' }}
            />
            <Typography variant="body2" color="text.secondary">
              Bestelldatum: {new Date(order.date).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
  
        <Grid container spacing={4}>
          {/* Lieferadresse & Zahlungsmethode */}
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalShippingIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Lieferadresse</Typography>
              </Box>
              <Typography>{order.shippingAddress.name}</Typography>
              <Typography>{order.shippingAddress.street}</Typography>
              <Typography>{order.shippingAddress.city}</Typography>
              <Typography>{order.shippingAddress.country}</Typography>
            </Paper>
  
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaymentIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Zahlungsmethode</Typography>
              </Box>
              <Typography>{order.paymentMethod}</Typography>
            </Paper>
          </Grid>
  
          {/* Bestellte Artikel */}
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead sx={{ bgcolor: theme.palette.action.hover }}>
                  <TableRow>
                    <TableCell>Artikel</TableCell>
                    <TableCell align="right">Menge</TableCell>
                    <TableCell align="right">Preis</TableCell>
                    <TableCell align="right">Gesamt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.price.toFixed(2)} €</TableCell>
                      <TableCell align="right">{(item.price * item.quantity).toFixed(2)} €</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <Typography variant="subtitle1">Gesamtsumme:</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1" fontWeight={700}>
                        {order.total.toFixed(2)} €
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
  
            {/* Aktionen */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="primary">
                Rechnung drucken
              </Button>
              <Button variant="contained" color="primary">
                Erneut bestellen
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
  
  export default Order;