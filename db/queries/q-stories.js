const db = require('../connection');

const getStories= () => {
  const query = 'SELECT * FROM stories';

  // const values = [username]

  return db.query(query)
    .then(data => {
      // console.log('db-query: ', data.rows); //test
      return data.rows;
    });
};

const getStoryById = (storyId) => {
  const query = "SELECT * FROM stories WHERE id = $1";
  const values = [storyId];

  return db.query(query, values).then((data) => {
    return data.rows[0]; // As we expect only one row
  });
};

const insertStory = storyValues => {
  const query = `
    INSERT INTO stories (
      user_id,
      main_story,
      title,
      story_status,
      date_created
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
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
      console.log('db-query: ', data.rows);
      return data.rows;
  });
};

module.exports = { getStories, insertStory, getStoryById };
