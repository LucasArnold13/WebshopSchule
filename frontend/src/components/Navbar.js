import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import UserMenu from './UserMenu'


function Navbar() {
  const navLinkStyle = ({ isActive }) => ({
    color: "white",
    padding: "0 20px",
    textDecoration: isActive ? "underline" : "none",
  });
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ backgroundColor: 'transparent',  backdropFilter: 'blur(8px)' }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between', // Teilt Inhalte auf
          alignItems: 'center',
        }}
      >
        {/* Linke Seite der Navbar */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <NavLink to="/" style={navLinkStyle}>
            Logo
          </NavLink>
          <NavLink to="/1" style={navLinkStyle}>
            Handys
          </NavLink>
          <NavLink to="/2" style={navLinkStyle}>
            Laptops
          </NavLink>
          <NavLink to="/3" style={navLinkStyle}>
            Server
          </NavLink>
          <NavLink to="/4" style={navLinkStyle}>
            Peripherie
          </NavLink>
        </div>

     
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <SearchOutlinedIcon />
           {/* Rechte Seite der Navbar */}
        <UserMenu/>
          <ShoppingBagOutlinedIcon />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
