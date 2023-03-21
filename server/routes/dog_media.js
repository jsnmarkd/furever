const express = require("express");
const router = express.Router();
const media = require("../db/queries/dog_media");

router.get("/", (req, res) => {
  media.getAllMedia().then((data) => {
    console.log(data);
    res.json({ media: data });
  });
});

module.exports = router;
