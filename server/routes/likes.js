const express = require("express");
const router = express.Router();
const likes = require("../db/queries/likes");

router.get("/", (req, res) => {
  likes.getAllLikes().then((data) => {
   
    res.json({ likes: data });
  });
});

module.exports = router;
