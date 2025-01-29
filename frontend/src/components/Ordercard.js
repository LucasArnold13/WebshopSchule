import Card from '@mui/material/Card';
import { Box, CardContent, Typography, useTheme, Grid, Divider, Chip } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import EuroIcon from '@mui/icons-material/Euro';
import { useNavigate } from 'react-router-dom';
import { getFormattedDatetime } from '../utils/getFormattedDatetime';
import { getStatusColor } from '../utils/getStatusColor';

function Ordercard({ order }) {
    const theme = useTheme();
    const navigate = useNavigate();

    // **🛒 Anzahl der bestellten Artikel berechnen**
    const totalItems = order.orderitems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Card
            onClick={() => navigate('/customer/orders/' + order.id)}
            sx={{
                backgroundColor: "white",
                cursor: "pointer",
                maxWidth: 800,
                width: '100%',
                transition: '0.3s',
                boxShadow: theme.shadows[1],
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: theme.shadows[4],
                }
            }}
        >
            <CardContent sx={{ p: 2.5 }}>
                <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                    {/* Left Section */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                            >
                                Bestellung vom {getFormattedDatetime(order.order_date)}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Chip
                                    label={order.status.name}
                                    size="small"
                                    sx={{
                                        backgroundColor: getStatusColor(order.status.id) + '1A',
                                        color: getStatusColor(order.status.id),
                                        fontWeight: 500,
                                        fontSize: '0.75rem',
                                        px: 0.5,
                                        '& .MuiChip-label': { px: 1.25 }
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: 'column', justifyContent: "flex-end" }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            [theme.breakpoints.up('md')]: {
                                justifyContent: 'flex-end',
                                gap: 3
                            }
                        }}>
                            {/* Preis */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EuroIcon fontSize="small" color="action" />
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {order.total_price_float.toFixed(2)}
                                </Typography>
                            </Box>

                            {/* **🛒 Dynamische Anzahl der bestellten Artikel** */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocalMallIcon fontSize="small" color="action" />
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {totalItems}x
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}
                    >
                        Bestellnummer: #{order.id}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Ordercard;
