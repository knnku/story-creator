DROP TABLE IF EXISTS stories CASCADE;

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  main_story TEXT NOT NULL,
  title VARCHAR(255) ,
  story_status boolean,
  date_created timestamp
);
