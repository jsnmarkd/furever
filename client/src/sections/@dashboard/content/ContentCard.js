import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
// components

import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
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

// ----------------------------------------------------------------------

ContentCard.propTypes = {
  content: PropTypes.object,
};

export default function ContentCard({ content }) {
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
  } = content
  return (
    <Card>
      <Box sx={{ pt: '40%', position: 'relative' }}>
        <StyledProductImg alt={dog_name} src={media_picture} />
        <Tooltip title={username} arrow >
            <StyledAvatar
              alt={username}
              src={user_profile_picture}
              sx={{ ...{ left: 24, width: 40, height: 40 } }}
            />
        </Tooltip>
        <Tooltip title={dog_name} arrow >
            <StyledAvatar
              alt={dog_name}
              src={dog_profile_picture}
              sx={{ ...{ left: 70, width: 40, height: 40 } }}
            />
        </Tooltip>
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
            >
              hey
            </Typography>
            &nbsp;
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
