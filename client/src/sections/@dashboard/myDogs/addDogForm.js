import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function addDogForm() {
 

  return (
    <>
      <Stack spacing={3}>
        <TextField name="name" label="Name" onChange={handleChange} value={formData.firstName} />

        <TextField
          name="Birthday"
          label="Birthday"
          type={date}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
          //         <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
          //       </IconButton>
          //     </InputAdornment>
          //   ),
          // }}
        />
      </Stack>


      <Stack spacing={3}>
<TextField name="firstName" label="First Name" onChange={handleChange} value={formData.firstName} />
        <TextField name="lastName" label="Last Name" onChange={handleChange} value={formData.lastName} />
        <TextField name="username" label="Username" onChange={handleChange} value={formData.username} />
        <TextField name="email" label="Email address" onChange={handleChange} value={formData.email} />
</Stack>
  

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Add Dog
      </LoadingButton>
    </>
  );
}