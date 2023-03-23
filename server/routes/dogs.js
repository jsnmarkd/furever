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
  

})
.catch((err) => {
  res.status(500).json({ error: err.message });
});
});


// router.get("/", (req, res) => {
//   const user = req.session.user
//   if (!user) {
//     res.redirect('/login')
//   }
//   const id = req.params.id;
//   userQueries
//     .getUserById(id)
//     .then((resources) => {
//       const templateVars = {
//         user: user,
//         resources: resources,
//         hideUserButtons: false
//       };
//       res.render(`edit-profile`, templateVars);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

// router.post("/", (req, res) => {
//   let user = req.session.user
//   const dogName = req.body.dog_name
//   const dogBio = req.body.dog_description
//   const dogBirth = req.body.date_birth
//   const dogDeath = req.body.date_passing
//   const dogImg = req.body.dog_profile_picture
//     .updateDog(req.body.bio, user.email)
//     .then((results) => {
//       req.session.user.bio = req.body.bio;
//       req.session.save
//       res.redirect('/api/edit');
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

module.exports = router;
