const express = require("express");
const router = express.Router();
const likes = require("../db/queries/likes");

router.get("/", (req, res) => {
  likes.getAllLikes().then((data) => {
   
    res.json({ likes: data });
  });
});

// Example
// http://localhost:8080/liked?user_id=1&content_id=1

router.get('/liked', (req, res) => {
  const userId = req.query.user_id;
  const contentId = req.query.content_id;

  likes.likedByUser(userId, contentId)
    .then((data) => {
      const count = parseInt(data[0].count);
      res.json(count > 0); //returns true if count > 0 else false
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
})

router.post("/", (req, res) => {
  const userId = req.body.user_id;
  const contentId = req.body.content_id;

  likes.addLike(userId, contentId)
    .then((like) => {
      res.status(200).json(like);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/", (req, res) => {
  const userId = req.body.user_id;
  const contentId = req.body.content_id;

  likes.deleteLike(userId, contentId)
    .then((like) => {
      res.status(200).json(like);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
