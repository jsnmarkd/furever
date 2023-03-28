import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, Link } from '@mui/material';
// mocks_
import { Link as RouterLink } from 'react-router-dom';
import account from '../../../_mock/account';
import { useAuthContext } from '../../../providers/AuthProvider';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    path: '/dashboard/home',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    path: '/dashboard/profile',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    path: '/dashboard/myDogs',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const { user, logout } = useAuthContext();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={user.user_profile_picture || account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.username}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {/* {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))} */}

          <RouterLink to="/dashboard/home" style={{ textDecoration: 'none' }} onClick={handleClose}>
            <Link>
              <MenuItem>Home</MenuItem>
            </Link>
          </RouterLink>

          <RouterLink to="/dashboard/profile" style={{ textDecoration: 'none' }} onClick={handleClose}>
            <Link>
              <MenuItem>Profile</MenuItem>
            </Link>
          </RouterLink>

          <RouterLink to="/dashboard/myDogs" style={{ textDecoration: 'none' }} onClick={handleClose}>
            <Link>
              <MenuItem>MyDogs</MenuItem>
            </Link>
          </RouterLink>


        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
