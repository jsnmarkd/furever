import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button, Stack } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
import { HomePageCard } from '../sections/@dashboard/home';
// mock
import POSTS from '../_mock/blog';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import { useAuthContext } from '../providers/AuthProvider';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function MyMemorialsPage() {
  const theme = useTheme();
  const [contents, setContents] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    axios
      .get(`/contents/user/${user.id}`)
      .then((res) => {
        setContents(res.data.contents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dogNamesArr = contents.map((content) => {
    return content.dog_name;
  })

  const colors = ['info', 'warning', 'error', 'success'];
  const dogNames = dogNamesArr.map((dog) => {
    const colorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[colorIndex];
    return (
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title={dog} color={color} />
      </Grid>
    );
  })

  return (
    <>
      <Helmet>
        <title> My Memorials </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            MyMemorials
          </Typography>
          <Button variant="contained" color="info"  size="large"  startIcon={<Iconify icon="eva:plus-fill" />}>
            New Memorial
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {dogNames}
          <Grid item xs={12} md={0} lg={12}>
            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
              <BlogPostsSearch posts={POSTS} />
              <BlogPostsSort options={SORT_OPTIONS} />
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {contents.map((content, index) => (
            <HomePageCard key={content.id} post={content} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
