import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('USER INFO', { firstName, lastName, username, email, password, password_confirmation});
    axios.post('http://localhost:8080/register', {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('error1',error.response.data);
    });
    
  };
  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">Re-Enter Password:</label>
          <input
            type="password_confirmation"
            id="password_confirmation"
            value={password_confirmation}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
