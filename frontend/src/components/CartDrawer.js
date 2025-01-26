import { Box, Drawer, Typography, List, ListItem, ListItemText, Button, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../Context/CartContext';

function CartDrawer({ open, onClose }) {
    const { state, dispatch } = useCart(); // Verwende den globalen State

    const handleRemoveItem = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const handleCheckout = () => {
        console.log('Checkout gestartet');
        // Hier könntest du den Checkout-Prozess starten
    };

    return (
        <Drawer
            anchor="right" // Öffnet sich von rechts
            open={open} // Steuert, ob der Drawer sichtbar ist
            onClose={onClose} // Schließt den Drawer
            sx={{
                '& .MuiDrawer-paper': {
                    width: 350, // Breite des Drawers
                    boxShadow: 3, // Schatten hinzufügen
                },
            }}
        >
            {/* Inhalt des Drawers */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    padding: 2,
                }}
                role="presentation"
            >
                <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', color: 'primary.main' }}>
                    Warenkorb
                </Typography>

                {/* Warenkorb-Inhalt anzeigen */}
                {state.cart.length === 0 ? (
                    <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mt: 4 }}>
                        Dein Warenkorb ist momentan leer.
                    </Typography>
                ) : (
                    <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                        {state.cart.map((item) => (
                            <Box key={item.id}>
                                <ListItem
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                            borderRadius: 1,
                                        },
                                    }}
                                    secondaryAction={
                                        <IconButton edge="end" onClick={() => handleRemoveItem(item.id)}>
                                            <DeleteIcon sx={{ color: 'error.main' }} />
                                        </IconButton>
                                    }
                                >
                                    {/* Eckiges Produktbild anzeigen */}
                                    <Box
                                        component="img"
                                        src={item.image_url} // Bild-URL
                                        alt={item.name} // Alternativtext
                                        sx={{
                                            width: 56, // Breite des Bildes
                                            height: 56, // Höhe des Bildes
                                            borderRadius: 0, // Eckige Ecken
                                            marginRight: 2, // Abstand zum Text
                                            objectFit: 'cover', // Bild anpassen
                                        }}
                                    />
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                {item.name} (x{item.quantity})
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                {item.price} €
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                <Divider sx={{ my: 1 }} />
                            </Box>
                        ))}
                    </List>
                )}

                {/* Checkout-Button anzeigen, wenn der Warenkorb nicht leer ist */}
                {state.cart.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                py: 1.5,
                                fontWeight: 'bold',
                                boxShadow: 2,
                                '&:hover': {
                                    boxShadow: 3,
                                    backgroundColor: 'primary.dark',
                                },
                            }}
                            onClick={handleCheckout}
                        >
                            Zum Checkout
                        </Button>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
}

export default CartDrawer;