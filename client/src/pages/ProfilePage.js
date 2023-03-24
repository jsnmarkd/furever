import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Avatar, Button, Container } from '@mui/material';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { LoadingButton } from '@mui/lab';
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
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    rememberMe: false,
    error: null,
  });

  const handleChange = (event) => {
    setUser((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (formData.password !== formData.passwordConfirmation) {
  //     setFormData((prevData) => ({ ...prevData, error: 'Passwords do not match' }));
  //     return;
  //   }
  //   const emailRegex = /\S+@\S+\.\S+/;
  //   if (!emailRegex.test(formData.email)) {
  //     setFormData((prevData) => ({ ...prevData, error: 'Invalid email address' }));
  //     return;
  //   }
  //   setFormData((prevData) => ({ ...prevData, error: null }));
  //   axios
  //     .post('http://localhost:8080/register', formData)
  //     .then((response) => {
  //       console.log(response.data);
  //       const { username, email, firstName, lastName, password, passwordConfirmation } = formData; // Get the user data from the form data
  //       register(response.data.user.id, username, email, firstName, lastName, password, passwordConfirmation); // Call the register function with the user data
  //       navigate('/dashboard', { replace: true });
  //     })
  //     .catch((error) => {
  //       console.error('error', error.response.data);
  //       setFormData((prevData) => ({ ...prevData, error: error.response.data.error }));
  //     });
  // };

  const [uploadImgURL, setUploadImgURL] = useState('');


  useEffect(() => {
    axios
      .get(`/users/${user.id}`)
      .then((res) => {
        setUser(res.data.users[0]);
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
    console.log("Formmmm:", formJson);

    axios.post(`/users/${user.id}`, formJson).then((response) => {
      console.log(response);
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
          <Avatar alt={user.username} src={user.user_profile_picture} sx={{ width: 150, height: 150 }} />
          {/* { uploadImgURL && <img src={uploadImgURL} height="100" width="100" alt="Dog Profile" /> }  */}
          <UploadDogImg name="user_profile_picture" setUploadURL={setUploadImgURL} />
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                name="firstName"
                label="First Name"
                onChange={handleChange}
                value={user.first_name}
                variant="filled"
              />
              <TextField
                name="lastName"
                label="Last Name"
                onChange={handleChange}
                value={user.last_name}
                variant="filled"
              />
              <TextField
                name="username"
                label="Username"
                onChange={handleChange}
                value={user.username}
                variant="filled"
              />
              <TextField
                name="email"
                label="Email address"
                onChange={handleChange}
                value={user.email}
                variant="filled"
              />
              <TextField
                name="password"
                label="Password"
                variant="filled"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                value={user.password}
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
            </Stack>

            <div>
              <IconButton aria-label="fingerprint" color="secondary" type="submit" variant="contained">
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
