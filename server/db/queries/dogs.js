const db = require("../../configs/db.config");

const getAllDogs = () => {
  return db.query("SELECT * FROM dogs;").then((data) => {
    return data.rows;
  });
};

const getDogById = (id) => {
  return db.query("SELECT * FROM dogs WHERE id = $1;", [id]).then((data) => {
    return data.rows;
  });
};

const addDog = (dog_name, dog_description, dog_profile_picture, date_birth, date_passing) => {
  const sql = `INSERT INTO dogs (dog_name, dog_description, dog_profile_picture, date_birth, date_passing)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`;
  return db
    .query(sql, [dog_name, dog_description, dog_profile_picture, date_birth, date_passing ])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { getAllDogs, getDogById, addDog };
