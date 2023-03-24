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
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
// mock
import POSTS from '../_mock/blog';
// Import useAuthContext hook
import { useAuthContext } from '../providers/AuthProvider';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Page() {
  const theme = useTheme();
  const [contents, setContents] = useState([]);

  // Get the user object
  const { user } = useAuthContext();

  useEffect(() => {
    axios.get('http://localhost:8080/contents')
      .then(res => {
        setContents(res.data.contents);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Memorials
          </Typography>
          {user && (  <Button variant="contained"  size="large" color="info" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Memorial
          </Button>
          )}
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="#Park" icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="#Grooming" color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="#Treats" color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="#Tricks" color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={0} lg={12}>
            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
              <BlogPostsSearch posts={POSTS} />
              <BlogPostsSort options={SORT_OPTIONS} />
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {contents.map((content, index) => <HomePageCard key={content.id} post={content} index={index} />)}
        </Grid>
      </Container>
    </>
  );
}

