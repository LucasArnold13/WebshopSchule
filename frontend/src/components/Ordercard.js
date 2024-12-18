import Card from '@mui/material/Card';
import { Box, CardContent, Typography } from '@mui/material';
import Statebox from './Statebox';

function Ordercard({ date, state, price, quantity }) {
    return (
        <Card sx={{ backgroundColor: "rgba(0, 0, 0, 0.3)", width: "800px",  }}>
            <CardContent sx={{ color: 'white', display: "flex" }}>
                <Box sx={{ display: "flex", flex: 1 }}>
                    <Typography variant="h6">Bestellung vom {date}</Typography>

                    <Statebox state={state} />
                </Box>
                <Box>
                    <Typography variant="body1">{price}€</Typography>
                    <Typography variant="body1">{quantity} Artikel </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Ordercard; 