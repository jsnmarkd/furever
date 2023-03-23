const express = require('express');
const userQueries = require('../db/queries/users');
const router = express.Router();

// checks registration details once submitted
router.post('/', (req, res, next) => {
  const { username, firstName, lastName, password, passwordConfirmation } = req.body;
  const email = req.body.email.toLowerCase()

  userQueries
    .userExists(username, email)
    .then((userExists) => {
      if (userExists && userExists.email === email) {
        throw new Error('Email already exists');
      } else if (userExists && userExists.username === username) {
        throw new Error('Username already exists');
      } else {
        return userQueries.addUser(username, email, password, firstName, lastName);
      }
    })
    .then((result) => {
      const newUser = result.rows[0]
      console.log('New user created:', newUser);
      return res.status(200).send({ user: newUser, message: 'User successfully created' });
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send({ error: error.message });
    });
});

module.exports = router;
