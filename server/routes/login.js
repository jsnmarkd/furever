const express = require('express');
const userQueries = require('../db/queries/users');
const router = express.Router();
const bcrypt = require('bcryptjs');


router.post('/', (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password
  
  userQueries
  .getUserByEmail(email)
  .then((result) => {
    if (!result) {
      res.status(400).send({ error: 'Email not found' });
    }
    return userQueries
    .login(email, password);
  })
  .then((user) => {
    const loggedUser = user;
    return res.status(200).send({ user: loggedUser, message: 'User successfully logged in' });
  })
  .catch((error) => {
    res.status(400).send({ error: 'Password does not match ' });
  });
});


module.exports = router;
