import { React, useEffect, useRef, useState } from 'react';
import { Box, TextField, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

export default function UploadDogImg(props) {


  const uploadWidgetRef = useRef();

  useEffect(() => {
    uploadWidgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dq5ggqhz4',
        uploadPreset: 'boedy35d',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          props.setUploadURL(result.info.url);
        }
      }
    );
  }, []);

  function showUploadWidget() {
    uploadWidgetRef.current.open();
  }

  return (<Stack direction="row" spacing={1} mt={2} mb={2}>
    <Button variant="contained" component="label" color="secondary">
      Upload
      <input hidden type="button" onClick={showUploadWidget} />
    </Button>
    <IconButton color="primary" aria-label="upload picture" component="label" >
      <input hidden type="button" onClick={showUploadWidget} />
      <PhotoCamera />
    </IconButton>
  </Stack>)

}
