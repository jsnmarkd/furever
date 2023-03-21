import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Button, Stack, Box, TextField } from '@mui/material';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
// components
import Iconify from '../components/iconify';

import { ContentCard, CommentBox, CommentBox2 } from '../sections/@dashboard/content';

export default function ContentPage() {
  const { id } = useParams();
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/contents/${id}`)
      .then((res) => {
        setContents(res.data.contents[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(contents);

  const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.vars.palette.text.tertiary,
  }));

  return (
    <>
      <Helmet>
        <title> {`${contents.dog_name}'s Memorial`} </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {`${contents.dog_name}'s Memorial`}
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Edit Memorial
          </Button>
        </Stack>
        <Container>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={6}>
              <ContentCard content={contents} />  
          </Grid>
          <Grid xs={6}>
              <CommentBox2 />
          </Grid>
        </Grid>
        </Container>
      </Container>
    </>
  );
}
