const express = require("express");
const router = express.Router();
const dogs = require("../db/queries/dog_media");
const userDogs = require("../db/queries/users_dogs");
const dogMedia = require('../db/queries/dog_media')

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

// take the post and insert into create a post
router.post("/new", (req, res) => {
  const {dog_id, media_picture, media_video, media_description} = req.body;
  // insert into db
  return dogMedia
    .createDogMedia(dog_id, media_picture || null, media_video || null, media_description)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.error('Error inserting media:', error);
      res.status(500).json({ message: 'An error occurred while inserting media.' });
    });
});


module.exports = router;