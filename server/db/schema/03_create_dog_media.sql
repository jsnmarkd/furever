DROP TABLE IF EXISTS dog_media CASCADE;

CREATE TABLE dog_media (
  id SERIAL PRIMARY KEY,
  picture TEXT,
  video TEXT,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
