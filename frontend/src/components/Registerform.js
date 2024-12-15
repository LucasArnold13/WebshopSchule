import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function Registerform() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   try 
   {
    const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password
        }),
      });

      const data = await response.json(); 
      console.log(response)

      if (response.ok) {
        login()
        navigate("/customer/orders")
      } else {
        setError(data.message || 'Login fehlgeschlagen'); 
      }
   } catch (error) {
    
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
      {/* Form Title */}
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Registrierung
      </Typography>

      {/* Input Fields */}
      <TextField
        fullWidth
        label="Vorname"
        variant="filled"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        InputProps={{
          style: { backgroundColor: '#fff' },
        }}
      />
      <TextField
        fullWidth
        label="Nachname"
        variant="filled"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        InputProps={{
          style: { backgroundColor: '#fff' },
        }}
      />
      <TextField
        fullWidth
        label="E-Mail"
        variant="filled"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          style: { backgroundColor: '#fff' },
        }}
      />
      <TextField
        fullWidth
        label="Passwort"
        type="password"
        variant="filled"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          style: { backgroundColor: '#fff' },
        }}
      />

      {/* Error Message */}
      {error && (
        <Typography variant="body2" sx={{ color: 'red', textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          backgroundColor: '#007BFF',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#0056b3',
          },
        }}
      >
        {loading ? 'Laden...' : 'Registrieren'}
      </Button>
    </Box>
  );
}

export default Registerform;
