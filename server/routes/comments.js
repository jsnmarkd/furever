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

module.exports = router;
