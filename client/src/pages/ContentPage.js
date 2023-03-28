import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Button, Stack } from '@mui/material';
import Grid from '@mui/joy/Grid';
// components
import Iconify from '../components/iconify';

import { ContentCard, CommentBox2 } from '../sections/@dashboard/content';

export default function ContentPage() {
  const { id } = useParams();
  const [contents, setContents] = useState([]);
  const [comments, setComments] = useState([]);

  const addComment = (comment) => {
    setComments(comments.concat(comment));
    axios
      .get(`http://localhost:8080/comments/content/${id}`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8080/contents/${id}`),
      axios.get(`http://localhost:8080/comments/content/${id}`),
    ]).then((res) => {
        setContents(res[0].data.contents[0]);
        setComments(res[1].data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
            <Grid item xs={12} sm={6}>
              <ContentCard key={`content-${id}`} content={contents} />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: { xs: 2, sm: 0 } }}>
              <CommentBox2 key={`comments-${id}`} contentId={id} comments={comments} addComment={addComment} />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
}
