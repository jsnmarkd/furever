import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
// components
import Iconify from '../components/iconify';

import { ContentCard, CommentBox2 } from '../sections/@dashboard/content';

export default function ContentPage() {
  const { id } = useParams();
  const [contents, setContents] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

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
  }, []);
  console.log("contents:",contents);
  console.log("comments:",comments);

  const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.vars.palette.text.tertiary,
  }));

  const addComment = (comment) => {
    setComments((prev) => [...prev, comment]);
  };

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
              <ContentCard key={id} content={contents} />  
          </Grid>
          <Grid xs={6}>
              <CommentBox2 key={id} contentId={id} comments={comments} addComment={addComment} />
          </Grid>
        </Grid>
        </Container>
      </Container>
    </>
  );
}
