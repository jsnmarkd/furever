import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
// components

import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import Iconify from '../../../components/iconify';
import { fShortenNumber } from '../../../utils/formatNumber';
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
    media_picture,
    share,
    username,
    user_profile_picture,
    dog_name,
    dog_profile_picture,
    created_at,
    media_description,
    media_video,
  } = content;

  const POST_INFO = [
    { icon: 'eva:heart-fill' },
  ];

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
          {POST_INFO.map((info, index) => (
            <Box
              key={index}
              sx={{
                alignItems: 'center',
                height: 0,
              }}
            >
              <Button>
                <Iconify icon={info.icon} sx={{ width: 35, height: 35, mr: 0.5 }} />
              </Button>
            </Box>
          ))}
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
