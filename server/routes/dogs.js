const express = require("express");
const router = express.Router();
const dogs = require("../db/queries/dogs");

router.get("/", (req, res) => {
  // const userId = req.sessions.id GET USER ID FROM SESSION
  dogs.getAllDogs().then((data) => {
  
    res.json({ dogs: data });
  });
}); 

router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  dogs.getDogsByUserId(userId).then((data) => {
    res.json({ dogs: data });
  });
});

router.post("/", (req, res) => {
  const dogName = req.body.dog_name
  const dogBio = req.body.dog_description
  const dogBirth = req.body.date_birth
  const dogDeath = req.body.date_passing
  const dogImg = req.body.dog_profile_picture
  const dogUserId = req.body.user_id

  // const { dog_name, date_birth, date_passing, dog_description, dog_profile_picture } = req.body
  dogs.addDog(dogName,dogBio, dogImg, dogBirth, dogDeath, dogUserId).then((newDog) => {
    res.status(200).json(newDog)
  

})
.catch((err) => {
  res.status(500).json({ error: err.message });
});
});





// router.post("/", (req, res) => {


//  const properties = {
//   width: 500,
//   height: 500,
//   videoDuration: 15,
//   slideDuration: 3000,
//   transitionDuration: 1000,
//   videos: ['beach-boat', '3dogs', 'reindeer'],
// } = req.body

//  dogs.Slideshow().then((newSlideshow) => {
//    res.status(200).json(newSlideshow)
 

// })
// .catch((err) => {
//  res.status(500).json({ error: err.message });
// });
// });
















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
