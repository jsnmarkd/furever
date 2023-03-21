const db = require("../../configs/db.config");

const getAllContent = () => {
  return db
    .query(
      `
      SELECT * FROM content_block
      FULL OUTER JOIN dog_media 
      ON content_block.media_id = dog_media.id
      FULL OUTER JOIN users 
      ON content_block.user_id = users.id 
      FULL OUTER JOIN dogs 
      ON content_block.dog_id = dogs.id
      ;
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
  return db.query(`SELECT * FROM content_block WHERE user_id = $1;`, [id]).then((data) => {
    return data.rows;
  });
};

module.exports = { getAllContent, getContentByDogId, getContentByUserId };
