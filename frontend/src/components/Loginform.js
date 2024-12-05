import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';

function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      setLoading(true); 
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json(); 
      console.log(response)

      if (response.ok) {
        console.log('Login erfolgreich:', data);
        // Erfolgs-Handling hier, z.B. Weiterleitung oder Token speichern
      } else {
        setError(data.message || 'Login fehlgeschlagen'); // Fehlernachricht anzeigen
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
      console.error('Fehler:', err);
    } finally {
      setLoading(false); // Ladezustand deaktivieren
    }
  };

  return (
    <Box
      component="form" // Form-Tag für bessere Struktur
      onSubmit={handleSubmit} // Beim Abschicken
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
        label="Username"
        variant="filled"
        value={username} // Username aus dem Zustand
        onChange={(e) => setUsername(e.target.value)} // Zustand aktualisieren
        InputProps={{
          style: { backgroundColor: '#fff' },
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
