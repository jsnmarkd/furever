const db = require("../../configs/db.config");

const getAllLikes = () => {
  return db.query("SELECT * FROM likes;").then((data) => {
    return data.rows;
  });
};

const likedByUser = (user_id, content_id) => {
  return db.query(
    `SELECT COUNT(*) FROM likes WHERE user_id = $1 AND content_id = $2`,
    [user_id, content_id]
  ).then((data) => {
    return data.rows;
  });
};

const addLike = (user_id, content_id) => {
  const sql = `INSERT INTO likes (user_id, content_id)
  VALUES ($1, $2)
  RETURNING *;`;
  return db
    .query(sql, [user_id, content_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const deleteLike = (user_id, content_id) => {
  const sql = `DELETE FROM likes WHERE user_id = $1 AND content_id = $2;`;
  return db
    .query(sql, [user_id, content_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getAllLikes, addLike, likedByUser, deleteLike };
