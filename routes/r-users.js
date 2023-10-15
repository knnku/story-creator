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
  // const user = getUser(userName); ---test, value not needed

  console.log('cookie:',req.cookies); //read cookie in browser test

  res.clearCookie("username"); // Clear existing cookie

  getUser(userName)
    .then(user => {
      // console.log("Promise from database:", user); //test
      if (userName === "admin") {
        res.cookie('username', 'admin')
        res.json({
          success: true,
          message: "Login successful, admin!",
          data: user
        });
      } else if (userName === "guest") {
        res.cookie('username', 'guest')
        res.json({
          success: true,
          message: "Login successful, guest!",
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
      console.log("Error fetching user:", error);
      // res.json();
    });

});

module.exports = router;

