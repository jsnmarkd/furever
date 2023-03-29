const express = require("express");
const router = express.Router();
const carousels = require("../db/queries/carousels");




router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  carousels.getCarouselsByUserId(userId).then((data) => {
    res.json({ carousels: data });
  });
});

router.post("/user/:id", (req, res) => {
  const userId = req.body.user_id;
  const carouselPic = req.body.carousel_pic;

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
