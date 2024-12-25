import { useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

function BackendLogin() {
  const {handleLogin} = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("backend login");
    let isLoggedIn = await handleLogin('http://localhost:3000/api/backend/login',
      {
        name: name,
        password: password,
      });

    console.log(isLoggedIn);

    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
      console.log("eingeloggt");
      navigate('/backend');
    }
    else {
      setError("falsch");
      console.log("falsch");
    }

  };


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
        component="form"
        onSubmit={handleSubmit}
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
          type="submit" 
          color="primary"
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
