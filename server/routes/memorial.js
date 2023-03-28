const express = require("express");
const router = express.Router();
const dogs = require("../db/queries/dog_media");
const userDogs = require("../db/queries/dogs");
const dogMedia = require('../db/queries/dog_media');

// sends user dogs to front end
router.post("/", (req, res) => {
  const userId = req.body.id;
  console.log('user id inside req', userId);
  return userDogs
  .getDogsByUserId(userId)
  .then((result) => {
    console.log('backend dogs reuslt', result)
    res.status(200).json(result);
  })
  .catch((error) => {
    console.error('Error fetching dogs:', error);
    res.status(500).json({ message: 'An error occurred while fetching dogs.' });
  });
});

// take the post and insert into create a post
router.post("/new", (req, res) => {
  const { dog_id, description, uploadImgURL, isVideo } = req.body;
  console.log('data sent from new memorial form to backend', req.body);

  // Assign uploadImgURL to media_video or media_picture based on isVideo
  const media_picture = isVideo ? null : uploadImgURL;
  const media_video = isVideo ? uploadImgURL : null;
  const media_description = description;

  // insert into db
  return dogMedia
    .createDogMedia(dog_id, media_picture, media_video, media_description)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.error('Error inserting media:', error);
      res.status(500).json({ message: 'An error occurred while inserting media.' });
    });
});


module.exports = router;