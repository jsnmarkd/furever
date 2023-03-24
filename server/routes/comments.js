const express = require("express");
const router = express.Router();
const comments = require("../db/queries/comments");

router.get("/content/:id", (req, res) => {
  const id = req.params.id;
  comments.getCommentsByContentId(id).then((data) => {
    // console.log(data);
    res.json({ comments: data });
  });
});

router.post("/content/:id", (req, res) => {
  console.log(req.body);

  const userId = req.body.user_id;
  const contentId = req.body.content_id;
  const comment = req.body.comment;
  
  comments.addComment(userId, contentId, comment).then((comment) => {
    res.status(200).json(comment)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  });
});

module.exports = router;
