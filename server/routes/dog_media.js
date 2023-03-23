const express = require("express");
const router = express.Router();
const media = require("../db/queries/dog_media");

router.get("/", (req, res) => {
  media.getAllMedia().then((data) => {
    
    res.json({ media: data });
  });
});

module.exports = router;
