import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { SxProps } from '@mui/system';
import { Theme, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useAuthContext } from '../providers/AuthProvider';

const style: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60vw",
  height:'auto' ,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MemorialModal({ children }) {
  const [open, setOpen] = React.useState(false);
  const [dog, setDog] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = useState('');
  const [userDogs, setUserDogs] = useState([]);
  const { user } = useAuthContext();

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDogChange = (event) => {
    setDog(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ dog, description, tags });
  
    // Find the selected dog object
    const selectedDog = userDogs.find((userDog) => userDog.dog_name === dog);
  
    axios
      .post('/memorial/new', {
        dog_id: selectedDog.dog_id,
        dog_name: selectedDog.dog_name,
        description,
      })
      .then((response) => {
        console.log('data from post', response.data);
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // to get dog info for menu
  console.log('front end auth context', user)
  useEffect(() => {
    axios
    .post('/memorial', user)    
    // get dogs
      .then((response) => {
        // show dog names on drop down menu
        setUserDogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  return (
    <div>
      {React.cloneElement(children, { onClick: handleOpen })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Memorial
          </Typography>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="dog-select-label">Dog</InputLabel>
            <Select
              labelId="dog-select-label"
              id="dog-select"
              value={dog}
              onChange={handleDogChange}
            >
              {userDogs.map((userDog) => (
                <MenuItem key={userDog.dog_id} value={userDog.dog_name}>
                  {userDog.dog_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
          />

          {/* <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Tags"
            value={tags}
            onChange={handleTagsChange}
          /> */}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}