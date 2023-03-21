const express = require('express');
const userQueries = require('../db/queries/users');
const router = express.Router();

// checks registration details once submitted
router.post('/', (req, res) => {
  const { username, email, firstName, lastName, password, passwordConfirmation } = req.body;

  userQueries
    .userExists(username, email)
    .then((userExists) => {
      if (userExists && userExists.email === email) {
        return res.status(400).send({ error: 'Email already exists' });
      } else if (userExists && userExists.username === username) {
        return res.status(400).send({ error: 'Username already exists' });
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
      return res.status(500).send({ error: 'Server error' });
    });
});

module.exports = router;
