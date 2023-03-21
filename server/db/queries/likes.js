const db = require("../../configs/db.config");

const getAllLikes = () => {
  return db.query("SELECT * FROM likes;").then((data) => {
    return data.rows;
  });
};

module.exports = { getAllLikes };
