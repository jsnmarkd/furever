import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';



// @mui
import {  Link, Stack, IconButton, Button, InputAdornment, TextField, Checkbox, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../components/iconify';
import { useAuthContext } from '../providers/AuthProvider';

import useResponsive from '../hooks/useResponsive';
// client/src/pages/RegisterPage.js
// client/src/providers/AuthProvider.js
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const { register } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    rememberMe: false,
    error: null,
  });

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      setFormData((prevData) => ({ ...prevData, error: 'Passwords do not match' }));
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      setFormData((prevData) => ({ ...prevData, error: 'Invalid email address' }));
      return;
    }
    setFormData((prevData) => ({ ...prevData, error: null }));
    axios
      .post('http://localhost:8080/register', formData)
      .then((response) => {
        console.log('rrs data', response)
        const user = response.data.user; // Get the user data from the form data
        register(user); // Call the register function with the user data
        navigate('/dashboard', { replace: true });
      })
      .catch((error) => {
        console.error('error', error.response.data);
        setFormData((prevData) => ({ ...prevData, error: error.response.data.error }));
      });
  };

  return (
    <>
    <Helmet>
    <title> Register | Furever </title>
  </Helmet>

  <StyledRoot>
     

     {mdUp && (
       <StyledSection>
       
         <img src="/assets/illustrations/furever_login.svg" alt="login" />
       </StyledSection>
     )}

  <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Join Furever
            </Typography>
         
           

    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField name="firstName" label="First Name" onChange={handleChange} value={formData.firstName} />
        <TextField name="lastName" label="Last Name" onChange={handleChange} value={formData.lastName} />
        <TextField name="username" label="Username" onChange={handleChange} value={formData.username} />
        <TextField name="email" label="Email address" onChange={handleChange} value={formData.email} />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          value={formData.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="passwordConfirmation"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          value={formData.passwordConfirmation}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
      </Stack>
      {formData.error && (
        <div style={{ color: 'red' }}>
          {formData.error}
        </div>
      )}

      <LoadingButton  size="large" type="submit" variant="contained">
        Register
      </LoadingButton>
      <div>
      <Link to="/login" style={{ textDecoration: 'none' }} onClick={() => navigate('/login')} sx={{cursor: 'pointer' }}>
      Already Registered? Log in here.
        {/* <Button  size="large" variant="contained" onClick={() => navigate('/login')}>
          Log In
        </Button> */}
      </Link>
      </div>
    </form>
    </StyledContent>
    </Container>
    </StyledRoot>
    </>
  );
}