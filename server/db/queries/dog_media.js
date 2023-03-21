const db = require("../../configs/db.config");

const getAllMedia = () => {
  return db.query("SELECT * FROM dog_media;").then((data) => {
    return data.rows;
  });
};

const getDogById = (id) => {
  return db.query("SELECT * FROM dogs WHERE id = $1;", [id]).then((data) => {
    return data.rows;
  });
};

module.exports = { getAllMedia, getDogById };
