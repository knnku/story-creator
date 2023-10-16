/**
 * Assumptions for team at this point:
 * 1. Each story has a unique ID.
 * 2. When contributions are added, they're appended to the end of the main_story with two newline breaks.
 * 3. The `story_id` in `insertStory` is assumed to be unique and either generated externally or input manually.
 * 4. Contributions are simple text additions to the main story without tracking individual contributors.
 */

const db = require('../connection');

/**
 * Fetches all stories from the database.
 * @returns {Promise<Array>} An array of all stories.
 */
const getStories = () => {
  const query = 'SELECT * FROM stories';
  return db.query(query)
    .then(data => {
      return data.rows;
    });
};

/**
 * Fetches a specific story by its ID from the database.
 * @param {Number} storyId - The ID of the story to be fetched.
 * @returns {Promise<Object>} The story object with the specified ID.
 */
const getStoryById = (storyId) => {
  const query = 'SELECT * FROM stories WHERE id = $1';
  const values = [storyId];
  return db.query(query, values)
    .then(data => {
      return data.rows[0];  // As we expect only one row
    });
};

/**
 * Adds a contribution (appended text) to an existing story's main_story column in the database.
 * @param {Number} storyId - The ID of the story to be updated.
 * @param {String} contribution - The text to be appended to the story.
 * @returns {Promise<Array>} An array of updated stories (though we expect only one story to be updated).
 */
const addContributionToStory = (storyId, contribution) => {
  const query = `
    UPDATE stories
    SET main_story = CONCAT(main_story, '\n\n', $2)
    WHERE id = $1
  `;
  const values = [storyId, contribution];
  return db.query(query, values)
    .then(data => {
      return data.rows;
    });
};

/**
 * Inserts a new story into the database.
 * @param {Object} storyValues - An object containing the necessary values to create a new story.
 * @returns {Promise<Array>} An array of inserted stories (though we expect only one story to be inserted).
 */
const insertStory = (storyValues) => {
  const query = `
    INSERT INTO stories (
      story_id,
      votes,
      story_proposal,
      date_created,
      proposal_status
    ) VALUES ($1, $2, $3, $4, $5)`;
  const values = [storyValues.story_id, storyValues.votes, storyValues.story_proposal, storyValues.date_created, storyValues.proposal_status];
  return db.query(query, values)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getStories, getStoryById, addContributionToStory, insertStory };
