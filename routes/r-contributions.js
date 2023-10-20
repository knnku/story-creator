const express = require('express');
const {
  getContributionsById,
  addContribution,
  upvoteContribution,
  approveContribution
} = require('../db/queries/q-contributions');

const router = express.Router();


//Endpoint to get contributions by id and show to story-view under
router.get('/story/:id', (req, res) => {
  console.log("tryna grab contributions"); //seems like its working but not loggin in nodemon
  const storyId = req.params.id;

  getContributionsById(storyId)
    .then(response => {
      res.json({
        success: true,
        message: 'Contributions gathered successfully',
        contributions: response
      });
    })
    .catch((err) => {
      console.error("Error grabbing contributions:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    });
})

// Endpoint to add new contributions to an existing story.
// KT /contributions is not needed, assume we are in /contributions when working in this file, same with others
router.post('/add', (req, res) => {
  const { story_id, story_proposal } = req.body;
  const date_created = new Date();
  const user_id = req.cookies.username === 'admin' ? 1 : 2; // Defaulted to anonymous if not admin

  const contributionValues = {
    story_id,
    user_id,
    votes: 0,  // Initialized to zero
    story_proposal,
    date_created,
    proposal_status: false  // Initialized to false
  };

  addContribution(contributionValues)
    .then(response => {
      res.json({
        success: true,
        message: 'Contribution submitted successfully!',
        contribution: response
      });
    })
    .catch(err => {
      console.error("Error adding contribution:", err);
      res.status(500).json({ success: false, message: "Internal server error." });
    });
});

// Endpoint to approve a contribution.
router.post('/approve', (req, res) => {
  const { contribution_id } = req.body;

  approveContribution(contribution_id)
    .then(response => {
      console.log(response);
      res.json({
        success: true,
        message: 'Contribution approved!',
        contribution: response
      });
    })
    .catch(err => {
      console.error("Error approving contribution:", err);
      res.status(500).json({ success: false, message: "Internal server error." });
    });
});

// Endpoint to upvote a contribution.
router.post('/contributions/upvote', (req, res) => {
  const { contribution_id } = req.body;

  upvoteContribution(contribution_id)
    .then(response => {
      res.json({
        success: true,
        message: 'Contribution upvoted!',
        contribution: response
      });
    })
    .catch(err => {
      console.error("Error upvoting contribution:", err);
      res.status(500).json({ success: false, message: "Internal server error." });
    });
});

module.exports = router;
