import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, Badge, Button, List, ListItem, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import UserMenu from './UserMenu';
import CartDrawer from './CartDrawer';
import { fetchCategories } from '../api/categories';
import { useCart } from '../Context/CartContext';

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Zustand für das Öffnen/Schließen des Drawers
  const { state, dispatch } = useCart(); // Verwende den globalen State
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return; // Ignoriere Tab- und Shift-Tasten
    }
    setIsOpen(open); // Zustand aktualisieren
  };

  const navLinkStyle = ({ isActive }) => ({
    color: "white",
    padding: "0 20px",
    textDecoration: isActive ? "underline" : "none",
  });

  const fetchAndSetCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
    }
  };





  useEffect(() => {
    Promise.all([fetchAndSetCategories()]).finally(() => {
      setLoading(false);
    });
  }, [loading]);

  if (loading) {
    return <p>Kategorien werden geladen...</p>;
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ backgroundColor: 'transparent', backdropFilter: 'blur(8px)' }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Linke Seite der Navbar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, overflowX: 'auto' }}>
            <Typography
              variant="h6"
              sx={{ whiteSpace: 'nowrap', marginRight: '10px' }}
            >
              test
            </Typography>
            {categories.map((item) => (
              <NavLink
                key={item.id}
                to={{
                  pathname: '/' + item.name.replace(' ', '-'),
                }}
                style={navLinkStyle}
              >
                {item.name}
              </NavLink>
            ))}
          </Box>

          {/* Rechte Seite der Navbar */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <SearchOutlinedIcon />
            </IconButton>
            <UserMenu />
            <IconButton onClick={toggleDrawer(true)}>
              <Badge
                badgeContent={itemCount}
                color="primary"
              // optional: max={99} und showZero (z.B. showZero={true})
              >
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <CartDrawer open={isOpen} onClose={toggleDrawer(false)} />

    </>
  );
}

export default Navbar;