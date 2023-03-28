import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import { ThemeProvider } from './theme/ThemeProvider';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { AuthProvider } from './providers/AuthProvider';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  );
}
