DROP TABLE IF EXISTS dogs CASCADE;

CREATE TABLE dogs (
  id SERIAL PRIMARY KEY,
  dog_name VARCHAR(255) NOT NULL,
  dog_description TEXT,
  dog_profile_picture TEXT,
  date_birth DATE,
  date_passing DATE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
