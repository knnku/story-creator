const db = require('../connection');

const addContribution = (contributionData) => {
  const query = `
    INSERT INTO contributions (
      story_id,
      user_id,
      votes,
      story_proposal,
      date_created,
      proposal_status
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    contributionData.story_id, // ID of the story the contribution belongs to
    contributionData.user_id || null, // ID of the user (can be null for anonymous)
    0, // Initial votes always start at 0
    contributionData.story_proposal, // The proposed contribution text
    new Date(), // Current date and time
    false // Initial proposal status is always false (not yet approved)
  ];

  return db.query(query, values)
    .then(response => response.rows[0]) // Return the newly added contribution
    .catch(err => {
      console.error("Error adding contribution:", err);
      throw err; // Propagate the error so it can be handled by the caller
    });
};

const upvoteContribution = (contribution_id) => {
  const query = `
    UPDATE contributions
    SET votes = votes + 1
    WHERE id = $1
    RETURNING *;
  `;

  const values = [contribution_id];

  return db.query(query, values)
    .then(data => data.rows[0])
    .catch(err => console.error("Error upvoting contribution:", err));
};

const approveContribution = (contribution_id) => {
  const query = `
    UPDATE contributions
    SET proposal_status = true
    WHERE id = $1
    RETURNING *;
  `;

  const values = [contribution_id];

  return db.query(query, values)
    .then(data => data.rows[0])
    .catch(err => console.error("Error approving contribution:", err));
};

module.exports = { addContribution, upvoteContribution, approveContribution };

// Junk code:

// const getStories = () => {
//   const query = 'SELECT * FROM stories';
//   return db.query(query)
//     .then(data => {
//       return data.rows;
//     });
// };


// const addContributionToStory = (storyId, contribution) => {
//   const query = `
//     UPDATE stories
//     SET main_story = CONCAT(main_story, '\n\n', $2)
//     WHERE id = $1
//   `;

//   const values = [storyId, contribution];

//   return db.query(query, values)
//     .then(data => {
//       return data.rows;
//     });
// };

// const insertStory = (storyValues) => {
//   const query = `
//     INSERT INTO stories (
//       story_id,
//       votes,
//       story_proposal,
//       date_created,
//       proposal_status
//     ) VALUES ($1, $2, $3, $4, $5)`;

//     const values = [
//     storyValues.story_id,
//     storyValues.votes,
//     storyValues.story_proposal,
//     storyValues.date_created,
//     storyValues.proposal_status
//   ];

//   return db.query(query, values)
//     .then(data => {
//       return data.rows;
//     });
// };
