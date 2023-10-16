/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { getStories, insertStory } = require('../db/queries/q-stories');
const router  = express.Router();

// Endpoint to fetch stories from db.
router.get('/stories', (req, res) => {
  getStories()
    .then(stories => {
      res.json(stories);
    })
    .catch(err => {
      console.error("Error fetching stories:", err);
      // Catch the internal server error.
      res.status(500).json({ error: "Internal server error "});
    })
});

// Endpoint to add new story for admin.
router.post('/stories', (req, res) => {
  const { user_id, main_story, title } = req.body;
  const story_status = false; // Not yet complete as set by admin.
  const date_created = new Date();
  const storyValues = {
    user_id,
    main_story,
    title,
    story_status,
    date_created
  };

  insertStory(storyValues)
    .then (response => {
      res.json({ message: "Your story has now begun!", data: response });
    })
    .catch(err => {
      console.error("Error adding story:", err);
      res.status(500).json({ error: "Internal server error."});
    })
});

module.exports = router;
