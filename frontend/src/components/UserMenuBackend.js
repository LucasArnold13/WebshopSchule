import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Box, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import { logoutUser } from '../api/users';

const UserMenuBackend = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate('/backend/login');
  }


  return (
    <div>
      {/* Benutzerkarte */}
      <Card
        onClick={handleOpen}
        sx={{
          display: "flex",
          // Öffnet das Menü bei Klick
          alignItems: "center",
          justifyContent: "flex-start", // Inhalte von links nach rechts ausrichten
          padding: "5px 8px", // Innenabstand reduzieren
          gap: 1,
          maxHeight: "100%", // Maximale Höhe an Elternbox anpassen
          cursor: 'pointer'
        }}
      >
        {/* Avatar mit grünem Punkt */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px", // Feste Breite für den Avatar
            height: "30px", // Feste Höhe für den Avatar
          }}
        >
          <Avatar 
            sx={{ width: 29, height: 29 }}
          />
          {/* Grüner Punkt */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "8px",
              height: "8px",
              backgroundColor: "#44b700",
              borderRadius: "50%",
              border: "1px solid white",
            }}
          />
        </Box>
        {/* Benutzername und Rolle */}
        <Box>
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "12px" }}>
            {user.name}
          </p>
          <p style={{ margin: 0, fontSize: "10px", color: "gray" }}>
            {user.role.name}
          </p>
        </Box>
      </Card>
      {/* Account Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            "&:before": {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenuBackend;
