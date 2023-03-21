const db = require("../../configs/db.config");

const getAllContent = () => {
  return db.query("SELECT * FROM content_block;").then((data) => {
    return data.rows;
  });
};

const getContentByDogId = (id) => {
  return db.query("SELECT * FROM content_block WHERE dog_id = $1;", [id]).then((data) => {
    return data.rows;
  });
};

const getContentByUserId = (id) => {
  return db.query("SELECT * FROM content_block WHERE user_id = $1;", [id]).then((data) => {
    return data.rows;
  });
};

module.exports = { getAllContent, getContentByDogId, getContentByUserId };
