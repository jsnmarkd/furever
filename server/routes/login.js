const express = require('express');
const userQueries = require('../db/queries/users');
const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;
  
  userQueries
    .getUserByEmail(email)
    .then((user) => {
      if (!user) {
        throw new Error('Email not found');
      } else if (user.password !== password) {
        throw new Error('Incorrect password');
      } else {
        const loggedInUser = user.rows[0];
        console.log('User logged in:', loggedInUser);
        return res.status(200).send({ user: loggedInUser, message: 'User successfully logged in' });
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send({ error: error.message });
    });
});

module.exports = router;
