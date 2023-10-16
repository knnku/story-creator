const db = require('../connection');

const getUser = (username) => {
  const query = 'SELECT * FROM users WHERE username = $1;';
  const values = [username]

  return db.query(query, values)
    .then(data => {
      // console.log('db-query: ', data.rows); //test
      return data.rows;
    });
};

// Return values from add story post to db.
const insertStory = storyValues => {
  const query = `
    INSERT INTO stories (
      user_id,
      main_story,
      title,
      story_status,
      date_created
    ) VALUES ($1, $2, $3, $4, $5) RETURNING *
  `;

  const values = [
    storyValues.user_id,
    storyValues.main_story,
    storyValues.title,
    storyValues.story_status,
    storyValues.date_created
  ];

  return db.query(query, values)
    .then(data => {
      // Return newly added story.
      return data.rows[0];
    });
};

module.exports = { getUser };
