import { useState, useId } from 'react';
import { Box, TextField, } from '@mui/material';

// ----------------------------------------------------------------------

export default function AddDogForm() {

  const bioTextAreaId = useId();
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <form method="post" onSubmit={handleSubmit}>
      <div>
        <TextField required id="filled-required" label="Required" defaultValue="Name" variant="filled" />
      </div>

      <div> 
      <label htmlFor={bioTextAreaId}>
        Write bio:
        <textarea   id={bioTextAreaId} defaultValue="Bio" rows={4} cols={30}  />
      </label>
      </div> 

      <div>
        <TextField required id="filled-required" label="Required" defaultValue="Birthday" variant="filled" />
      </div>
      <div>
        <TextField required id="filled-required" label="Required" defaultValue="Date of passing" variant="filled" />
      </div>
      <button type="submit">Save Dog</button>
      </form>
    </Box>
    </>
  );
}
