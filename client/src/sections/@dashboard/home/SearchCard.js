import PropTypes from 'prop-types';
import React from 'react';

// @mui
import { InputAdornment, TextField } from '@mui/material';
// components
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default function BlogPostsSearch({ value, onChange }) {
  return (
        <TextField
          placeholder="Search post..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          value={value}
          onChange={onChange}
        />
  );
}
