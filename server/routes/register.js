const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const pool = require('../configs/db.config.js');
const router = express.Router();

router.use(cors({
  origin: 'http://localhost:3000'
}));

// checks registration deails once submitted
router.post('/', (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10)

  // checks if username exists
  pool.query('SELECT id FROM users WHERE username = $1', [username])
    .then((usernameExists) => {
      if (usernameExists.rowCount > 0) {
        return res.status(400).json({ error: 'Username already taken' });
      }
      // checks if email already exists
      return pool.query('SELECT id FROM users WHERE email = $1', [email]);
    })
    .then((emailExists) => {
      if (emailExists.rowCount > 0) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      //checks password/confirmation match
    //   if (password !== passwordConfirmation) {
    //     return res.status(400).json({ error: 'Passwords do not match' });
    //   }
    //   return bcrypt.hash(password, 10);
    // })

    // // encrypts password and stores in db
    // .then((hashedPassword) => {
      return pool.query('INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, email, hashedPassword, firstName, lastName]);
    })

    .then((result) => {
      console.log('sucessfully created user',result.rows[0]); 
      //
      
      return res.status(200).json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Failed to register user' });
    });
});

module.exports = router;
