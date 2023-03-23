const express = require("express");
const router = express.Router();
const users = require("../db/queries/users");

router.get("/", (req, res) => {
  users.getAllUsers().then((data) => {
    res.json({ users: data });
  });
});

module.exports = router;
