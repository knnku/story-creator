/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { getStories, insertStory, getStoryById } = require('../db/queries/q-stories');
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
      res.json({
        success: true,
        message: "Your story has now begun!",
        story: {
          id: response.id, // assuming the inserted story has an 'id' attribute
          user_id: user_id,
          main_story: main_story,
          title: title,
          story_status: story_status,
          date_created: date_created
        }
      });
    })
    .catch(err => {
      console.error("Error adding story:", err);
      res.status(500).json({ error: "Internal server error."});
    })
});

// Endpoint to retrieve a specific story by ID.
router.get('/stories/:id', (req, res) => {
  const storyId = req.params.id;

  getStoryById(storyId)
    .then(story => {
      if (story) {
        res.json(story);
      } else {
        res.status(404).json({ error: "Story not found" });
      }
    })
    .catch(err => {
      console.error(`Error fetching story with ID ${storyId}:`, err);
      res.status(500).json({ error: "Internal server error "});
    })
});

module.exports = router;
