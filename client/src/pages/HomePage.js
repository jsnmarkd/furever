import axios from 'axios';
import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Button, Stack } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
import { HomePageCard, SearchCard } from '../sections/@dashboard/home';
import MemorialModal from '../components/MemorialModal';

// sections
import {
  AppWidgetSummary
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
  const [contents, setContents] = useState([]);
  const [query, setQuery] = useState('');

  // Get the user object
  const { user } = useAuthContext();

  useEffect(() => {
    axios
      .get('http://localhost:8080/contents')
      .then((res) => {
        setContents(res.data.contents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fuse = new Fuse(contents, {
    keys: ['dog_name', 'media_description'],
  });
  const results = fuse.search(query);
  const contentResults = results.length > 0 ? results.map(result => result.item) : contents ;

  // console.log('fuse search', results);
  // console.log('contentResults', contentResults);

  const handleOnSearch = ({ currentTarget = {} }) => {
    const { value } = currentTarget;
    setQuery(value);
  }

  const handleOnClick = (value) => {
    
    setQuery(value);
  };

  // console.log('Posts:', POSTS);
  // console.log('contents', contents);

  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <img src="/assets/home_cover_furever.svg" alt="Furever logo and dog" width="1800" height="600" />
        </Stack>
        <Stack direction="row-reverse" alignItems="center" justifyContent="space-between" mb={5}>
          {user && (
            <MemorialModal>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                startIcon={<Iconify icon="eva:plus-fill" />}
                mb={9}
              >
                New Memorial
              </Button>
            </MemorialModal>
          )}
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="#HolidayMoments"
              icon={'ant-design:android-filled'}
              value="#HolidayMoments"
              onClick={handleOnClick}
              sx={{ cursor: 'pointer' }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="#FaveToys"
              color="info"
              icon={'ant-design:apple-filled'}
              value="#FaveToys"
              onClick={handleOnClick}
              sx={{ cursor: 'pointer' }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="#TreatsAndTricks"
              color="warning"
              icon={'ant-design:windows-filled'}
              value="#TreatsAndTricks"
              onClick={handleOnClick}
              sx={{ cursor: 'pointer' }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="#CuddleTime"
              color="error"
              icon={'ant-design:bug-filled'}
              value="#CuddleTime"
              onClick={handleOnClick}
              sx={{ cursor: 'pointer' }}
            />
          </Grid>

          <Grid item xs={12} md={0} lg={12}>
            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
              <SearchCard posts={contents} value={query} onChange={handleOnSearch} />
              <BlogPostsSort options={SORT_OPTIONS} />
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {contentResults.map((content, index) => (
            <HomePageCard post={content} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

