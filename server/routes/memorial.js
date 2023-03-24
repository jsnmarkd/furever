const express = require("express");
const router = express.Router();
const dogs = require("../db/queries/dog_media");
const userDogs = require("../db/queries/users_dogs");


router.get("/", (req, res) => {
  console.log('req', req.body)
  dogs.getAllDogs().then((data) => {
  });
}); 


router.post("/", (req, res) => {
  console.log('req body inside post req.', req.body);
  const userId = req.body.id;
  console.log('user id inside req', userId);
  return userDogs
  .getDogsByUserId(userId)
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((error) => {
    console.error('Error fetching dogs:', error);
    res.status(500).json({ message: 'An error occurred while fetching dogs.' });
  });
});

router.post("/new", (req, res) => {
  console.log('req', req.body)
}); 

// router.post('/', (req, res) => {
//   const { username, firstName, lastName, password, passwordConfirmation } = req.body;
//   const email = req.body.email.toLowerCase()

//   userQueries
//     .userExists(username, email)
//     .then((userExists) => {
//       if (userExists && userExists.email === email) {
//         throw new Error('Email already exists');
//       } else if (userExists && userExists.username === username) {
//         throw new Error('Username already exists');
//       } else if (password.length < 6) {
//         throw new Error('Password must be 6 characters or longer')
//       } 
//         return userQueries.addUser(username, email, password, firstName, lastName);
//     })
//     .then((result) => {
//       const newUser = result.rows[0]
//       console.log('New user created:', newUser);
//       return res.status(200).send({ user: newUser, message: 'User successfully created' });
//     })
//     .catch((error) => {
//       console.error(error);
//       return res.status(400).send({ error: error.message });
//     });
// });

module.exports = router;