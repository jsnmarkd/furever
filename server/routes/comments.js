const express = require("express");
const router = express.Router();
const comments = require("../db/queries/comments");

router.get("/content/:id", (req, res) => {
  const id = req.params.id;
  comments.getCommentsByContentId(id).then((data) => {
    console.log(data);
    res.json({ comments: data });
  });
});

router.post("/content/:id", (req, res) => {
  const userId = 1;
  const { contentId, comment } = req.body.comment;
  console.log(req.body);
  comments.postComment(userId, contentId, comment).catch(err => console.log(err));
});

module.exports = router;
