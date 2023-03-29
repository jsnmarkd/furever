import { useState, useId } from 'react';
import { Box, TextField, Grid, Button, Container } from '@mui/material';
import axios from 'axios';

import { useAuthContext } from '../../../providers/AuthProvider';
import UploadDogImg from './UploadDogImg';
// ----------------------------------------------------------------------

export default function AddDogForm(props) {
  const [uploadURL, setUploadURL] = useState('');
  const { user } = useAuthContext();

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);


    // You can pass formData as a fetch body directly:
    // fetch('/some-api', { method: form.method, body: formData }).then()
    const formJson = Object.fromEntries(formData.entries());
    formJson.dog_profile_picture = uploadURL;
    formJson.user_id = user.id;

    axios({ method: 'post', data: formJson, url: '/dogs' }).then((response) => {
      props.addNewDog(response.data);
    });
  }

  return (
    <form method="post" onSubmit={handleSubmit} noValidate autoComplete="off">
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth required id="filled-required" label="Name" name="dog_name" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="filled-required"
                label="Bio"
                name="dog_description"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth required id="filled-required" label="Birthday" name="date_birth" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth required id="filled-required" label="Date of passing" name="date_passing" />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="secondary">
                Save Dog
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <div>
            {uploadURL && <img src={uploadURL} height="200" width="200" alt="Dog Profile" />}
            <UploadDogImg name="dog_profile_picture" setUploadURL={setUploadURL} />
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
