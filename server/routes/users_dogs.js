const express = require("express");
const router = express.Router();
const users_dogs = require("../db/queries/users_dogs");

router.get("/", (req, res) => {
  users_dogs.getAllUsersDogs().then((data) => {
    console.log(data);
    res.json({ users_dogs: data });
  });
});

router.get("/user/:id", (req, res) => {
  const userId = req.params.id
  users_dogs.getDogsByUserId(userId).then((data) => {
    console.log(data);
    res.json({ users_dogs: data });
  });
});

module.exports = router;
