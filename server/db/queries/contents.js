const db = require("../../configs/db.config");

const getAllContent = () => {
  return db
    .query(
      `
      SELECT 
        content_block.*,
        dog_media.*,
        users.*,
        dogs.*,
        COUNT(DISTINCT likes.id) AS like_count,
        COUNT(DISTINCT comments.id) AS comment_count
      FROM 
        content_block
        LEFT JOIN dog_media 
          ON content_block.media_id = dog_media.id
        LEFT JOIN users 
          ON content_block.user_id = users.id 
        LEFT JOIN dogs 
          ON content_block.dog_id = dogs.id
        LEFT JOIN likes 
          ON content_block.id = likes.content_id
        LEFT JOIN comments 
          ON content_block.id = comments.content_id
      GROUP BY 
        content_block.id,
        dog_media.id,
        users.id,
        dogs.id
      ORDER BY content_block.created_at DESC;;
      `
    )
    .then((data) => {
      return data.rows;
    });
};

const getContentByDogId = (id) => {
  return db
    .query(
      `
      SELECT * FROM content_block 
      LEFT JOIN dog_media 
      ON content_block.media_id = dog_media.id
      LEFT JOIN users 
      ON content_block.user_id = users.id 
      LEFT JOIN dogs 
      ON content_block.dog_id = dogs.id 
      WHERE content_block.dog_id = $1;
      `,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

const getContentByUserId = (id) => {
  return db
    .query(
      `SELECT 
        content_block.*,
        dog_media.*,
        users.*,
        dogs.*,
        COUNT(DISTINCT likes.id) AS like_count,
        COUNT(DISTINCT comments.id) AS comment_count
      FROM 
        content_block
        LEFT JOIN dog_media 
          ON content_block.media_id = dog_media.id
        LEFT JOIN users 
          ON content_block.user_id = users.id 
        LEFT JOIN dogs 
          ON content_block.dog_id = dogs.id
        LEFT JOIN likes 
          ON content_block.id = likes.content_id
        LEFT JOIN comments 
          ON content_block.id = comments.content_id
      WHERE
        content_block.user_id = $1
      GROUP BY 
        content_block.id,
        dog_media.id,
        users.id,
        dogs.id;`,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

const getContentById = (id) => {
  return db
    .query(
      `
      SELECT * FROM content_block 
      LEFT JOIN dog_media 
      ON content_block.media_id = dog_media.id
      LEFT JOIN users 
      ON content_block.user_id = users.id 
      LEFT JOIN dogs 
      ON content_block.dog_id = dogs.id 
      WHERE content_block.id = $1;
      `,
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

const addContent = (user_id, dog_id, media_id) => {
  return db.query(
    `INSERT INTO content_block (user_id, dog_id, media_id) VALUES ($1, $2, $3) RETURNING *;`
  ,
  [user_id, dog_id, media_id]).then((data) => {
    return data.rows;
  });
};

module.exports = {
  getAllContent,
  getContentByDogId,
  getContentByUserId,
  getContentById,
  addContent,
};
