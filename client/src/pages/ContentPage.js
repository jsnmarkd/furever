import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button, Stack } from '@mui/material';
// components
import Iconify from '../components/iconify';

import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import PRODUCTS from '../_mock/products';

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
  const {
    media_picture,
    comments,
    share,
    username,
    user_profile_picture,
    dog_name,
    dog_profile_picture,
    created_at,
    media_description,
    media_video,
  } = contents;

  return (
    <>
      <Helmet>
        <title> {`${dog_name}'s Memorial`} </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {`${dog_name}'s Memorial`}
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Edit Memorial
          </Button>
        </Stack>

        <ProductList products={PRODUCTS} />
      </Container>
    </>
  );
}
