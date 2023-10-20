DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL, -- STRETCH: if user delete, delete stories on cascade.
  username VARCHAR(50) NOT NULL
);
