const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../configs/db.config.js');
const router = express.Router();

// checks registration deails once submitted
router.post('/register', (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  // checks if username exists
  pool.query('SELECT id FROM users WHERE username = $1', [username])
    .then((usernameExists) => {
      if (usernameExists.rowCount > 0) {
        return res.status(400).json({ error: 'Username already taken' });
      }
      // checks if email already exists
      return db.query('SELECT id FROM users WHERE email = $1', [email]);
    })
    .then((emailExists) => {
      if (emailExists.rowCount > 0) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      //checks password/confirmation match
      if (password !== passwordConfirmation) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
      return bcrypt.hash(password, 10);
    })

    // encrypts password and stores in db
    .then((hashedPassword) => {
      console.log('sucesss1', req)
      return db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
    })

    .then((result) => {
      console.log('sucesss', req)
      return res.status(200).json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Failed to register user' });
    });
});


module.exports = router;
