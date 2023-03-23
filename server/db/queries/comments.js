const db = require("../../configs/db.config");

const getCommentsByContentId = (id) => {
  return db
    .query(
      `
      SELECT 
        comments.*,
        users.username,
        users.user_profile_picture
      FROM comments
      LEFT JOIN users 
      ON comments.user_id = users.id  
      WHERE comments.content_id = $1;
      `,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

const postComment = (userId, contentId, comment) => {
  return db.query(`INSERT INTO comments (user_id, content_id, comment) VALUES ($1, $2, $3)`);
}

module.exports = { getCommentsByContentId, postComment };