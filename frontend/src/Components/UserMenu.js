import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); 


  const MenuItemStyle = () => ({ color: '#FFFFFF', fontSize: 30 });

  React.useEffect(() => {
  });

  const handleNavigation = () => {
    navigate('/login'); 
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textalign: 'center' }}>
        <IconButton
          onClick={handleClick}
          size="large"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              background: '#333',
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 0,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                bgcolor: '#333',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {(localStorage.getItem("isLoggedIn") === "true") ?  (
          <div>
            <MenuItem>
              <Typography color="white">Willkommen zurück!</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate('/customer/profile')}>
            <AccountBoxOutlinedIcon sx={MenuItemStyle}/>
              <Typography color="white" sx={{ marginLeft: 1, textalign: 'center' }}>
               Profil
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/customer/orders')}>
            <ShoppingBagIcon sx={MenuItemStyle}/>
            <Typography color="white" sx={{ marginLeft: 1, textalign: 'center' }}>
               Bestellungen
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/customer/addresses')}>
            <LocationOnIcon sx={MenuItemStyle}/>
            <Typography color="white" sx={{ marginLeft: 1, textalign: 'center' }}>
               Adressen
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => console.log("logout wieder hinzufügen")}>
              <Logout sx={MenuItemStyle}/>
              <Typography color="white" sx={{ marginLeft: 1, textAlign: 'center' }}>
               Logout
              </Typography>
            </MenuItem>
            </div>
        ) : (
          <MenuItem>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography color="white" sx={{ marginBottom: 2, textalign: 'center' }}>
                Du bist noch nicht angemeldet
              </Typography>
              <Button
                onClick={handleNavigation}
                sx={{
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#0056b3',
                  },
                }}
              >
                Anmelden
              </Button>
            </Box>
          </MenuItem>
        )}
      </Menu>
      </React.Fragment>
  );
}
