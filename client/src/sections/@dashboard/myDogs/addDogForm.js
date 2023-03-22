import { useState } from 'react';
import { Box, TextField } from '@mui/material';


// ----------------------------------------------------------------------

export default function AddDogForm () {

return (
<Box
component="form"
sx={{
  '& .MuiTextField-root': { m: 1, width: '25ch' },
}}
noValidate
autoComplete="off"
>
<div>
  <TextField required id="filled-required" label="Required" defaultValue="Name" variant="filled" />
</div>

<div>
  <TextField required id="filled-required" label="Required" defaultValue="Bio" variant="filled" />
</div>

<div>
  <TextField required id="filled-required" label="Required" defaultValue="Birthday" variant="filled" />
</div>
<div>
  <TextField
    required
    id="filled-required"
    label="Required"
    defaultValue="Date of passing"
    variant="filled"
  />
</div>
</Box>
)
} 