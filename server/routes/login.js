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
        const { username, email, firstName, lastName } = user;
        return res.status(200).send({ username, user_profile_picture, email, firstName, lastName });
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send({ error: error.message });
    });
});

module.exports = router;