import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useAuthContext } from '../../../providers/AuthProvider'; 
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    error: null,
  });

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setFormData((prevData) => ({ ...prevData, error: null }));
  
    axios
      .post('http://localhost:8080/login', {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        const { user } = response.data;
        console.log('front end user', user)

        
        login(user);
        navigate('/dashboard', { replace: true });
        // console.log('great sucesss')
        // navigate('/dashboard', { replace: true });
      })
      .catch((error) => {
        console.error('error', error);
        setFormData((prevData) => ({ ...prevData, error: error.response.data.error }));
      });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
    </form>
  );
}
