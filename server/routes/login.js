const express = require('express');
const userQueries = require('../db/queries/users');
const router = express.Router();
const bcrypt = require('bcryptjs');

// router.post('/', (req, res) => {
//   const { email, password } = req.body;
  
//   userQueries
//     .getUserByEmail(email)
//     .then((user) => {
//       if (!user) {
//         throw new Error('Email not found');
//       } else if (user.password !== password) {
//         throw new Error('Incorrect password');
//       } else {
//         return 
//         const loggedInUser = user.rows[0];
//         console.log('User logged in:', loggedInUser);
//         return res.status(200).send({ user: loggedInUser, message: 'User successfully logged in' });
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       return res.status(400).send({ error: error.message });
//     });
// });

//checks login credentials then
// does query lo
router.post('/', (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password
  console.log('reqbdy',req.body)
  userQueries
  .getUserByEmail(email)
  .then((result) => {
    if (!result) {
      throw new Error('Email not found');
    }
    return userQueries.login(email, password);
  })
  .then((user) => {
    const loggedUser = user;
    console.log('New user logged:', loggedUser);
    return res.status(200).send({ user: loggedUser, message: 'User successfully logged in' });
  })
  .catch((error) => {
    console.log(error);
    res.status(400).send({ error: 'Password does not match or email not found' });
  });
});






module.exports = router;
