import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import { useState } from 'react';
import useResponsive from '../hooks/useResponsive';
// components

import Iconify from '../components/iconify';
// sections
import LoginForm from '../sections/auth/login/LoginForm';
// client/src/../sections/auth/login/LoginForm.js
// client/src/pages/LoginForm.js
import { useAuthContext } from '../providers/AuthProvider';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const { login } = useAuthContext();
  const [error, setError] = useState(null);

  return (
    <>
      <Helmet>
        <title> Login | Furever </title>
      </Helmet>

      <StyledRoot>
     

        {mdUp && (
          <StyledSection>
          
            <img src="/assets/illustrations/reg_furever_photos.svg" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Furever
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account?{' '}
              <RouterLink to="/register" style={{ textDecoration: 'none' }}>
                <Link variant="subtitle2" component="span">
                  Get started
                </Link>
              </RouterLink>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>
            
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
