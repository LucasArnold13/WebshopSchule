import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function BackendLogin() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

  return (
    <Box
      sx={{
        height: '100vh', // Gesamte Höhe des Viewports
        width: '100vw', // Gesamte Breite des Viewports
        backgroundColor: '#f0f0f0',
        display: 'flex', // Flexbox aktivieren
        justifyContent: 'center', // Horizontal zentrieren
        alignItems: 'center', // Vertikal zentrieren
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: '1.5rem' }}>
          Login
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)} 
          fullWidth
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)} 
          fullWidth
          sx={{ marginBottom: '1.5rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log(name, password)}
          fullWidth
          sx={{
            padding: '0.75rem',
            fontSize: '1rem',
            textTransform: 'none',
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default BackendLogin;
