import axios from 'axios';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox, Avatar, Button, Container, Typography } from '@mui/material';
import Fingerprint from '@mui/icons-material/Fingerprint';
import UploadDogImg from '../sections/@dashboard/myDogs/UploadDogImg';

// components
import Iconify from '../components/iconify';
import { useAuthContext } from '../providers/AuthProvider';

// ----------------------------------------------------------------------

export default function ProfilePage() {

  // const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user ? user.first_name : '',
    lastName: user ? user.last_name : '',
    username: user ? user.username : '',
    email: user ? user.email : '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    rememberMe: false,
    error: null,
  });

  console.log('user', user)
  
  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }));
  };
  
  
  const [uploadImgURL, setUploadImgURL] = useState(user.user_profile_picture);
  
  
  useEffect(() => {
    axios
    .get(`/users/${user.id}`)
    .then((res) => {
      setUser(res.data.users);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  
  
  
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // console.log(formData.get('user_profile_picture'));
    
    // You can pass formData as a fetch body directly:
    // fetch('/some-api', { method: form.method, body: formData }).then()
    const formJson = Object.fromEntries(formData.entries());
    
  
    formJson.profileUrl = uploadImgURL
    // console.log("Formmmm:", formJson);
    if (formJson.newPassword && formJson.newPassword.length < 6) {
      setFormData((prevData) => ({
        ...prevData,
        error: "New password must be 6 or more characters",
      }));
      return;
    }

    if (formJson.newPassword && formJson.newPassword !== formJson.confirmPassword) {
      setFormData((prevData) => ({
        ...prevData,
        error: "Passwords do not match",
      }));
      return;
    }
      setFormData((prevData) => ({
        ...prevData,
        error: null,
      }));
    
    axios.post(`/users/${user.id}`, formJson).then((response) => {
      // console.log(response);
      setUser(response.data.user);
    })

 
  }


  return (
    user && (
      <>
        <Helmet>
          <title> Profile | Furever </title>
        </Helmet>

        <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Avatar alt={user.username} src={user.user_profile_picture} sx={{ width: 150, height: 150 }} />
          {/* { uploadImgURL && <img src={uploadImgURL} height="100" width="100" alt="Dog Profile" /> }  */}
          <UploadDogImg name="user_profile_picture" setUploadURL={setUploadImgURL} />
          <form onSubmit={handleSubmit}>
            <Stack spacing={3} mt={3} mb={3} sx={{ width: '50%' }} >
              <TextField
                name="firstName"
                label="First Name"
                onChange={handleChange}
                value={formData.firstName}
                variant="filled"
              />
              <TextField
                name="lastName"
                label="Last Name"
                onChange={handleChange}
                value={formData.lastName}
                variant="filled"
              />
              <TextField
                name="username"
                label="Username"
                disabled
                onChange={handleChange}
                value={formData.username}
                variant="filled"
              />
              <TextField
                name="email"
                label="Email address"
                disabled
                onChange={handleChange}
                value={formData.email}
                variant="filled"
              />
              <TextField
                name="oldPassword"
                label="Old Password"
                variant="filled"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                value={formData.oldPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="newPassword"
                label="New Password"
                variant="filled"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                value={formData.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                variant="filled"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                value={formData.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formData.error && <div style={{ color: 'red' }}>{formData.error}</div>}
            </Stack>

            <div>
              <IconButton aria-label="fingerprint" color="secondary" type="submit" variant="contained" >
                Save
                <Fingerprint />
              </IconButton>

              {/* <LoadingButton size="large" type="submit" variant="contained">
          Save
        </LoadingButton> */}
            </div>
          </form>
        </Container>
      </>
    )
  );
}