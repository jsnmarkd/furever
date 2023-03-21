const express = require('express');
const userQueries = require('../db/queries/users');
const router = express.Router();

// checks registration details once submitted
router.post('/', (req, res, next) => {
  const { username, email, firstName, lastName, password, passwordConfirmation } = req.body;

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
    .then((user) => {
      console.log('New user created:', user.rows[0]);
      return res.status(201).send({ message: 'User created successfully' });
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send({ error: error.message });
    });
});

module.exports = router;
