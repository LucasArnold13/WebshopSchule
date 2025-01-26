import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Email, Lock, Login } from '@mui/icons-material';
import { customerLogin } from '../store/slices/customerSlice';
import { loginCustomer } from '../api/customers';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const response = await loginCustomer({email, password});
    if(response.status === 200) {
      console.log(response.data);
      navigate('/customer/profile'); 
      dispatch(customerLogin(response.data));
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
      }}
    >
      {/* Header Section */}
      <Box textAlign="center">
        <Login sx={{ 
          fontSize: 40, 
          color: 'primary.main', 
          mb: 1,
          transform: 'rotate(-10deg)'
        }} />
        <Typography variant="h4" component="h1" fontWeight="600">
          Willkommen zurück
        </Typography>
      </Box>

      {/* Input Fields */}
      <TextField
        fullWidth
        label="E-Mail Adresse"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: <Email fontSize="small" sx={{ mr: 1, color: 'action.active' }} />,
        }}
      />

      <TextField
        fullWidth
        label="Passwort"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: <Lock fontSize="small" sx={{ mr: 1, color: 'action.active' }} />,
        }}
      />

      {/* Password Reset Link */}
      <Box display="flex" justifyContent="flex-end">
        <Link
          href="/password-reset"
          variant="body2"
          color="text.secondary"
          sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
        >
          Passwort vergessen?
        </Link>
      </Box>

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
        startIcon={loading ? <CircularProgress size={20} /> : null}
        sx={{
          py: 1.5,
          fontWeight: 600,
          textTransform: 'none',
          fontSize: 16,
          mt: 1,
        }}
      >
        {loading ? 'Anmeldung läuft...' : 'Jetzt anmelden'}
      </Button>

      {/* Registration Link */}
      <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
        Noch keinen Account?{' '}
        <Link 
          href="/register" 
          color="primary" 
          fontWeight="500"
          sx={{ textDecoration: 'none' }}
        >
          Jetzt registrieren
        </Link>
      </Typography>
    </Box>
  );
}

export default LoginForm;