import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginCustomer } from '../api/customers'; 
import { useDispatch } from "react-redux";
import  { customerLogin } from '../store/slices/customerSlice';


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
      navigate('/'); 
      dispatch(customerLogin(response.data));
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
        <Typography variant="body2" sx={{ color: 'red', textalign: 'center' }}>
          {error}
        </Typography>
      )}
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
        {loading ? 'Laden...' : 'Login'}
      </Button>
      <Typography variant="body2" sx={{ textalign: 'center' }}>
        Noch keinen Account?{' '}
        <Link href="/register" underline="hover" sx={{ color: '#007BFF' }}>
          Erstelle jetzt einen hier
        </Link>
      </Typography>
    </Box>
  );
}

export default LoginForm;
