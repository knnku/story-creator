DROP TABLE IF EXISTS contributions CASCADE;

CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER references stories ON DELETE CASCADE,
  user_id INTEGER references users ON DELETE CASCADE, --can be defaulted to anonymous
  votes INTEGER,
  story_proposal TEXT NOT NULL,
  date_created TIMESTAMP,
  proposal_status BOOLEAN
);
