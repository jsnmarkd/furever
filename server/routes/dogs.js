const express = require("express");
const router = express.Router();
const dogs = require("../db/queries/dogs");

router.get("/", (req, res) => {
  // const userId = req.sessions.id GET USER ID FROM SESSION
  dogs.getAllDogs().then((data) => {
    console.log(data);
    res.json({ dogs: data });
  });
});

router.post("/dogs/create", (req, res) => {
console.log(req.body);
res.json(req.body)

});

module.exports = router;
