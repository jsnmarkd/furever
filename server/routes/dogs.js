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

router.post("/", (req, res) => {
   console.log(req.body);
  const dogName = req.body.dog_name
  const dogBio = req.body.dog_description
  const dogBirth = req.body.date_birth
  const dogDeath = req.body.date_passing
  const dogImg = req.body.dog_profile_picture

  // const { dog_name, date_birth, date_passing, dog_description, dog_profile_picture } = req.body
  dogs.addDog(dogName,dogBio, dogImg, dogBirth, dogDeath ).then((newDog) => {
    res.status(200).json(newDog)
  // console.log(req.body);
  
  
  console.log(dogName, dogBirth, dogDeath, dogImg);
})
.catch((err) => {
  res.status(500).json({ error: err.message });
});
});

module.exports = router;
