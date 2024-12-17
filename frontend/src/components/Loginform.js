import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      setLoading(true); 
      const response = await fetch('http://localhost:3000/api/frontend/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json(); 
      console.log(data)
      sessionStorage.setItem("customersession", JSON.stringify(data));
      if (response.ok) {
        console.log('Login erfolgreich:', data);
       // navigate('/customer/orders');
      } else { 
        setError(data.message || 'Login fehlgeschlagen'); 
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
      console.error('Fehler:', err);
    } finally {
      setLoading(false); 
    } 
  };

  return (
    <Box
      component="form" 
      onSubmit={handleSubmit} 
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px',
        borderRadius: '10px',
        width: '300px',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        variant="filled"
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        slotProps={{
          input: { 
            style: { backgroundColor: '#fff', color: '#000' }, 
          },
        }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="filled"
        value={password} // Password aus dem Zustand
        onChange={(e) => setPassword(e.target.value)} // Zustand aktualisieren
        InputProps={{
          style: { backgroundColor: '#fff' },
        }}
      />
      <Link
  href="#"
  underline="hover"
  sx={{
    alignSelf: 'flex-end',
    fontSize: '0.8rem',
    color: '#fff',
  }}
>
  Passwort vergessen?
</Link>
      {error && (
        <Typography variant="body2" sx={{ color: 'red', textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading} // Deaktivieren während der Anfrage
        sx={{
          backgroundColor: '#007BFF',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#0056b3',
          },
        }}
      >
        {loading ? 'Laden...' : 'Login'}
      </Button>
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Noch keinen Account?{' '}
        <Link href="/register" underline="hover" sx={{ color: '#007BFF' }}>
          Erstelle jetzt einen hier
        </Link>
      </Typography>
    </Box>
  );
}

export default LoginForm;
