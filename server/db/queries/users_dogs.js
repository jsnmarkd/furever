const db = require("../../configs/db.config");

const getAllUsersDogs = () => {
  return db.query("SELECT * FROM users_dogs;").then((data) => {
    return data.rows;
  });
};

const getDogsByUserId = (id) => {
  return db.query(
    `
    SELECT * FROM users_dogs 
    FULL OUTER JOIN dogs 
    ON users_dogs.dog_id = dogs.id 
    WHERE users_dogs.user_id = $1;
    `, [id])
    .then((data) => {
    return data.rows;
  });
};

const getUsersDogs = (id) => {
  return db
  .query(
    `
    SELECT * FROM dogs WHERE user_id = $1
    `, [id]
  )
  .then((result) =>{
    return result.rows[0]
  })
}
module.exports = { getAllUsersDogs, getDogsByUserId, getUsersDogs};
