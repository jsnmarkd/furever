DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS urls CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  user_profile_picture TEXT,
  bio TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);