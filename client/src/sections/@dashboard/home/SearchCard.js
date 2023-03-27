import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import React, { useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
  posts: PropTypes.array,
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
