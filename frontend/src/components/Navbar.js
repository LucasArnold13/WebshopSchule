import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import UserMenu from './UserMenu'
import { fetchCategories } from '../api/categories';
import { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if(loading) {
    return <p>Kategorien werden geladen...</p>
  }



  return (
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
                pathname: '/' + item.name.toLowerCase().replace(' ', '-'),
              }}
              style={navLinkStyle}
            >
              {item.name}
            </NavLink>
          ))}
        </Box>

        {/* Rechte Seite der Navbar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AccountCircleOutlinedIcon />
          </IconButton>
          <IconButton>
            <ShoppingBagOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
