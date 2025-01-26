import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Lock, Person, Email } from '@mui/icons-material';

function Registerform() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
        backgroundColor: 'background.paper',
        padding: 4,
        borderRadius: 2,
        width: '100%',
        maxWidth: 400,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        position: 'relative',
      }}
    >
      {/* Header Section */}
      <Box textAlign="center" mb={2}>
        <Lock sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
        <Typography variant="h4" component="h1" fontWeight="600">
          Account erstellen
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Bereits registriert?{' '}
          <Link href="/login" color="primary" fontWeight="500">
            Zum Login
          </Link>
        </Typography>
      </Box>

      {/* Input Fields */}
      <Box display="flex" gap={2}>
        <TextField
          fullWidth
          label="Vorname"
          variant="outlined"
          InputProps={{
            startAdornment: <Person fontSize="small" sx={{ mr: 1, color: 'action.active' }} />,
          }}
        />
        <TextField
          fullWidth
          label="Nachname"
          variant="outlined"
          InputProps={{
            startAdornment: <Person fontSize="small" sx={{ mr: 1, color: 'action.active' }} />,
          }}
        />
      </Box>

      <TextField
        fullWidth
        label="E-Mail Adresse"
        variant="outlined"
        InputProps={{
          startAdornment: <Email fontSize="small" sx={{ mr: 1, color: 'action.active' }} />,
        }}
      />

      <TextField
        fullWidth
        label="Passwort"
        type="password"
        variant="outlined"
        helperText="Mindestens 8 Zeichen"
      />

      {/* Error Message */}
      {error && (
        <Box
          bgcolor="error.light"
          color="error.main"
          p={1.5}
          borderRadius={1}
          display="flex"
          alignItems="center"
          gap={1}
        >
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
        sx={{
          py: 1.5,
          fontWeight: 600,
          textTransform: 'none',
          fontSize: 16,
          mt: 2,
        }}
      >
        {loading ? <CircularProgress size={24} /> : 'Jetzt registrieren'}
      </Button>

      {/* Privacy Notice */}
      <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
        Mit der Registrierung akzeptieren Sie unsere{' '}
        <Link href="#" color="primary" fontWeight="500">
          Datenschutzbestimmungen
        </Link>
      </Typography>
    </Box>
  );
}

export default Registerform;