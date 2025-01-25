import { Box,Drawer, Typography, List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchCategories } from '../api/categories';
import { getCartFromLocalStorage } from '../utils/localStorageCart';
import { useCart } from '../Context/CartContext';

function CartDrawer( { open, onClose }) {
    const { state, dispatch } = useCart(); // Verwende den globalen State

    const handleRemoveItem = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
      };
    
      const handleCheckout = () => {
        console.log('Checkout gestartet');
        // Hier könntest du den Checkout-Prozess starten
      };

      const fetchAndSetCart = async () => {
        const savedCart = getCartFromLocalStorage();
        dispatch({ type: 'LOAD_CART', payload: savedCart }); // Setze den cart-State im globalen State
      };

    return (
        <Drawer
            anchor="right" // Öffnet sich von rechts
            open={open} // Steuert, ob der Drawer sichtbar ist
            onClose={onClose} // Schließt den Drawer
        >
            {/* Inhalt des Drawers */}
            <Box
                sx={{
                    width: 300, // Breite des Drawers
                    padding: 2,
                }}
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
            >
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Warenkorb
                </Typography>

                {/* Warenkorb-Inhalt anzeigen */}
                {state.cart.length === 0 ? (
                    <Typography variant="body1">Dein Warenkorb ist momentan leer.</Typography>
                ) : (
                    <List>
                        {state.cart.map((item) => (
                            <ListItem
                                key={item.id}
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => handleRemoveItem(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={`${item.name} (${item.quantity}x)`}
                                    secondary={`${item.price} €`}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}

                {/* Checkout-Button anzeigen, wenn der Warenkorb nicht leer ist */}
                {state.cart.length > 0 && (
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={handleCheckout}
                    >
                        Zum Checkout
                    </Button>
                )}
            </Box>
        </Drawer>
    );
}

export default CartDrawer;