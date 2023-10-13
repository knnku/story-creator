DROP TABLE IF EXISTS stories CASCADE;

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT references users ON DELETE CASCADE,
  main_story TEXT NOT NULL,
  title VARCHAR(255) ,
  story_status BOOLEAN,
  date_created TIMESTAMP,
  date_completed DATE
);
