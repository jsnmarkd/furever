import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../components/iconify';
import { useAuth } from '../recoil/atoms';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();

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
        const { username, email, firstName, lastName, password, passwordConfirmation } = formData; // Get the user data from the form data
        register(username, email, firstName, lastName, password, passwordConfirmation); // Call the register function with the user data
        navigate('/dashboard', { replace: true });
      })
      .catch((error) => {
        console.error('error', error.response.data);
        setFormData((prevData) => ({ ...prevData, error: error.response.data.error }));
      });
  };

  return (
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

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Register
      </LoadingButton>
    </form>
  );
}
