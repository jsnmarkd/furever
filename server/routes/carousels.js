const express = require("express");
const router = express.Router();
const carousels = require("../db/queries/carousels");


router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  carousels.getCarouselsByUserId(userId).then((data) => {
    res.json({ carousels: data });
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const userId = req.body.user_id;
  const carouselPic = req.body.carousel_pic;

  // const { dog_name, date_birth, date_passing, dog_description, dog_profile_picture } = req.body
  carousels
    .addCarousel(userId, carouselPic)
    .then((carousel) => {
      res.status(200).json(carousel);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


module.exports = router;
