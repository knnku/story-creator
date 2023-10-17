const express = require('express');
const {
  getStories,
  getStoryById,
  addContributionToStory
} = require('../db/queries/q-stories');
const router = express.Router();

// Endpoint to retrieve all stories.
router.get('/stories', (req, res) => {
  getStories()
    .then(stories => {
      res.json(stories);
    })
    .catch(err => {
      console.error("Error fetching stories:", err);
      res.status(500).json({ error: "Internal server error "});
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

// Endpoint to add a contribution to a specific story.
router.post('/stories/:id/contribute', (req, res) => {
  const storyId = req.params.id;
  const contribution = req.body.contribution;

  addContributionToStory(storyId, contribution)
    .then(response => {
      res.json({ message: "Contribution added successfully!" });
    })
    .catch(err => {
      console.error(`Error adding contribution to story with ID ${storyId}:`, err);
      res.status(500).json({ error: "Internal server error "});
    })
});

module.exports = router;
