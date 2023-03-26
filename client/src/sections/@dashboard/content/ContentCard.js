import axios from 'axios';
import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
// components

import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

// ----------------------------------------------------------------------

ContentCard.propTypes = {
  content: PropTypes.object,
};

export default function ContentCard({ content }) {
  const {
    id,
    media_picture,
    user_id,
    username,
    user_profile_picture,
    dog_name,
    dog_profile_picture,
    media_description,
  } = content;

  const content_id = id

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    axios
      .get(`/likes/liked?user_id=${user_id}&content_id=${content_id}`)
      .then((res) => {
        setLiked(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id, content_id]);

  const handleLike = () => {
    axios({ method: 'post', data: { user_id, content_id }, url: '/likes'})
      .then(() => {
        setLiked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnlike = () => {
    axios
      .delete('/likes', { data: { user_id, content_id } })
      .then(() => {
        setLiked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={dog_name} src={media_picture} />
        <Tooltip title={username} arrow>
          <StyledAvatar alt={username} src={user_profile_picture} sx={{ ...{ left: 24, width: 40, height: 40 } }} />
        </Tooltip>
        <Tooltip title={dog_name} arrow>
          <StyledAvatar alt={dog_name} src={dog_profile_picture} sx={{ ...{ left: 70, width: 40, height: 40 } }} />
        </Tooltip>
        <StyledInfo>
          <Box sx={{ alignItems: 'center', height: 0 }}>
            {liked ? (
              <Button onClick={handleUnlike}>
                <Iconify icon={'eva:heart-fill'} sx={{ width: 35, height: 35, mr: 0.5 }} />
              </Button>
            ) : (
              <Button onClick={handleLike}>
                <Iconify icon={'eva:heart-outline'} sx={{ width: 35, height: 35, mr: 0.5 }} />
              </Button>
            )}
          </Box>
        </StyledInfo>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {media_description}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'brown',
              }}
            />
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
