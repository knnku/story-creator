const db = require('../connection');

const getContributionsById = (storyData) => {
  const story_id = storyData;

  const query = `
  SELECT *
  FROM contributions
  WHERE story_id = $1
  `;

  values = [story_id];

  return db.query(query, values)
    .then((data) => {
      // console.log("q-contributions", data.rows); //test
      return data.rows;
    })
    .catch(err => {
      console.error("Error getting contributions:", err);
      throw err; // Propagate the error so it can be handled by the caller.
    });
}

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
    .then((response) => {
      console.log("q-contributions:", response.rows);
      return response.rows[0]; // WL - fixed the loading issue.
    }) // Return the newly added contribution
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

module.exports = { getContributionsById, addContribution, upvoteContribution, approveContribution };
