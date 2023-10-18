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
  console.log('r-users input: ', req.body.username); //test
  const userName = req.body.username;

  console.log('r-cookie:', req.cookies); //read cookie in browser test

  res.clearCookie("username"); // Clear existing cookie

  getUser(userName)
    .then(user => {
      if (userName === "admin") {
        res.cookie('username', 'admin')
        res.json({
          success: true,
          message: "Login successful, admin!",
          userType: "admin",  // Send back user type
          data: user
        });
      } else if (userName === "guest") {
        res.cookie('username', 'guest')
        res.json({
          success: true,
          message: "Login successful, guest!",
          userType: "guest",  // Send back user type
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
      console.log("Error fetching user:", err);
      // Ideally, send back an error response to the client
      res.status(500).json({
        success: false,
        message: "Server error while fetching user."
      });
    });

});

module.exports = router;
