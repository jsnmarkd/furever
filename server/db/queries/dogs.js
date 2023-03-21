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

module.exports = { getAllDogs, getDogById };
