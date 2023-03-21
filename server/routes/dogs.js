const express = require("express");
const router = express.Router();
const dogs = require("../db/queries/dogs");

router.get("/", (req, res) => {
  dogs.getAllDogs().then((data) => {
    console.log(data);
    res.json({ dogs: data });
  });
});

module.exports = router;
