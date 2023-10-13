DROP TABLE IF EXISTS contributions CASCADE;

CREATE TABLE contributions (
  id SERIAL INT NOT NULL,
  story_id INT NOT NULL,
  user_id INT NOT NULL, --can be defaulted to anonymous
  votes INT,
  story_proposal TEXT NOT NULL,
  date_created TIMESTAMP,
  proposal_status BOOLEAN
);
