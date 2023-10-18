/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const { getUser } = require("../db/queries/q-users");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("users");
});

router.post("/login", (req, res) => {
  const userName = req.body.username;

  if (!userName) {
    return res.json({
      success: false,
      message: "Username is required!"
    });
  }

  getUser(userName)
    .then(user => {
      if (user && (userName === "admin" || userName === "guest")) {
        res.cookie('username', userName);  // Set cookie based on userName
        res.json({
          success: true,
          message: `Login successful, ${userName}!`,
          data: user
        });
      } else {
        res.json({
          success: false,
          message: "User not found!"
        });
      }
    })
    .catch(err => {
      console.log("Error fetching user:", err);  // Corrected the variable name
      res.status(500).json({
        success: false,
        message: "Internal server error."
      });
    });
});


module.exports = router;

