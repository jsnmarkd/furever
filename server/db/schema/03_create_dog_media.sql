DROP TABLE IF EXISTS dog_media CASCADE;

CREATE TABLE dog_media (
  id SERIAL PRIMARY KEY,
  media_picture TEXT,
  media_video TEXT,
  media_description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
