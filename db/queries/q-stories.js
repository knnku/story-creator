const db = require('../connection');

const getStories= () => {
  const query = 'SELECT * FROM stories';
  const values = [username]

  return db.query(query, values)
    .then(data => {
      console.log('db-query: ', data.rows); //test
      return data.rows;
    });
};

const insertStory = (values) => {
  const query = `
    INSERT INTO stories (
    story_id,
    votes,
    story_proposal,
    date_created,
    proposal_status
  ) VALUES ($1, $2, $3, $4, $5)`;

  const values = [values.story_id, values.votes, values.story_proposal, values.date_created, values.proposal_status]
  return db.query(query, values)
    .then(data => {
      console.log('db-query: ', data.rows); //test
      return data.rows;
    });
};



module.exports = { getStories, insertStory };
