const express = require("express");
const router = express.Router();
const media = require("../db/queries/dog_media");

router.get("/", (req, res) => {
  media.getAllMedia().then((data) => {
    
    res.json({ media: data });
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const dogId = req.body.dog_id;
  const mediaPic = req.body.media_picture;
  const mediaVid = req.body.media_video;
  const mediaDes = req.body.media_description;

  // const { dog_name, date_birth, date_passing, dog_description, dog_profile_picture } = req.body
  media
    .createDogMedia(dogId, mediaPic, mediaVid, mediaDes)
    .then((media) => {
      res.status(200).json(media);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
