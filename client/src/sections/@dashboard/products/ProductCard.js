import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { name, cover, link } = product;
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
      <Link color="inherit" underline="hover" href={link}> <StyledProductImg alt={name} src={cover} sx={{ cursor: 'pointer' }} target="_blank"/></Link>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" href={link} target="_blank" rel="noopener" >
          <Typography variant="subtitle2" noWrap >
          <Link color="primary" component="h3" underline="hover"  sx={{ cursor: 'pointer' }} target="_blank" rel="noopener" >{name}</Link> 
          </Typography>
        </Link>
      </Stack>
    </Card>
  );
}
