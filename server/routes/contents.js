const express = require("express");
const router = express.Router();
const content = require("../db/queries/content");

router.get("/", (req, res) => {
  media.getAllContent().then((data) => {
    console.log(data);
    res.json({ content: data });
  });
});

router.get("/dog/:id", (req, res) => {
  const dogId = req.params.id;
  content.getContentByDogId(dogId).then((data) => {
    console.log(data);
    res.json({ content: data });
  });
});

router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  content.getContentByUserId(userId).then((data) => {
    console.log(data);
    res.json({ content: data });
  });
});

module.exports = router;
