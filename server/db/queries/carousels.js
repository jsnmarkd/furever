const db = require("../../configs/db.config");

const getCarouselsByUserId = (id) => {
  return db
    .query(
      `
    SELECT * FROM carousels 
    LEFT JOIN users 
    ON carousels.user_id = users.id 
    WHERE carousels.user_id = $1;
    `,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

const addCarousel = (user_id, carousel_pic) => {
  const sql = `INSERT INTO carousels (user_id, carousel_pic)
  VALUES ($1, $2)
  RETURNING *;`;
  return db
    .query(sql, [user_id, carousel_pic])
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};



module.exports = { addCarousel, getCarouselsByUserId };
