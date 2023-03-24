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

const createDogMedia = (dogId, mediaPicture, mediaVideo, mediaDescription) => {
  return db.query(
    "INSERT INTO dog_media (dog_id, media_picture, media_video, media_description, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *;",
    [dogId, mediaPicture, mediaVideo, mediaDescription]
  ).then((data) => {
    return data.rows;
  });
};

const getDogMediaByDogId = (dogId) => {
  return db.query(
    "SELECT * FROM dog_media WHERE dog_id = $1;",
    [dogId]
  ).then((data) => {
    return data.rows;
  });
};



module.exports = { getAllMedia, getDogById, createDogMedia, getDogMediaByDogId };
