const express = require('express');
const {
  addContribution,
  upvoteContribution,
  approveContribution
} = require('../db/queries/q-contributions');

const router = express.Router();

// Endpoint to add new contributions to an existing story.
router.post('/contributions/add', (req, res) => {
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
      const isAdmin = req.cookies.username === 'admin';
      res.json({
        success: true,
        message: 'Contribution submitted successfully!',
        isAdmin,
        contribution: response
      });
    })
    .catch(err => {
      console.error("Error adding contribution:", err);
      res.status(500).json({ success: false, message: "Internal server error." });
    });
});

// // Endpoint to upvote a contribution.
// router.post('/contributions/upvote', (req, res) => {
//   const { contribution_id } = req.body;

//   upvoteContribution(contribution_id)
//     .then(response => {
//       res.json({
//         success: true,
//         message: 'Contribution upvoted!',
//         contribution: response
//       });
//     })
//     .catch(err => {
//       console.error("Error upvoting contribution:", err);
//       res.status(500).json({ success: false, message: "Internal server error." });
//     });
// });

// // Endpoint to approve a contribution.
// router.post('/contributions/approve', (req, res) => {
//   const { contribution_id } = req.body;

//   approveContribution(contribution_id)
//     .then(response => {
//       res.json({
//         success: true,
//         message: 'Contribution approved!',
//         contribution: response
//       });
//     })
//     .catch(err => {
//       console.error("Error approving contribution:", err);
//       res.status(500).json({ success: false, message: "Internal server error." });
//     });
// });

module.exports = router;
